import { Search, Briefcase, MapPin } from "lucide-react";

interface JobSearchProps {
  keyword?: string;
  experience?: string;
  location?: string;
  onKeywordChange?: (val: string) => void;
  onExperienceChange?: (val: string) => void;
  onLocationChange?: (val: string) => void;
  onSearch?: () => void;
}

export const JobSearch = ({
  keyword = "",
  experience = "",
  location = "",
  onKeywordChange,
  onExperienceChange,
  onLocationChange,
  onSearch,
}: JobSearchProps) => {
  return (
    <div className="job-search-panel">
      <div className="job-search-field">
        <Search size={20} className="job-search-icon" />
        <input
          type="text"
          placeholder="Job title or keyword"
          className="job-search-input"
          value={keyword}
          onChange={(e) => onKeywordChange?.(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch?.()}
        />
      </div>
      <div className="job-search-field">
        <Briefcase size={20} className="job-search-icon" />
        <select
          className="job-search-input"
          value={experience}
          onChange={(e) => onExperienceChange?.(e.target.value)}
        >
          <option value="">Select Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="1-3 Years">1-3 Years</option>
          <option value="4-5 Years">4-5 Years</option>
        </select>
      </div>
      <div className="job-search-field">
        <MapPin size={20} className="job-search-icon" />
        <select
          className="job-search-input"
          value={location}
          onChange={(e) => onLocationChange?.(e.target.value)}
        >
          <option value="">Select Location</option>
          <option value="California, USA">California, USA</option>
          <option value="New York, USA">New York, USA</option>
          <option value="Remote">Remote</option>
        </select>
      </div>
      <button className="job-search-button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};
