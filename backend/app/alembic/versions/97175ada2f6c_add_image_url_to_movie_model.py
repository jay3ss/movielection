"""Add image url to movie model

Revision ID: 97175ada2f6c
Revises: 777435584774
Create Date: 2024-12-05 13:19:34.646253

"""

from typing import Sequence, Union

import sqlalchemy as sa
import sqlmodel.sql.sqltypes
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "97175ada2f6c"
down_revision: Union[str, None] = "777435584774"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add the new column
    op.add_column("movie", sa.Column("image", sa.String, nullable=True))


def downgrade() -> None:
    # Drop the column
    op.drop_column("movie", "image")
