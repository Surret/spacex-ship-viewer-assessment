@echo off
echo Starting docker compose...

docker-compose -p spacex -f common.yml up --build --remove-orphans

pause