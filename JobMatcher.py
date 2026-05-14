from database import jobs_collection

def match_jobs(candidate_data):

    candidate_skills = [
        skill.lower()
        for skill in candidate_data.get(
            "skills",
            []
        )
    ]

    candidate_experience = str(
        candidate_data.get(
            "experience",
            ""
        )
    ).lower()

    all_jobs = list(
        jobs_collection.find({})
    )

    matched_jobs = []

    for job in all_jobs:

        required_skills = [

            skill.lower()

            for skill in job.get(
                "required_skills",
                []
            )
        ]

        matched_skills = list(

            set(candidate_skills)
            &
            set(required_skills)
        )

        # Skill Matching Condition
        if len(matched_skills) >= 2:

            matched_jobs.append({

                "job_role":
                    job.get("job_title"),

                "required_skills":
                    job.get("required_skills"),

                "experience_required":
                    job.get(
                        "experience_required"
                    ),

                "department":
                    job.get("department"),

                "location":
                    job.get("location"),

                "matched_skills":
                    matched_skills
            })

    return matched_jobs