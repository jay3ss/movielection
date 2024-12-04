from fastapi import APIRouter, Response
from fastapi.responses import JSONResponse

from app.api.v0.deps import SessionDep
from app.crud import get_latest_election

router = APIRouter(prefix="/status")


@router.get("/is-election-running")
def election_status(session: SessionDep) -> Response:
    status = get_latest_election(session) is not None
    return JSONResponse(content=dict(status=status))
