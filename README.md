# Full-Stack Application with Docker Compose

This project is a full-stack application consisting of a Burrito_frontend React app, a Burrito_backend NestJS application, and a MySQL database, all managed using Docker Compose.

## Prerequisites

- **Docker**: Make sure Docker is installed on your machine. You can download it from [docker.com](https://www.docker.com/products/docker-desktop).
- **Docker Compose**: Ensure Docker Compose is installed. It usually comes with Docker Desktop. If not, follow the installation instructions at [Docker Compose Installation](https://docs.docker.com/compose/install/).

### Summary:

1. **Project Structure**: Overview of the project's structure.
2. **Prerequisites**: List of required tools.
3. **Environment Variables**: Instructions on setting up the `.env` file with example variables.
4. **Docker Compose Configuration**: Detailed `docker-compose.yml` configuration and service descriptions.
5. **Running the Application**: Steps for starting, stopping, and rebuilding services using Docker Compose.
6. **Additional Information**: Links to documentation for React, NestJS, MySQL, and Docker Compose.
7. **Troubleshooting**: Common issues and solutions.
8. **License and Contributing**: Licensing and contribution information.

This README provides comprehensive instructions for setting up, running, and managing your full-stack application with Docker Compose. Adjust the content as needed for your specific project details.
## Docker Compose Configuration

The `docker-compose.yml` file defines the following services:

- **Burrito_frontend**: React application
- **Burrito_backend**: NestJS application
- **mysqldb**: MySQL database

### `docker-compose.yml` File

```yaml
version: "3"
services:
  Burrito_frontend:
    build: ./Burrito_frontend
    ports:
      - "3000:80"
    depends_on:
      - Burrito_backend
    restart: unless-stopped

  Burrito_backend:
    build: ./Burrito_backend
    expose:
      - "3001"
    environment:
      - PORT=3001
      - DB_HOST=mysqldb
      - DB_PORT=3306
      - DB_USER=root
      - DB_PASS=anviam
      - DB_DIALECT=mysql
      - DB_NAME_DEVELOPMENT=BurritoShop
      - JWTKEY=khfjgjhgjhgej834737852529y1tu3ihqjebhf3brghebg
      - NODE_ENV=DEVELOPMENT
    depends_on:
      - mysqldb
    restart: unless-stopped

  mysqldb:
    image: "mysql:8"
    ports:
      - "3305:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=anviam
      - MYSQL_DATABASE=BurritoShop
      - MYSQL_USER=root
      - MYSQL_PASSWORD=anviam
      - MYSQL_AUTHENTICATION_PLUGIN=mysql_native_password
    restart: unless-stopped
    volumes:
      - ./database:/var/lib/mysql



Docker Commands to run application
docker-compose down
docker-compose up --build


.env sample
PORT = 
DB_HOST
DB_PORT=
DB_USER=
DB_PASS=
DB_DIALECT=
DB_NAME_DEVELOPMENT=
JWTKEY=
NODE_ENV=