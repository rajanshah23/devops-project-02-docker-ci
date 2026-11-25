# DevOps Project 02: Dockerizing & Publishing to GitHub Container Registry

![Docker Build and Push](https://github.com/rajanshah23/devops-project-02-docker-ci/actions/workflows/docker-ci.yml/badge.svg)

## 📖 Project Description

This is the second project in my DevOps practical labs series. Building upon the Continuous Integration (CI) pipeline developed in Project 01, this project focuses on **Docker Containerization and Continuous Delivery (CD)**.

The primary objective is to containerize a Node.js application using Docker and automate the process of building and publishing Docker images to the **GitHub Container Registry (GHCR)** using GitHub Actions.

Instead of running the application directly on a local machine, we package the application and its dependencies into a Docker image. This makes the application portable, consistent, and easier to deploy across different environments.

The automated pipeline ensures that whenever new code is pushed to the `main` branch, GitHub Actions automatically builds the Docker image and publishes it to GHCR.

### 🎯 Project Objectives

- Understand Docker fundamentals and containerization.
- Create a Dockerfile for a Node.js application.
- Build lightweight Docker images using Alpine Linux.
- Understand Docker image layers and build caching.
- Configure GitHub Container Registry (GHCR).
- Automate Docker image building using GitHub Actions.
- Publish Docker images automatically to GHCR.
- Implement Docker image versioning using Git commit SHA.
- Understand the fundamentals of Continuous Delivery (CD).

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime environment |
| Express.js | Web application framework |
| Docker | Application containerization |
| Alpine Linux | Lightweight Docker base image |
| Git & GitHub | Source code management |
| GitHub Actions | CI/CD automation |
| GitHub Container Registry | Docker image storage |
| Docker Buildx | Advanced Docker image building |

---

## 📂 Project Directory Structure

```text
devops-project-02-docker-ci/
│
├── .github/
│   └── workflows/
│       └── docker-ci.yml       # GitHub Actions Docker CI/CD pipeline
│
├── public/
│   └── index.html              # Frontend application
│
├── src/
│   └── server.js               # Express.js application server
│
├── test/
│   └── test.js                 # Automated API tests
│
├── Dockerfile                  # Docker image build instructions
│
├── .dockerignore               # Excludes unnecessary files from build context
│
├── package.json                # Project dependencies and scripts
│
└── README.md                   # Project documentation
```

---

## 🐳 Understanding Docker Containerization

Docker allows developers to package an application together with its required dependencies into a portable unit called a **Docker image**.

A Docker image is a read-only template used to create Docker containers.

A Docker container is a running instance of that image.

### Docker Workflow

```text
       Node.js Application
                |
                v
          Dockerfile
                |
                v
       Docker Image Build
                |
                v
          Docker Image
                |
                v
       Docker Container
                |
                v
       Running Application
          localhost:3000
```

### Why Docker?

Without Docker, an application may behave differently across development, testing, and production environments because of differences in operating systems, dependencies, or runtime versions.

Docker helps solve this problem by packaging the application and its runtime requirements together.

**Benefits:**

- Portability across environments.
- Consistent application execution.
- Dependency isolation.
- Easier application deployment.
- Efficient resource utilization.
- Simplified scaling and infrastructure management.

---

## ⚙️ How the Docker CI/CD Pipeline Works

The GitHub Actions workflow is located at:

`.github/workflows/docker-ci.yml`

The pipeline automatically triggers whenever code is pushed to the `main` branch.

### Pipeline Execution Steps

**1. Checkout Repository**

GitHub Actions downloads the latest repository source code into the GitHub-hosted runner.

**2. Set Up Docker Buildx**

Configures Docker Buildx, which provides advanced image-building capabilities through BuildKit.

**3. Authenticate with GHCR**

Authenticates Docker with GitHub Container Registry using:

- `github.actor` – identifies the user or account that triggered the workflow.
- `secrets.GITHUB_TOKEN` – provides temporary authentication.
- `packages: write` – grants permission to publish container images.

**4. Extract Docker Image Metadata**

Automatically generates Docker image tags and labels.

Two image tags are generated:

- `latest` – identifies the latest published image.
- `commit SHA` – identifies the specific Git commit associated with the image.

**5. Build and Push Docker Image**

Docker builds the application image using the repository's Dockerfile and publishes it to GHCR.

GitHub Actions caching is enabled to reuse previously built Docker layers and improve subsequent build performance.

### CI/CD Pipeline Architecture

```text
Developer
    |
    | git push origin main
    v
GitHub Repository
    |
    v
GitHub Actions Trigger
    |
    v
Checkout Repository
    |
    v
Setup Docker Buildx
    |
    v
Authenticate with GHCR
    |
    v
Generate Image Tags
    |
    v
Build Docker Image
    |
    v
Push Image to GHCR
    |
    v
Published Docker Image
    |
    v
Ready for Deployment
```

---

## 🚀 How to Run the Project Locally

### Prerequisites

Make sure the following tools are installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Visual Studio Code](https://code.visualstudio.com/)

Verify your installations:

```bash
node --version
npm --version
git --version
docker --version
```

Verify that Docker is running:

```bash
docker info
```

### Step 1: Clone the Repository

```bash
git clone https://github.com/rajanshah23/devops-project-02-docker-ci.git
```

Navigate into the project directory:

```bash
cd devops-project-02-docker-ci
```

### Step 2: Install Dependencies

Install the Node.js dependencies:

```bash
npm install
```

### Step 3: Run the Application Without Docker (Optional)

Start the Node.js application:

```bash
npm start
```

Open your browser:

```text
http://localhost:3000
```

### Step 4: Build the Docker Image

Build a Docker image from the Dockerfile:

```bash
docker build -t devops-project-02-docker-ci .
```

**Command explanation:**

| Command | Description |
|---|---|
| `docker build` | Builds a Docker image |
| `-t` | Assigns a name/tag to the image |
| `devops-project-02-docker-ci` | Image name |
| `.` | Uses the current directory as the build context |

Verify that the image was created:

```bash
docker images
```

### Step 5: Run the Docker Container

Start a container from the generated image:

```bash
docker run -d -p 3000:3000 --name devops-project-02 devops-project-02-docker-ci
```

**Command explanation:**

| Option | Description |
|---|---|
| `docker run` | Creates and starts a container |
| `-d` | Runs the container in detached mode |
| `-p 3000:3000` | Maps host port 3000 to container port 3000 |
| `--name` | Assigns a custom container name |

### Step 6: Verify the Running Container

Check running containers:

```bash
docker ps
```

View application logs:

```bash
docker logs devops-project-02
```

Open your browser:

```text
http://localhost:3000
```

You should now be able to access the application running inside the Docker container.

### Step 7: Stop and Remove the Container

Stop the container:

```bash
docker stop devops-project-02
```

Remove the container:

```bash
docker rm devops-project-02
```

Remove the Docker image (optional):

```bash
docker rmi devops-project-02-docker-ci
```

---

## 📦 Publishing Docker Images to GHCR

GitHub Container Registry allows developers to store, manage, and distribute Docker images.

This project automatically publishes Docker images to GHCR through GitHub Actions.

### Docker Image Naming Convention

The image follows this naming structure:

```text
ghcr.io/OWNER/REPOSITORY:TAG
```

Example:

```text
ghcr.io/rajanshah23/devops-project-02-docker-ci:latest
```

### Generated Docker Image Tags

| Tag | Purpose |
|---|---|
| `latest` | Latest published image |
| `COMMIT_SHA` | Identifies a specific Git commit |

Example:

```text
ghcr.io/rajanshah23/devops-project-02-docker-ci:latest

ghcr.io/rajanshah23/devops-project-02-docker-ci:a1b2c3d
```

### Pull the Published Docker Image

Once the GitHub Actions workflow completes successfully, pull the image:

```bash
docker pull ghcr.io/rajanshah23/devops-project-02-docker-ci:latest
```

Run the published image:

```bash
docker run -d -p 3000:3000 --name ghcr-container ghcr.io/rajanshah23/devops-project-02-docker-ci:latest
```

If the package is private, authenticate with GHCR before pulling it:

```bash
docker login ghcr.io
```

You can also change the package visibility to public through your GitHub package settings if you want other developers to pull it without authentication.

---

## 🔍 Docker Commands Reference

These are some important Docker commands used in this project.

| Command | Purpose |
|---|---|
| `docker --version` | Checks Docker version |
| `docker images` | Lists available images |
| `docker ps` | Lists running containers |
| `docker ps -a` | Lists all containers |
| `docker build -t name .` | Builds an image |
| `docker run -p 3000:3000 name` | Runs a container |
| `docker logs container-name` | Displays container logs |
| `docker stop container-name` | Stops a container |
| `docker start container-name` | Starts an existing container |
| `docker rm container-name` | Removes a container |
| `docker rmi image-name` | Removes an image |
| `docker pull image-name` | Downloads an image |
| `docker inspect container-name` | Displays container details |
