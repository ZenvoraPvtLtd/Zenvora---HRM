from fastapi import FastAPI

from app.routers.job_match_router import router

app = FastAPI(
    title="Smart Job Matching API",
    version="1.0.0"
)

app.include_router(router)


@app.get("/")
async def home():

    return {
        "message": "Smart Job Matching API Running Successfully"
    }