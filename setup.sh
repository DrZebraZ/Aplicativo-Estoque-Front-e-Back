bash getIP.sh
local_host=$(grep "LOCALHOST=" config.txt | cut -d'"' -f2)
echo $local_host

echo "PULL MYSQL"
docker pull mysql

echo "BUILDING GERA ESTOQUE E FRONT"
docker build -t dz-gera-estoque -f ./api/src/Dockerfile .
docker build -t dz-front-end -f ./app/Dockerfile .

echo "COMPOSING UP"
docker-compose up &

echo "sleep 60 seg"
sleep 60

echo "dataTransfer"
bash dataTransfer.sh


