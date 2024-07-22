FROM node:lts-bookworm-slim as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
RUN npm run build

FROM node:lts-bookworm-slim as production
ENV NODE_ENV prod
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm run ci --production
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 80
CMD ["node", "dist/app.js"]