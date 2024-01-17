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