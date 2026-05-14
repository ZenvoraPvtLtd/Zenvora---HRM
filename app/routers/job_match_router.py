from fastapi import APIRouter

from app.schemas.job_schema import (
    MatchRequest
)

from app.services.job_matching_service import (
    JobMatchingService
)

router = APIRouter()


@router.get("/health")
async def health_check():

    return {
        "status": "running"
    }


@router.post("/match-jobs")
async def match_jobs(data: MatchRequest):

    result = await (
        JobMatchingService.match_jobs(
            data.candidate,
            data.jobs
        )
    )

    return {

        "candidate_name":
            data.candidate.name,

        "recommended_jobs":
            result
    }