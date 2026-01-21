# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json* pnpm-lock.yaml* ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

RUN echo "=== CHECK TYPES ===" && ls -R app/types || echo "❌ app/types NOT FOUND"

# Build Nuxt
RUN npm run build

# Expose port Nuxt
EXPOSE 3000

# Run Nuxt production
CMD ["node", ".output/server/index.mjs"]
