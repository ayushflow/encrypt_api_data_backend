# Encrypt API Server

This is a Node.js backend server that demonstrates encryption of data during HTTP-based communication.

## Prerequisites

- Node.js
- npm

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/ayushflow/encrypt_api_data_backend.git
    ```

2. Install the dependencies:

    ```bash
    cd encrypt_api_data_backend
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

## Usage

Once the server is running, you can send HTTP requests to the following endpoints:

- `POST /posts`: Returns sample data for Posts
- `POST /todos`: Returns the sample data for todos

You can send a `count` value to control how much content you get.