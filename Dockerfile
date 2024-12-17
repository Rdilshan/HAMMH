# Use a lighter Node.js image as a parent image
FROM node:20-slim

# Install dependencies
RUN apt-get update && apt-get install -y openssl libc6

# Set working directory
WORKDIR /app

# Copy dependency definitions
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .



# Expose the app port
EXPOSE 3000

# Command to start the app
CMD ["sh", "-c", "npx prisma migrate dev && npm run dev"]
