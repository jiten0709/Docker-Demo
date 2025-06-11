# MERN Docker Demo

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/jiten0709/Docker-Demo.git
    cd Docker-Demo
    ```

2.  **Switch to the `docker-app` branch:**

    ```bash
    git switch docker-app
    ```

3.  **Create `.env` files:**

    Create `.env` files for both the `backend` and `frontend` directories. Use the `sample.env` files as a reference.

    ```bash
    # Backend
    cd backend
    cp sample.env .env.docker
    # Edit .env.docker with appropriate values, especially MONGO_URI
    cd ..

    # Frontend
    cd frontend
    cp sample.env .env.docker
    # Edit .env.docker with appropriate values, especially VITE_API_URL
    cd ..
    ```

4.  **Run the application using Docker Compose:**

    ```bash
    docker compose up --build
    ```

    This command builds the Docker images and starts the containers.

5.  **Access the application:**

    Once the containers are running, access the application through your browser. Refer to your `Caddyfile` for the correct URLs. By default:

    - Frontend: `https://auth.localhost`
    - API: `https://api.auth.localhost`

## Additional Setup

Before accessing the application, you need to configure your `/etc/hosts` file to map `auth.localhost` and `api.auth.localhost` to your local machine.

1.  **Edit your `/etc/hosts` file:**

    ```bash
    sudo nano /etc/hosts
    ```

2.  **Add the following lines to the end of the file:**

    ```
    127.0.0.1 auth.localhost
    127.0.0.1 api.auth.localhost
    ```

3.  **Save the file and exit.** (In `nano`, press `Ctrl+X`, then `Y`, then `Enter`)

This step is necessary for your browser to correctly resolve the `auth.localhost` and `api.auth.localhost` domains to your local machine, allowing you to access the frontend and API through Caddy.

4. **Keychain access**

Open Keychain Access - Download the certificate from the `docker-demo-caddy-1` container located at `/data/caddy/pki/authorities/local/root.crt`. You can copy the file out of the container using `docker cp docker-demo-caddy-1:/data/caddy/pki/authorities/local/root.crt .` - Import the certificate into Keychain Access and set it to "Always Trust"

## Additional Commands

- **To stop the containers:**

  ```bash
  docker compose down
  ```

- **To view the logs:**

  ```bash
  docker compose logs -f <service_name>
  ```

  Replace `<service_name>` with `api`, `frontend`, `mongo`, or `caddy`.
