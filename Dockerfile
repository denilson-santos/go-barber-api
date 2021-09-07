FROM node:14.17.6 

WORKDIR /home/app

RUN npm install -g npm@7.22

COPY package*.json ./

RUN npm install

COPY . .