# Build stage
FROM node:18.14.1-alpine as build
WORKDIR /app
COPY package.json ./
COPY . .
RUN yarn
RUN yarn build

# Run stage
FROM node:18.14.1-alpine
WORKDIR /app
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/yarn.lock /app/yarn.lock
COPY --from=build /app/i18n /app/i18n
COPY ./config /app/config
COPY ./secrets /app/secrets

EXPOSE 3001
CMD ["yarn", "start:prod"]
