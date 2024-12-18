"""This module is not necessary just yet"""

from sqlmodel import Session, create_engine, select

from app.core.config import settings
from app.models import Election, ElectionMovieLink, Movie, Vote

engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))


def init_db(session: Session) -> None:
    pass
