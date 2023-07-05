bash getIpMint.sh

echo "PULL MYSQL"
sudo docker pull mysql

echo "BUILDING GERA ESTOQUE E FRONT"
sudo docker build -t dz-gera-estoque -f ./api/src/Dockerfile .
sudo docker build -t dz-front-end -f ./app/Dockerfile .

echo "COMPOSING UP"
sudo docker-compose up &

echo "sleep 60 seg"
sleep 60

echo "dataTransfer"
bash dataTransfer.sh


