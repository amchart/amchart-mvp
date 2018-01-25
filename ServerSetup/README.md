# Hyperledger Sawtooth Framework Installation With Node.js

### Install dependencies

* Ubuntu 16.04
* nvm https://github.com/creationix/nvm
* avn https://github.com/wbyoung/avn
* Docker CE https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/
* Docker Compose https://docs.docker.com/compose/install/
* `cd` to any Node.js project in this repo to activate .node-version

### Installation notes

* follow Docker instructions to ensure you can run docker commands without `sudo`
* read instructions for nvm and avn to prevent gotchas (hint: there are some)

### Run Hyperledger Sawtooth Framework

```
cd ServerSetup
# hint: add sawtooth-override.yaml for per-machine conf
script/compose.sh dev up -d
```

* Hyperledger Sawtooth framework is up and running. If you want to expose the ports add 4004 and 8080 to security group.

### Stop and flush all the data logged on sawtooth

```
cd ServerSetup
script/compose.sh dev down
```
