echo "sudo apt update"
sudo apt update

echo "sudo apt -y install apt-transport-https ca-certificates curl software-properties-common"
sudo apt -y install apt-transport-https ca-certificates curl software-properties-common

echo "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg"
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --yes --dearmor -o -n /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu jammy stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo "cat /etc/apt/sources.list.d/docker.list"
cat /etc/apt/sources.list.d/docker.list

echo "sudo apt update"
sudo apt update

echo "sudo apt update"
sudo apt update

echo "sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin"
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin

echo "sudo usermod -aG docker $USER"
sudo usermod -aG docker $USER

echo "newgrp docker"
newgrp docker

echo "cp ./app/.env.copy ./app/.env
cp api/src/.env.copy api/src/.env"
cp ./app/.env.copy ./app/.env
cp api/src/.env.copy api/src/.env

echo "sudo apt-get install net-tools"
sudo apt-get install net-tools

echo "sudo apt-get install coreutils"
sudo apt-get install coreutils




