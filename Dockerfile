FROM node:8.0.0-alpine

MAINTAINER Cookie Cage

WORKDIR /opt/app

# download dependencies
COPY package.json package.json
RUN npm install

# copy application
COPY middlewares middlewares
COPY models models
COPY resources resources
COPY index.js index.js
COPY routes.js routes.js
COPY README.md README.md

HEALTHCHECK --interval=10s --timeout=3s \
    CMD echo -e "GET /healthcheck HTTP/1.1\n\n" \
        | nc localhost 80 | grep -qo "HTTP/1.1 200 OK" || exit 1

CMD ["npm", "start"]
