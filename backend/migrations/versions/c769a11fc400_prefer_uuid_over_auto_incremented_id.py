"""Prefer UUID over auto incremented ID

Revision ID: c769a11fc400
Revises: 0952b24748b6
Create Date: 2025-02-25 18:15:43.102288

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c769a11fc400'
down_revision = '0952b24748b6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('conversations', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=36),
               existing_nullable=False)

    with op.batch_alter_table('messages', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=36),
               existing_nullable=False)

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=36),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.String(length=36),
               type_=sa.INTEGER(),
               existing_nullable=False)

    with op.batch_alter_table('messages', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.String(length=36),
               type_=sa.INTEGER(),
               existing_nullable=False)

    with op.batch_alter_table('conversations', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.String(length=36),
               type_=sa.INTEGER(),
               existing_nullable=False)

    # ### end Alembic commands ###
