for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /i "IPv4 Address.*$"') do (
    SET "MY_IP=%%i"
    goto :exitloop
)
:exitloop
echo %MY_IP%
type src\.env | find /v "LOCALHOST=" > temp & move /y temp src\.env
echo LOCALHOST='%MY_IP%'>> src\.env
SET "LOCALHOST=!MY_IP!"
SET "APIPORT=3001"
docker pull node:18.12.0-alpine
docker pull mysql
docker build -t gera-estoque -f .\src\Dockerfile .
docker-compose up -d
timeout 10
start ProducaoAPP -d