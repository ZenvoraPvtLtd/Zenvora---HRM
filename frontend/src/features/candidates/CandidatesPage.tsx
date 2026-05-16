
import { useEffect, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';

import {
  ArrowDownUp,
  Briefcase,
  Download,
  Mail,
  Phone,
  Search,
  Users,
} from 'lucide-react';

type Candidate = {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  softskills: string[];
  experience: number;
  status: string;
  uploadedAt?: string;
  resumeOriginalName?: string;
};

type SortKey =
  | 'name'
  | 'experience'
  | 'status'
  | 'uploadedAt';

type SortDirection = 'asc' | 'desc';

const statusColors: Record<
  string,
  { bg: string; color: string }
> = {
  Applied: {
    bg: 'rgba(245, 158, 11, 0.12)',
    color: '#f59e0b',
  },
  Shortlisted: {
    bg: 'rgba(16, 185, 129, 0.12)',
    color: '#10b981',
  },
  'Interview Scheduled': {
    bg: 'rgba(59, 130, 246, 0.12)',
    color: '#3b82f6',
  },
  Rejected: {
    bg: 'rgba(239, 68, 68, 0.12)',
    color: '#ef4444',
  },
  Offering: {
    bg: 'rgba(168, 85, 247, 0.12)',
    color: '#a855f7',
  },
};

const getCandidatesEndpoint = () => {
  return 'http://localhost:5000/api/candidates';
};

const normalizeCandidates = (
  data: any,
): Candidate[] => {
  const rows = Array.isArray(data)
    ? data
    : data?.candidates || [];

  return rows.map(
    (candidate: any, index: number) => {
      const allSkills = Array.isArray(
        candidate.detected_skills,
      )
        ? candidate.detected_skills
        : Array.isArray(candidate.skills)
        ? candidate.skills
        : [];

      const softSkillKeywords = [
        'communication',
        'teamwork',
        'problem solving',
        'time management',
        'leadership',
        'adaptability',
        'critical thinking',
        'collaboration',
        'creativity',
        'interpersonal skills',
        'work ethic',
        'emotional intelligence',
      ];

      const technicalSkills =
        allSkills.filter(
          (skill: string) =>
            !softSkillKeywords.includes(
              skill.toLowerCase(),
            ),
        );

      const softSkills = allSkills.filter(
        (skill: string) =>
          softSkillKeywords.includes(
            skill.toLowerCase(),
          ),
      );

      return {
        id:
          candidate.id ||
          candidate._id ||
          index + 1,

        name:
          candidate.name ||
          candidate.personal_information
            ?.full_name ||
          'Unknown Candidate',

        email:
          candidate.email ||
          candidate.personal_information
            ?.email ||
          '',

        phone:
          candidate.phone ||
          candidate.personal_information
            ?.phone ||
          '',

        skills: technicalSkills,

        softskills: softSkills,

        experience: Number(
          candidate.experience ||
            candidate.detected_experience
              ?.total_experience_years ||
            0,
        ),

        status:
          candidate.status || 'Applied',

        uploadedAt:
          candidate.uploadedAt ||
          candidate.created_at,

        resumeOriginalName:
          candidate.resumeOriginalName ||
          candidate.resume_name,
      };
    },
  );
};

export default function CandidatesPage() {
  const [candidates, setCandidates] =
    useState<Candidate[]>([]);

  const [searchQuery, setSearchQuery] =
    useState('');

  const [statusFilter, setStatusFilter] =
    useState('All');

  const [sortKey, setSortKey] =
    useState<SortKey>('uploadedAt');

  const [sortDirection, setSortDirection] =
    useState<SortDirection>('desc');

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          getCandidatesEndpoint(),
        );

        if (!response.ok) {
          throw new Error(
            'Unable to fetch candidates',
          );
        }

        const data = await response.json();

        setCandidates(
          normalizeCandidates(data),
        );
      } catch (err: any) {
        console.error(err);

        setError(
          err.message ||
            'Failed to load candidates',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const statuses = useMemo(() => {
    return [
      'All',
      ...Array.from(
        new Set(
          candidates.map(
            (candidate) =>
              candidate.status,
          ),
        ),
      ),
    ];
  }, [candidates]);

  const visibleCandidates = useMemo(() => {
    const query = searchQuery
      .trim()
      .toLowerCase();

    return candidates
      .filter((candidate) => {
        const matchesSearch =
          candidate.name
            .toLowerCase()
            .includes(query) ||
          candidate.email
            .toLowerCase()
            .includes(query) ||
          candidate.phone
            .toLowerCase()
            .includes(query) ||
          candidate.skills.some((skill) =>
            skill
              .toLowerCase()
              .includes(query),
          ) ||
          candidate.softskills.some(
            (skill) =>
              skill
                .toLowerCase()
                .includes(query),
          );

        const matchesStatus =
          statusFilter === 'All' ||
          candidate.status ===
            statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      })
      .sort((a, b) => {
        const direction =
          sortDirection === 'asc'
            ? 1
            : -1;

        const aValue = a[sortKey] || '';
        const bValue = b[sortKey] || '';

        if (
          typeof aValue === 'number' &&
          typeof bValue === 'number'
        ) {
          return (
            (aValue - bValue) *
            direction
          );
        }

        return (
          String(aValue).localeCompare(
            String(bValue),
          ) * direction
        );
      });
  }, [
    candidates,
    searchQuery,
    statusFilter,
    sortKey,
    sortDirection,
  ]);

  const stats = useMemo(() => {
    return {
      total: candidates.length,

      shortlisted:
        candidates.filter(
          (candidate) =>
            candidate.status ===
            'Shortlisted',
        ).length,

      interviews:
        candidates.filter(
          (candidate) =>
            candidate.status ===
            'Interview Scheduled',
        ).length,

      averageExperience:
        candidates.length === 0
          ? 0
          : Math.round(
              candidates.reduce(
                (
                  total,
                  candidate,
                ) =>
                  total +
                  candidate.experience,
                0,
              ) / candidates.length,
            ),
    };
  }, [candidates]);

  const handleSort = (
    key: SortKey,
  ) => {
    if (sortKey === key) {
      setSortDirection((prev) =>
        prev === 'asc'
          ? 'desc'
          : 'asc',
      );

      return;
    }

    setSortKey(key);

    setSortDirection('asc');
  };

  const exportExcel = () => {
    const data =
      visibleCandidates.map(
        (candidate) => ({
          Name: candidate.name,

          Email: candidate.email,

          Phone: candidate.phone,

          'Technical Skills':
            candidate.skills.join(
              ', ',
            ),

          'Soft Skills':
            candidate.softskills.join(
              ', ',
            ),

          Experience: `${candidate.experience} yrs`,

          Status: candidate.status,

          'Upload Date':
            candidate.uploadedAt
              ? new Date(
                  candidate.uploadedAt,
                ).toLocaleDateString()
              : '-',
        }),
      );

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    worksheet['!cols'] = [
      { wch: 25 },
      { wch: 30 },
      { wch: 18 },
      { wch: 40 },
      { wch: 35 },
      { wch: 15 },
      { wch: 20 },
      { wch: 18 },
    ];

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Candidates',
    );

    XLSX.writeFile(
      workbook,
      'Candidates.xlsx',
    );
  };

  const renderStatusBadge = (
    status: string,
  ) => {
    const colors =
      statusColors[status] ||
      statusColors.Applied;

    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding:
            '0.35rem 0.75rem',
          borderRadius: '999px',
          fontSize: '0.75rem',
          fontWeight: 700,
          background: colors.bg,
          color: colors.color,
          whiteSpace: 'nowrap',
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div
      className="animate-fade-in"
      style={{
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent:
            'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h1 className="page-title">
            All Candidates
          </h1>

          <p className="page-subtitle">
            Parsed resume profiles
            from candidate
            pipeline.
          </p>
        </div>

        <button
          onClick={exportExcel}
          disabled={
            visibleCandidates.length ===
            0
          }
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: 'none',
            borderRadius: '0.5rem',
            background: '#16a34a',
            color: 'white',
            padding:
              '0.75rem 1rem',
            fontWeight: 700,
            cursor:
              visibleCandidates.length ===
              0
                ? 'not-allowed'
                : 'pointer',
            opacity:
              visibleCandidates.length ===
              0
                ? 0.6
                : 1,
          }}
        >
          <Download size={18} />
          Export Excel
        </button>
      </div>

      {/* STATS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {[
          {
            label:
              'Total Candidates',
            value: stats.total,
            icon: Users,
          },
          {
            label: 'Shortlisted',
            value:
              stats.shortlisted,
            icon: Briefcase,
          },
          {
            label: 'Interviews',
            value:
              stats.interviews,
            icon: Users,
          },
          {
            label:
              'Avg Experience',
            value: `${stats.averageExperience} yrs`,
            icon: Briefcase,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="card"
            style={{
              padding: '1rem',
              display: 'flex',
              alignItems:
                'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius:
                  '0.75rem',
                display: 'flex',
                alignItems:
                  'center',
                justifyContent:
                  'center',
                background:
                  'rgba(168,85,247,0.12)',
                color: '#a855f7',
              }}
            >
              <item.icon size={20} />
            </div>

            <div>
              <div
                style={{
                  fontSize:
                    '0.8rem',
                  color:
                    'var(--text-secondary)',
                }}
              >
                {item.label}
              </div>

              <div
                style={{
                  fontSize:
                    '1.5rem',
                  fontWeight: 700,
                }}
              >
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SEARCH */}
      <div
        className="card"
        style={{
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: '250px',
            position: 'relative',
          }}
        >
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform:
                'translateY(-50%)',
              color:
                'var(--text-secondary)',
            }}
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(
                e.target.value,
              )
            }
            placeholder="Search candidates..."
            style={{
              width: '100%',
              padding:
                '0.75rem 1rem 0.75rem 2.5rem',
              borderRadius:
                '0.75rem',
              border:
                '1px solid var(--border)',
              background:
                'rgba(255,255,255,0.03)',
              color:
                'var(--text-primary)',
              outline: 'none',
            }}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value,
            )
          }
          style={{
            padding:
              '0.75rem 1rem',
            borderRadius:
              '0.75rem',
            border:
              '1px solid var(--border)',
            background:
              'rgba(255,255,255,0.03)',
            color:
              'var(--text-primary)',
            minWidth: '180px',
          }}
        >
          {statuses.map((status) => (
            <option
              key={status}
              value={status}
            >
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div
        className="card"
        style={{
          width: '100%',
          overflowX: 'auto',
          borderRadius: '1rem',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse:
              'collapse',
            minWidth: '900px',
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom:
                  '1px solid var(--border)',
              }}
            >
              {[
                {
                  key: 'name',
                  label: 'Name',
                },
                {
                  key: 'experience',
                  label:
                    'Experience',
                },
                {
                  key: 'status',
                  label: 'Status',
                },
                {
                  key: 'uploadedAt',
                  label:
                    'Upload Date',
                },
              ].map((column) => (
                <th
                  key={column.key}
                  style={{
                    padding:
                      '1rem',
                    textAlign:
                      'left',
                    whiteSpace:
                      'nowrap',
                  }}
                >
                  <button
                    onClick={() =>
                      handleSort(
                        column.key as SortKey,
                      )
                    }
                    style={{
                      background:
                        'transparent',
                      border:
                        'none',
                      color:
                        'inherit',
                      display:
                        'flex',
                      alignItems:
                        'center',
                      gap: '0.35rem',
                      cursor:
                        'pointer',
                    }}
                  >
                    {column.label}
                    <ArrowDownUp
                      size={14}
                    />
                  </button>
                </th>
              ))}

              <th
                style={{
                  padding:
                    '1rem',
                  textAlign:
                    'left',
                }}
              >
                Contact
              </th>

              <th
                style={{
                  padding:
                    '1rem',
                  textAlign:
                    'left',
                }}
              >
                Technical Skills
              </th>

              <th
                style={{
                  padding:
                    '1rem',
                  textAlign:
                    'left',
                }}
              >
                Soft Skills
              </th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding:
                      '2rem',
                    textAlign:
                      'center',
                  }}
                >
                  Loading
                  candidates...
                </td>
              </tr>
            )}

            {!loading &&
              error && (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      padding:
                        '2rem',
                      textAlign:
                        'center',
                      color: 'red',
                    }}
                  >
                    {error}
                  </td>
                </tr>
              )}

            {!loading &&
              !error &&
              visibleCandidates.length ===
                0 && (
                <tr>
                  <td
                    colSpan={7}
                    style={{
                      padding:
                        '2rem',
                      textAlign:
                        'center',
                    }}
                  >
                    No candidates
                    found.
                  </td>
                </tr>
              )}

            {!loading &&
              !error &&
              visibleCandidates.map(
                (
                  candidate,
                ) => (
                  <tr
                    key={
                      candidate.id
                    }
                    style={{
                      borderBottom:
                        '1px solid var(--border)',
                    }}
                  >
                    <td
                      style={{
                        padding:
                          '1rem',
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                        }}
                      >
                        {
                          candidate.name
                        }
                      </div>

                      <div
                        style={{
                          fontSize:
                            '0.75rem',
                          color:
                            'var(--text-secondary)',
                        }}
                      >
                        {candidate.resumeOriginalName ||
                          'Resume'}
                      </div>
                    </td>

                    <td
                      style={{
                        padding:
                          '1rem',
                      }}
                    >
                      {
                        candidate.experience
                      }{' '}
                      yrs
                    </td>

                    <td
                      style={{
                        padding:
                          '1rem',
                      }}
                    >
                      {renderStatusBadge(
                        candidate.status,
                      )}
                    </td>

                    <td
                      style={{
                        padding:
                          '1rem',
                      }}
                    >
                      {candidate.uploadedAt
                        ? new Date(
                            candidate.uploadedAt,
                          ).toLocaleDateString()
                        : '-'}
                    </td>

                    <td
                      style={{
                        padding:
                          '1rem',
                      }}
                    >
                      <div>
                        <Mail
                          size={14}
                        />{' '}
                        {
                          candidate.email
                        }
                      </div>

                      <div>
                        <Phone
                          size={14}
                        />{' '}
                        {
                          candidate.phone
                        }
                      </div>
                    </td>

                    <td
                      style={{
                        padding:
                          '1rem',
                      }}
                    >
                      <div
                        style={{
                          display:
                            'flex',
                          flexWrap:
                            'wrap',
                          gap: '0.35rem',
                          maxWidth:
                            '250px',
                        }}
                      >
                        {candidate.skills.map(
                          (
                            skill,
                          ) => (
                            <span
                              key={
                                skill
                              }
                              style={{
                                padding:
                                  '0.25rem 0.5rem',
                                borderRadius:
                                  '0.4rem',
                                background:
                                  'rgba(59,130,246,0.1)',
                                color:
                                  '#60a5fa',
                                fontSize:
                                  '0.75rem',
                              }}
                            >
                              {
                                skill
                              }
                            </span>
                          ),
                        )}
                      </div>
                    </td>

                    <td
                      style={{
                        padding:
                          '1rem',
                      }}
                    >
                      <div
                        style={{
                          display:
                            'flex',
                          flexWrap:
                            'wrap',
                          gap: '0.35rem',
                          maxWidth:
                            '250px',
                        }}
                      >
                        {candidate.softskills.map(
                          (
                            skill,
                          ) => (
                            <span
                              key={
                                skill
                              }
                              style={{
                                padding:
                                  '0.25rem 0.5rem',
                                borderRadius:
                                  '0.4rem',
                                background:
                                  'rgba(16,185,129,0.1)',
                                color:
                                  '#34d399',
                                fontSize:
                                  '0.75rem',
                              }}
                            >
                              {
                                skill
                              }
                            </span>
                          ),
                        )}
                      </div>
                    </td>
                  </tr>
                ),
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
