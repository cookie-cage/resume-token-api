FROM node:8.0.0-alpine

MAINTAINER Cookie Cage

WORKDIR /opt/app

COPY .env .env
COPY middlewares middlewares
COPY models models
COPY node_modules node_modules
COPY resources resources
COPY services services
COPY index.js index.js
COPY package.json package.json
COPY routes.js routes.js
COPY README.md README.md

RUN npm install

HEALTHCHECK --interval=10s --timeout=3s \
    CMD curl -f http://localhost/healthcheck || exit 1

CMD ["npm", "start"]
