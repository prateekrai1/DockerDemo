# Web Application Deployment Guide

Run the application either using individual Docker commands or Docker Compose.

## Prerequisites
- Docker installed
- Existing Docker volume (for MongoDB data):
  ```bash
  docker volume create studentdata
  ```

### Method 1: Run containers separately
1. Create Docker Network
 ```bash
 docker network create webappconnect
 ```

2. Start MongoDB Container
 ```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v studentdata:/data/db \
  --network webappconnect \
  mongo
```
3. Start Backend Container
```bash
docker run -d \
  --name backend \
  -p 5000:5000 \
  --network webappconnect \
  -e MONGO_URI="mongodb://mongodb:27017/myDatabase" \
  --restart always \
  prateekrai642/nodeapp:0.1.4
```

4. Start UI contianer
```bash
docker run -d \
  --name frontend \
  -p 3000:80 \
  --network webappconnect \
  prateekrai642/ui:0.1.1
```

### Method 2: Run with Docker Compose
1. Create a Docker Compose file (docker-compose.yml) or (compose.yml)
2. Start all services
```bash
docker compose up -d
```
3. Verify Containers
```bash
docker compose ps
```
