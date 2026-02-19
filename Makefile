.PHONY: setup dev build migrate logs

setup:
	cp backend/.env.example backend/.env
	cd frontend && npm install

dev:
	docker compose up postgres backend -d
	cd frontend && npm run dev

build:
	docker compose build
	docker compose up -d

migrate:
	docker compose exec backend uv run alembic upgrade head

logs:
	docker compose logs -f
