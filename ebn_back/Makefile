CONTAINER := back-end

build:
	@docker-compose build --no-cache

first-install:
	@docker-compose up --build

start:
	@docker-compose up

clean:
	@docker-compose down
	@docker system prune -f
	@docker image prune -f --all
	@docker volume prune -f
