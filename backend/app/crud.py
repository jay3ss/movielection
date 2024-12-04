from sqlmodel import Session, select

from app.models import Election


def get_latest_election(session: Session) -> Election | None:
    election: Election = session.exec(
        select(Election).order_by(Election.finishes_at.desc()).limit(1)
    ).first()
    return election
