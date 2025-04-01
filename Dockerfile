# Build stage
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Test stage (new)
FROM node:18 as test
WORKDIR /app
COPY --from=build /app .
RUN apt-get update && apt-get install -y chromium
RUN npm install -g @angular/cli

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g http-server
COPY --from=build /app/dist/e-commerce /app
EXPOSE 8080
CMD ["http-server", "/app", "-p", "8080"]