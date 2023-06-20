bash getIP.sh
local_host=$(grep "LOCALHOST=" config.txt | cut -d'"' -f2)
echo $local_host
if [[ -n $local_host ]] then
  awk -v new_value="$local_host" '/LOCALHOST=/{sub(/LOCALHOST=.*/, new_value)}1' app/.env > app/.env.tmp && mv app/.env.tmp app/.env
  awk -v new_value="$local_host" '/LOCALHOST=/{sub(/LOCALHOST=.*/, new_value)}1' api/src/.env > api/src/.env.tmp && mv api/src/.env.tmp api/src/.env
  awk -v new_value="$local_host" '/LOCALHOST=/{sub(/LOCALHOST=.*/, new_value)}1' app/src/app/ApiService.js > app/src/app/ApiService.js.tmp && mv app/src/app/ApiService.js.tmp app/src/app/ApiService.js
  echo "IPS SETADOS"
else
  echo "Valor de LOCALHOST não encontrado no arquivo config.txt"
fi

echo "PULL NODE E MYSQL"
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


