FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

ARG NPM_AUTH_TOKEN
COPY .npmrc .npmrc

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install
RUN rm -f .npmrc

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .
COPY vue.config.js ./

# build app for production with minification
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]
