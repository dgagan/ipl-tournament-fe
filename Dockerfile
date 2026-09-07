# ---- Builder ----
FROM node:20-alpine AS builder
WORKDIR /app

# Baked in at build time (Vite inlines import.meta.env.* into the bundle).
# Defaults to a same-origin relative path so the built app works identically
# in any environment where Nginx proxies /api/ to the backend container.
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Runner ----
FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
