FROM node:17.2-bullseye AS build
WORKDIR /opt/www
COPY ./www/ ./
RUN npm ci && npm run build

FROM nginx:1.22.0
COPY --from=build /opt/www/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/
COPY ./nginx/cors.conf /etc/nginx/
EXPOSE 8090
