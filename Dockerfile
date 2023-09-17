FROM node:16.14.0 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install env-cmd
RUN npm install
COPY . .

ARG STAGE

RUN npm run build:$STAGE

FROM nginx:alpine AS prod
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build/ .
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

