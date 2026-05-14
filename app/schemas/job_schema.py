from pydantic import BaseModel
from typing import List


class Candidate(BaseModel):

    name: str

    skills: List[str]

    experience: int

    education: str

    ranking_score: float


class Job(BaseModel):

    job_role: str

    required_skills: List[str]

    required_experience: int


class MatchRequest(BaseModel):

    candidate: Candidate

    jobs: List[Job]