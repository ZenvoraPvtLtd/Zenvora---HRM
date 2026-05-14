class RecommendationService:

    @staticmethod
    def generate_recommendation(score):

        if score >= 85:

            return "Highly Recommended"

        elif score >= 70:

            return "Recommended"

        elif score >= 50:

            return "Moderate Match"

        return "Low Match"