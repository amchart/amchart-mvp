#! /usr/bin/env bash

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

nvm install node 8
npm install -g avn avn-nvm avn-n
avn setup
# maybe remove ~/.bash_profile if nvm doesn't seem to load correctly on login

sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
	
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
  
sudo apt-get update
sudo apt-get install docker-ce

sudo curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

mkdir ~/amsys
cd ~/amsys
git clone https://github.com/amsysbc/javascript.git

cd ~/amsys/javascript/ServerSetup/
sudo script/compose.sh dev up -d

sudo apt-get install python 
sudo apt-get install build-essential

cd ~/amsys/javascript/Web
npm install
npm run build

cd ~/amsys/javascript/TransactionProcessor/
npm install

# for now, run with global pm2
cd ~/amsys/javascript
npm i -g pm2
pm2 start pm2.json