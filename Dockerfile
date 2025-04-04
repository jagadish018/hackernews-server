# Use Node.js base image
FROM node:22.1.0

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose the port used by the app
EXPOSE 3000

# Run prisma generate + start server with environment vars available
CMD ["sh", "-c", "npx prisma generate && npm start"]
