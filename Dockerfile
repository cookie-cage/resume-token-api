FROM node:8.1.2-alpine

MAINTAINER Cookie Cage

WORKDIR /opt/app

# download dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production

# copy application
COPY resources resources
COPY schemas schemas
COPY index.js index.js
COPY README.md README.md

HEALTHCHECK --interval=10s --timeout=3s \
    CMD echo -e "GET /healthcheck HTTP/1.1\n\n" \
        | nc localhost 80 | grep -qo "HTTP/1.1 200 OK" || exit 1

CMD ["npm", "start"]
