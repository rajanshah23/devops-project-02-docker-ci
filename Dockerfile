# 1. Base Image (This is the blueprint for building your container. Think of it as a recipe.)
FROM node:18-alpine

# 2. Set Working Directory,This is the folder where all of our application code will live inside the container. (Think of it as a folder on your computer.)
WORKDIR /app

# 3. Copy ONLY package files first  (Copies package.json and package-lock.json from your host machine into the container's /app folder.)
COPY package*.json ./

# 4. Install Dependencies,This is where we install all of the dependencies for our application. (Think of it as running npm install on your computer.)
RUN npm ci --omit=dev

# 5. Copy the rest of the application code, This is where we copy the rest of our application code into the container. (Think of it as copying your entire project folder into the container.)
COPY src/ ./src/
COPY public/ ./public/

# 6. Expose the port the app runs on,This is the port that our application will run on inside the container. (Think of it as opening a door to your house so that people can come in and visit.)
EXPOSE 3000

# 7. Command to run the app ,This is the command that will be run when the container starts. (Think of it as telling your computer to run a specific program when it starts up.)
CMD ["node", "src/index.js"]