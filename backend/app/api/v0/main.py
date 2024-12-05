from fastapi import APIRouter

from app.api.v0.routes import home, movies, status

api_router = APIRouter()
api_router.include_router(home.router)
api_router.include_router(movies.router)
api_router.include_router(status.router)
