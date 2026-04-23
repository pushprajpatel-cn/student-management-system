# Change from node:18-alpine to node:22-alpine
FROM node:22-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

# Ensure the app is accessible outside the container
EXPOSE 5173

# Vite needs the --host flag to work in Docker
CMD ["npm", "run", "dev", "--", "--host"]