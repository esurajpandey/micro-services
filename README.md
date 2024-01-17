# micro-services

# Create TS config file
    npx tsc --init

# Initiate Prisma
    npx prisma init

# Devops

* Docker network
    - docker network create -d bridge my-local
* Running container on same network
    - docker run --network=<network-name> --name=<container-name> -p 5000:5000 -d auth-image
    - If a database is running on different container then you have to replace <hostname> to <container-name>


Tutorial 
# Build Docker image
docker build -t <your-image-name> .

# Run Docker image
docker run -p <your-host-port>:<container-port> -d <your-image-id/name>

# Example:
docker run -it -p 8005:5000 auth-service


# Run PostgreSQL container

docker run --name postgres-db -e POSTGRES_PASSWORD=root -p <host-port>:<container-port> -d postgres:14.10-alpine3.18

# Example:
docker run --name postgres-db -e POSTGRES_PASSWORD=root -p 5434:5432 -d postgres:14.10-alpine3.18

# Get PostgreSQL container IP address
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' postgres-db\

# Managing Docker Containers 

- List all containers
docker ps -a

- Remove all unused containers, networks, and images
docker system prune

- Remove a specific container
docker rm <container-name>
