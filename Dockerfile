FROM node:22.1.0

WORKDIR /app

# Copy necessary files first (to improve caching)
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY prisma ./prisma
COPY .env ./

# Install dependencies
RUN npm install

# Generate Prisma client
RUN if [ -f "./prisma/schema.prisma" ]; then npx prisma generate; else echo "Skipping prisma generate"; fi

# Copy the rest of the application
COPY . .

# Compile TypeScript
RUN npm run build

# Set environment to production
ENV NODE_ENV=production

# Use dynamic PORT and load environment variables
ENV PORT=3000
EXPOSE $PORT

# Start the application with dotenv loaded
CMD ["node", "-r", "dotenv/config", "dist/index.js"]
