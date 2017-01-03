FROM node:7.2-alpine

# RUN echo "registry=https://registry.npm.taobao.org" > /root/.npmrc

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install

EXPOSE 9090

CMD [ "node", "main.js" ]
