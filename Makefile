############################################
#  Makefile Docker Compose + Swarm
############################################

up:
	@echo "Lancement de l'application en utilisant docker-compose..."
	docker-compose up
	@echo "Application demarree en mode local."

upd:
	@echo "Lancement de l'application en utilisant docker-compose..."
	docker-compose up -d
	@echo "Application demarree detachée."

build:
	@echo "Lancement de l'application en utilisant docker-compose..."
	docker-compose up --build
	@echo "Application build and up."

down:
	@echo "Arret de l'application en utilisant docker-compose..."
	docker-compose down
	@echo "Application arretee."

down++:
	@echo "Arret de l'application et suppression des volumes et orphelins en utilisant docker-compose..."
	docker-compose down --volumes --remove-orphans
	@echo "Application arretee et volumes supprimes."
