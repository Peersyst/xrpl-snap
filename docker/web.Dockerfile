FROM node:18.18.2 as base
WORKDIR /project
COPY ["package.json", "yarn.lock", "nx.json", ".prettierrc", "./"]
COPY packages /project/packages
# Install root dependencies
RUN yarn install
# Install all packages and build them
RUN yarn build:packages
# Copy all files
COPY ["apps/web/package.json", "apps/web/yarn.lock", "nx.json", ".prettierrc", "./apps/web/"]


FROM base as dev-dependencies
WORKDIR /project/apps/web
RUN yarn install --frozen-lockfile
COPY apps/web/. /project/apps/web


FROM base as prod-dependencies
ENV NODE_ENV=production
WORKDIR /project/apps/web
RUN yarn install --frozen-lockfile
COPY apps/web/. /project/apps/web


FROM dev-dependencies as test
RUN yarn lint


FROM prod-dependencies as build
RUN yarn build
RUN touch build.lock


FROM build as integration
COPY --from=test /project/apps/web/test.lock /app/test.lock

