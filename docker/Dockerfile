
FROM node:12-alpine AS builder

ARG GIT_REPO_URL=https://github.com/probablyateapot/vue-phonebook
ARG GIT_REPO_REF=master
ARG BASE_URL=/

RUN apk add --no-cache git
RUN git clone ${GIT_REPO_URL} /tmp

WORKDIR /tmp
RUN echo "VUE_APP_BUILD_DESCRIBE=$(git describe --always)" | tee -a .env.local
RUN echo "VUE_APP_REPO_URL=$GIT_REPO_URL" | tee -a .env.local
RUN echo "VUE_APP_BASE_URL=$BASE_URL" | tee -a .env.local
RUN git checkout ${GIT_REPO_REF}
RUN npm ci
RUN npm run build

FROM nginx:alpine

COPY --from=builder /tmp/dist /usr/share/nginx/html

