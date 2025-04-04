FROM node:22.1.0

WORKDIR /app

# Copy necessary files first
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY prisma ./prisma

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

# Expose the necessary port
EXPOSE 3000

# Start the application with environment variables
CMD ["sh", "-c", "node dist/index.js"]
