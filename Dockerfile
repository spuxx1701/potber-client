FROM node:20 AS build
WORKDIR /usr/app/
COPY ./ ./
RUN npm ci && npm run build

FROM nginxinc/nginx-unprivileged:alpine AS RUNTIME
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html

USER 1000

EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
