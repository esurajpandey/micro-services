# Installing Dependencies
FROM node:20.10.0-alpine AS BUILD
WORKDIR /home/node/app
# package.json and package-lock.json copied to start the installation
COPY package*.json ./
# Do not install DevDependencies
RUN npm install --omit=dev --omit=optional
# Remove test and other non production files/dependencies in the node_modules
RUN npm prune --production
# Remove unused files/dependencies across the image
RUN wget -q https://gobinaries.com/tj/node-prune | sh

# Build real image
FROM node:20.10.0-alpine AS deps
WORKDIR /home/node/app
COPY . .
COPY --from=BUILD /home/node/app/node_modules node_modules

#Enviornments
ENV DATABASE_URL="postgresql://postgres:root@db-service:5432/my-app"
ENV APP_PORT=9000
ENV JWT_SECRET=123345dsjbjhdsfbasdjbf
ENV NODE_ENV=PRODUCTION
ENV AUTH_GRPC="auth-service:55056"
EXPOSE 9000

# Generating the prisma
RUN npm exec prisma generate
CMD [ "npm", "start" ]