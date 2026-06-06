# syntax=docker/dockerfile:1
FROM node:22-bookworm-slim

ENV NODE_ENV=production
WORKDIR /usr/src/app

# Install production dependencies first to leverage Docker layer caching.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy application source.
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
