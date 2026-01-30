# syntax=docker/dockerfile:1

FROM node:20-alpine AS build
WORKDIR /workspace

COPY app/package*.json ./app/
WORKDIR /workspace/app
RUN npm ci

COPY app/ .
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspace/app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
