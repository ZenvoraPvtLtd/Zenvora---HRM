from app.services.skill_match_service import (
    SkillMatchService
)

from app.services.score_service import (
    ScoreService
)

from app.services.recommendation_service import (
    RecommendationService
)


class JobMatchingService:

    @staticmethod
    async def match_jobs(candidate, jobs):

        matched_jobs = []

        for job in jobs:

            # =====================================
            # Skill Matching
            # =====================================

            skill_result = (
                SkillMatchService.match_skills(
                    candidate.skills,
                    job.required_skills
                )
            )

            # =====================================
            # Score Calculation
            # =====================================

            final_score = (
                ScoreService.calculate_match_score(

                    matched_skills=
                        skill_result["matched_skills"],

                    required_skills=
                        job.required_skills,

                    candidate_experience=
                        candidate.experience,

                    required_experience=
                        job.required_experience,

                    ranking_score=
                        candidate.ranking_score
                )
            )

            # =====================================
            # Recommendation
            # =====================================

            recommendation = (
                RecommendationService
                .generate_recommendation(
                    final_score
                )
            )

            # =====================================
            # Save Final Job Match
            # =====================================

            matched_jobs.append({

                "job_role":
                    job.job_role,

                "match_score":
                    final_score,

                "recommendation":
                    recommendation,

                "matched_skills":
                    skill_result["matched_skills"],

                "related_matches":
                    skill_result["related_matches"],

                "missing_skills":
                    skill_result["missing_skills"]
            })

        # =========================================
        # Sort Highest Match First
        # =========================================

        matched_jobs = sorted(

            matched_jobs,

            key=lambda x: x["match_score"],

            reverse=True
        )

        return matched_jobs