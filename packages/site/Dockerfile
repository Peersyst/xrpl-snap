FROM node:16.13.0 as base
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]

FROM base as test
RUN yarn install
COPY . .
RUN yarn lint
RUN yarn test:ci
RUN touch test.lock

FROM test as build
ARG CONFIG_ENV=production
ENV REACT_APP_CONFIG_ENV ${CONFIG_ENV}
RUN DISABLE_ESLINT_PLUGIN=true yarn build

FROM nginx:latest
RUN mkdir /etc/nginx/templates
RUN echo " \
    upstream backend { \
      \${BACKEND_UPSTREAM}\
    } \
    server { \
        listen       80; \
        listen  [::]:80; \
        server_name  localhost; \
        client_max_body_size 5M; \
        location / { \
            root   /var/www; \
            try_files \$uri \$uri/ /index.html; \
        } \
        location /api/ {  \
            proxy_pass http://backend; \
        } \
    }" > /etc/nginx/templates/default.conf.template
COPY --from=build /app/build /var/www
