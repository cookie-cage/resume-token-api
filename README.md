# resume-token-api
Token API for resume ecosystem.

[![Build Status](https://travis-ci.org/cookie-cage/resume-token-api.svg?branch=master)](https://travis-ci.org/cookie-cage/resume-token-api)

**pre-requisites**
- nodejs (v8.1.2)
- docker (v17.03.1-ce)
- docker-compose (v1.13.0)

## usage

### build
```shell
docker-compose build
```

### run
```shell
docker-compose up
```

## API
### generate a new token
```shell
curl -XPOST localhost -i -d '{"owner": "<String>"}' -H 'Content-type: application/json'
# It should return `{token: String}`
```

### validate if the token still valid
```shell
curl localhost/validate/<token>
# It should return `{valid: Boolean}`.
```
