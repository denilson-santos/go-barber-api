FROM node:14.17.6 

RUN apt-get update && apt-get upgrade -y

RUN apt-get install sudo -y

RUN npm install -g npm@7.23

RUN echo "node:node" | chpasswd && usermod -aG sudo node

USER node

RUN sh -c "$(curl -fsSL https://gist.githubusercontent.com/denilson-santos/a7c94fa1c9eff8293d29820691110cba/raw/768a3f8aff1f2a50b00b141bebbe6fe993b2a04f/install-oh-my-zsh-spaceship.sh)" "" -p node

WORKDIR /home/node/app