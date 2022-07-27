FROM node:18-alpine3.15

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install 
RUN npm install -g @angular/cli@14.0.2

COPY . /app

CMD ng serve --host 0.0.0.0