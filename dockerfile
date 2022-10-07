FROM node:16-alpine

USER root

WORKDIR /user/tallosflixfront/app

COPY . .

EXPOSE 8081