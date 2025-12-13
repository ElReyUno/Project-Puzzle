# Multi-stage Dockerfile for Node.js React E-Commerce App

# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for building)
RUN npm install --include=dev --no-fund --no-audit

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install specific npm version
RUN npm install -g npm@11.7.0

# Install all dependencies (including dev for testing)
RUN npm install && npm cache clean --force

# Copy built application from build stage
COPY --from=build /app/src/build ./build

# Copy run_tests.sh
COPY run_tests.sh ./


# Copy tasks directory for testing
COPY tasks/ ./tasks/


# Copy babel.config.cjs for testing
COPY babel.config.cjs ./

# Copy .github directory for workflow and config tests
COPY .github/ ./.github/

# Copy source code for testing
COPY --from=build /app/backend ./backend
COPY --from=build /app/src ./src

# Create non-root user
RUN adduser -D appuser && chown -R appuser:appuser /app
USER appuser

# Make test runner executable
RUN chmod +x run_tests.sh

# Expose port (assuming React dev server or backend)
EXPOSE 3000

# Set ENTRYPOINT for robust test execution (only once, at the end)
ENTRYPOINT ["./run_tests.sh"]
