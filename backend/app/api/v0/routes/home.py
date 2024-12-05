from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.api.v0.deps import SessionDep
from app.crud import get_latest_election

router = APIRouter()


@router.get("/election")
async def home(session: SessionDep):
    election = get_latest_election(session)
    return election
