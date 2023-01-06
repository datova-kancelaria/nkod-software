# Run this with contex located in components as we need access to 'website'
# folder.
FROM node:17.2-bullseye AS build
WORKDIR /opt/www
COPY ./www/ ./
RUN npm ci && npm run i18n && npm run assets && npm run build

FROM nginx:1.22.0
COPY --from=build /opt/www/dist /usr/share/nginx/html
EXPOSE 8090
