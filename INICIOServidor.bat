FOR /F "tokens=2 delims=:" %%G IN ('ipconfig ^| find "IPv4 Address"') DO SET "MY_IP=%%G"
SETLOCAL EnableDelayedExpansion
SET "LOCALHOST=!MY_IP!"
SET "APIPORT=3001"
docker pull node:18.12.0-alpine
docker pull mysql
docker build -t gera-estoque -f .\src\Dockerfile .
docker-compose up -d
timeout 10
start ProducaoAPP -d