from sqlmodel import Session, select

from app.models import Election, Movie


def get_latest_election(session: Session) -> Election | None:
    election: Election = session.exec(
        select(Election).order_by(Election.finishes_at.desc()).limit(1)
    ).first()
    return election


def get_all_movies(session: Session) -> list[Movie]:
    movies: list[Movie] = session.exec(select(Movie).order_by(Movie.title.asc())).all()
    return movies
