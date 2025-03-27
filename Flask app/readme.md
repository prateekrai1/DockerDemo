# Run Flask Backend Using Docker

Follow these instructions to run the Flask application as a Docker container.

## Prerequisites
- Docker installed on your system
- [Optional] Git (to clone repository)
- Project files: `Dockerfile`, `demo.py`, and `requirements.txt`

## Quick Start

### 1. Build the Docker Image
```bash
docker build -t <docker-repository-name>/flask-demo-app:v1 . 
```

### 2. Run the Docker Container with the Docker image
```bash
docker run -d -p 5000:5000 --name flask-container <docker-repository-name>/flask-demo-app:v1
```
### 3. Stop the container
```bash
docker stop flask-container
```

### 3. Remove the container
```bash
docker rm flask-container
```