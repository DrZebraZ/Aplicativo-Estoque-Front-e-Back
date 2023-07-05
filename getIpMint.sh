sudo apt-get install net-tools
sudo apt-get install coreutils
export MY_IP=$(ifconfig | grep 'inet ' | awk '{print $2}' | grep -v '127.0.0.1' | head -n 1)
sed '/LOCALHOST/d' config.txt > temp && mv temp config.txt
echo "LOCALHOST='$MY_IP'" >> config.txt
export LOCALHOST=$MY_IP
export APIPORT=3001
local_host=$(grep "LOCALHOST=" config.txt | cut -d"'" -f2)
echo $local_host
if [[ -n $local_host ]]; then
  awk -v new_value="$local_host" '/LOCALHOST=/{sub(/LOCALHOST=.*/, "LOCALHOST="new_value)}1' app/.env > app/.env.tmp && mv app/.env.tmp app/.env
  awk -v new_value="$local_host" '/LOCALHOST=/{sub(/LOCALHOST=.*/, "LOCALHOST="new_value)}1' api/src/.env > api/src/.env.tmp && mv api/src/.env.tmp api/src/.env
  awk -v new_value="$local_host" '/LOCALHOST=/{sub(/LOCALHOST=.*/, "LOCALHOST="new_value)}1' app/src/app/ApiService.js > app/src/app/ApiService.js.tmp && mv app/src/app/ApiService.js.tmp app/src/app/ApiService.js
  echo "IPS SETADOS"
else
  echo "Valor de LOCALHOST não encontrado no arquivo config.txt"
fi