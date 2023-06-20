export MY_IP=$(ifconfig en0 | grep 'inet ' | awk '{print $2}')
sed '/LOCALHOST/d' config.txt > temp && mv temp config.txt
echo "LOCALHOST='$MY_IP'" >> config.txt
export LOCALHOST=$MY_IP
export APIPORT=3001