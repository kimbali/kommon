# Body-Maraton

Body-Maraton is a web application developed using the MERN stack (MongoDB, Express, React, Node.js). This project aims to provide a robust platform for managing and viewing marathon and fitness-related event information.

## Features

- **User Management**: User registration, login, and session handling.
- **AWS S3 Integration**: For file upload and management.
- **Dynamic User Interface**: Using React and various supporting libraries.
- **Internationalization**: Support for multiple languages with i18next.
- **Security**: JWT authentication and password encryption.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime environment for the server.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM (Object Data Modeling) for MongoDB.
- **JWT (jsonwebtoken)**: Implementation of JSON Web Tokens for authentication.
- **Bcryptjs**: Library for password encryption.
- **AWS SDK**: For integration with Amazon S3.
- **Multer**: Middleware for handling multipart/form-data files.
- **Morgan**: Middleware for HTTP request logging.
- **Dotenv**: Environment variable management.
- **Cookie-parser**: Parse cookies in requests.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **React Router DOM**: Routing for React applications.
- **Redux Toolkit**: State management for the application.
- **Axios**: HTTP client for making requests.
- **i18next**: Internationalization and localization.
- **React-i18next**: Integration of i18next with React.
- **Font Awesome**: Vector icons.
- **Sass**: CSS preprocessor for more efficient styling.
- **React Hot Toast**: Quick notifications.
- **React Select**: Highly customizable select components.
- **React Markdown**: Render Markdown content.
- **React Player**: Multimedia content playback.
- **React Country Flag**: Display country flags.

## Installation

Follow these steps to set up the project on your local machine:

1. Clone the repository:
   ```sh
   git clone https://github.com/kimbali/kommon.git
   ```

2. Navigate to the project directory:
   ```sh
    cd kommon
    ```
2. Install backend dependencies:
   ```sh
    npm install
    ```
2. Install frontend dependencies:
   ```sh
    npm install --prefix frontend
    ```
  
## Usage
### Development
To start the development environment, use the following command:
  ```sh
  npm run dev
  ```
This will concurrently start both the backend server and the React frontend.

### Production
To build the application for production, run:
   ```sh
  npm run build
   ```
This will install all necessary dependencies and build the frontend.

## Available Scripts
- start: Starts the backend server.
- server: Starts the backend server with nodemon for development.
- client: Starts the React development server.
- dev: Starts both servers (backend and frontend) in development mode.
- data:import: Imports seed data to the database.
- data:destroy: Destroys the data in the database.
- build: Builds the project for production.
- generate-toc: Generates a table of contents for the README.md file.


## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Author
[Kim Garcia](https://www.linkedin.com/in/kim-garcia-js/)

## Production
[Body Maraton](https://bodymaraton.com/)
