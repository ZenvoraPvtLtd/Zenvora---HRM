class ScoreService:

    @staticmethod
    def calculate_match_score(

        matched_skills,

        required_skills,

        candidate_experience,

        required_experience,

        ranking_score
    ):

        # =====================================
        # Skill Score
        # =====================================

        skill_score = (

            len(matched_skills)

            /

            len(required_skills)

        ) * 60

        # =====================================
        # Experience Score
        # =====================================

        if candidate_experience >= required_experience:

            experience_score = 25

        else:

            experience_score = (

                candidate_experience

                /

                required_experience

            ) * 25

        # =====================================
        # Ranking Score Weight
        # =====================================

        ranking_score_weight = (

            ranking_score

            /

            100

        ) * 15

        # =====================================
        # Final Score
        # =====================================

        final_score = (

            skill_score +

            experience_score +

            ranking_score_weight
        )

        return round(final_score, 2)