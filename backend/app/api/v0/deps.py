from collections.abc import Generator
from typing import Annotated

from fastapi import Depends
from sqlmodel import Session, select

from app.core.db import engine
from app.models import Election


def get_latest_election(session: Session) -> Election:
    election: Election = session.exec(
        select(Election).order_by(Election.finishes_at.desc()).limit(1)
    ).first()
    return election


def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db)]
