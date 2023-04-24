export MY_IP=$(ifconfig en0 | grep 'inet ' | awk '{print $2}')
sed '/LOCALHOST/d' src/.env > temp && mv temp src/.env
echo "LOCALHOST='$MY_IP'" >> src/.env
export LOCALHOST=$MY_IP
export APIPORT=3001
docker pull node:18.12.0-alpine
docker pull mysql
docker build -t gera-estoque -f ./src/Dockerfile .
docker-compose up &
sleep 10
bash initJava.sh &
