from app.utils.related_skills import (
    RELATED_SKILLS
)


class SkillMatchService:

    @staticmethod
    def match_skills(
        candidate_skills,
        required_skills
    ):

        matched_skills = []

        related_matches = []

        missing_skills = []

        candidate_skills_lower = [

            skill.lower()

            for skill in candidate_skills
        ]

        for skill in required_skills:

            # =====================================
            # Exact Match
            # =====================================

            if skill.lower() in candidate_skills_lower:

                matched_skills.append(skill)

            else:

                partial_found = False

                # =================================
                # Related Skill Match
                # =================================

                for candidate_skill in candidate_skills:

                    related = RELATED_SKILLS.get(
                        candidate_skill,
                        []
                    )

                    if skill in related:

                        related_matches.append(
                            f"{candidate_skill} -> {skill}"
                        )

                        partial_found = True

                        break

                # =================================
                # Missing Skill
                # =================================

                if not partial_found:

                    missing_skills.append(skill)

        return {

            "matched_skills":
                matched_skills,

            "related_matches":
                related_matches,

            "missing_skills":
                missing_skills
        }