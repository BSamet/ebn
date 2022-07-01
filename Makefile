CONTAINER := back-end

#Development

build-dev:
	@docker-compose -f docker-compose-dev.yml build --no-cache

first-start-dev:
	@docker-compose -f docker-compose-dev.yml up --build

start-dev:
	@docker-compose -f docker-compose-dev.yml up

stop-dev:
	@docker-compose -f docker-compose-dev.yml down

clean-dev:
	@docker-compose -f docker-compose-dev.yml down
	@docker system prune -f
	@docker image prune -f --all
	@docker volume prune -f
	@sudo rm -rf ebn_back/database/data

#Production

build-prod:
	@docker-compose -f docker-compose-prod.yml build --no-cache

first-start-prod:
	@docker-compose -f docker-compose-prod.yml up --build

start-prod:
	@docker-compose -f docker-compose-prod.yml up

stop-prod:
	@docker-compose -f docker-compose-prod.yml down

clean-prod:
	@docker-compose -f docker-compose-prod.yml down
	@docker system prune -f
	@docker image prune -f --all
	@docker volume prune -f
	@sudo rm -rf ebn_back/database/data