from fastapi import APIRouter, FastAPI

from app.api.v0.deps import SessionDep
from app.crud import get_latest_election

router = APIRouter()


@router.get("/")
async def home(session: SessionDep):
    election = get_latest_election(session)
    status = election is not None
    if not status:
        pass
    else:
        pass
    return {"message": "home!"}
