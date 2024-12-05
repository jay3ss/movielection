from typing import List

from fastapi import APIRouter

from app.api.v0.deps import SessionDep
from app.crud import get_all_movies
from app.models import Movie

router = APIRouter()


@router.get("/movies", response_model=List[Movie])
async def home(session: SessionDep) -> list[Movie]:
    movies = get_all_movies(session)
    return movies
