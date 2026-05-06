# Use Node 24 (match your local env)
FROM node:24

# Set working directory
WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

RUN npx prisma generate

# Build app (if you have build step)
RUN npm run build

# Expose port (adjust if different)
EXPOSE 3000

# Start app
CMD ["npm", "start"]