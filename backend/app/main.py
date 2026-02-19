from contextlib import asynccontextmanager
from collections.abc import AsyncGenerator

import structlog
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import api_router
from app.config import get_settings
from app.db.session import async_engine

log = structlog.get_logger(__name__)
settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    log.info("startup", env=settings.APP_ENV)
    yield
    await async_engine.dispose()
    log.info("shutdown", message="engine disposed")


app = FastAPI(
    title="AutoML Backend",
    version="0.1.0",
    description="AutoML Backend Service API",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")


@app.get("/", tags=["root"])
async def root() -> dict:
    return {
        "service": "automl-backend",
        "version": "0.1.0",
        "docs": "/docs",
        "health": "/api/v1/health",
    }
