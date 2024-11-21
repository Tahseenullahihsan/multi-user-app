# Use a newer Node.js version that supports mongoose, bson, and mongodb
FROM node:16-alpine
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code into the container
COPY . /app

# Expose the port that your app will run on
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
