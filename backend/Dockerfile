# Build stage
FROM python:3.11-slim AS builder

COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

WORKDIR /app

COPY pyproject.toml .python-version uv.lock ./
RUN uv sync --no-dev --no-install-project

# Runtime stage
FROM python:3.11-slim

WORKDIR /app

COPY --from=builder /app/.venv /app/.venv

COPY alembic.ini .
COPY alembic/ alembic/
COPY app/ app/

ENV PATH="/app/.venv/bin:$PATH"
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV SERVICE_TYPE=api

EXPOSE 8000

CMD ["sh", "-c", "\
  if [ \"$SERVICE_TYPE\" = \"api\" ]; then \
    alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000; \
  elif [ \"$SERVICE_TYPE\" = \"worker\" ]; then \
    celery -A app.worker worker --loglevel=info; \
  else \
    echo \"Unknown SERVICE_TYPE: $SERVICE_TYPE\" && exit 1; \
  fi"]
