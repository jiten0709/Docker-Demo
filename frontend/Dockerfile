# Development stage
FROM node:18-bookworm-slim as development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_API_URL
RUN VITE_API_URL=${VITE_API_URL} npm run build

# Production stage
FROM caddy:2-alpine as production

# Copy the Caddyfile
COPY ./Caddyfile /etc/caddy/Caddyfile

# Copy the built files from the development stage
COPY --from=development /app/dist /srv

# Verify the content was copied
RUN ls -la /srv