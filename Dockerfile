# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Define build arguments for React environment variables
ARG REACT_APP_API_URL
ARG REACT_APP_API_URL_MICROSERVICE2
ARG REACT_APP_API_URL_MICROSERVICE3
ARG REACT_APP_API_URL_MICROSERVICE4
ARG REACT_APP_SIGNALR_URL

# Set environment variables for the build
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_API_URL_MICROSERVICE2=$REACT_APP_API_URL_MICROSERVICE2
ENV REACT_APP_API_URL_MICROSERVICE3=$REACT_APP_API_URL_MICROSERVICE3
ENV REACT_APP_API_URL_MICROSERVICE4=$REACT_APP_API_URL_MICROSERVICE4
ENV REACT_APP_SIGNALR_URL=$REACT_APP_SIGNALR_URL

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 