# Study-schedule-api-backend
# Study Scheduler API

## Description

The Study Scheduler API is a backend service for managing study tasks and courses. It allows users to register, log in, create, read, update, and delete courses and tasks, with features like task prioritization and overdue task tracking.

## Table of Contents

-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Environment Variables](#environment-variables)
-   [API Reference](#api-reference)
    -   [Authentication](#authentication-endpoints)
    -   [Courses](#courses-endpoints)
    -   [Tasks](#tasks-endpoints)
-   [Authentication](#authentication)
-   [Error Handling](#error-handling)
-   [Technologies Used](#technologies-used)
-   [License](#license)

## Prerequisites

-   Node.js (version 16 or higher)
-   npm (Node Package Manager)
-   SQLite (or your preferred database) - This project uses SQLite for its database.
-   A code editor or IDE (e.g., VS Code)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd study-scheduler-api
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up the database:**

    *   The project uses SQLite.  A database file `database.sqlite` will be created in the project root (or the location specified in `config/database.js`) when you run the application for the first time.

4.  **Run the application:**

    ```bash
    npm start
    ```

    The server will start on port 5000 (or the port specified in the `.env` file).

## Environment Variables

Create a `.env` file in the project root with the following variables:

Example .env file:

```
JWT_SECRET=your-secret-key
PORT=5000
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

-   `PORT`: The port the server will listen on.  Defaults to 5000 if not specified.
-   `JWT_SECRET`: A secret key used for signing JSON Web Tokens (JWT). **This should be a strong, randomly generated secret.**

## API Reference

All API endpoints are prefixed with `/api`.

### Authentication Endpoints
- `POST /api/auth/register` → Register a new user  
- `POST /api/auth/login` → Login and receive a JWT  
- `GET /api/auth/me` → Get authenticated user info  

### Courses Endpoints
- `GET /api/courses` → Get all courses for a user  
- `POST /api/courses` → Create a course  
- `PUT /api/courses/:id` → Update a course  
- `DELETE /api/courses/:id` → Delete a course  

### Tasks Endpoints
- `GET /api/tasks` → Get all tasks (with course info)  
- `GET /api/tasks/overdue` → Get overdue tasks  
- `POST /api/tasks` → Create a task  
- `PUT /api/tasks/:id` → Update a task  
- `PATCH /api/tasks/:id/toggle` → Toggle task completion  
- `DELETE /api/tasks/:id` → Delete a task  

### Authentication Endpoints testing

-   `POST /api/auth/register`
    -   **Description:** Registers a new user.
    -   **Request Body:**

        ```json
        {
          "email": "user@example.com",
          "password": "password123",
          "name": "User Name"
        }
        ```

    -   **Response (Success - 200 OK):**

        ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```

    -   **Response (Error - 400 Bad Request):**

        ```json
        {
          "message": "Email already exists"
        }
        ```

-   `POST /api/auth/login`
    -   **Description:** Logs in an existing user.
    -   **Request Body:**

        ```json
        {
          "email": "user@example.com",
          "password": "password123"
        }
        ```

    -   **Response (Success - 200 OK):**

        ```json
        {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```

    -   **Response (Error - 400 Bad Request):**

        ```json
        {
          "message": "Invalid credentials"
        }
        ```

-   `GET /api/auth/me`
    -   **Description:** Retrieves the authenticated user's information. Requires authentication.
    -   **Headers:** `Authorization: Bearer <token>`
    -   **Response (Success - 200 OK):**

        ```json
        {
          "id": 1,
          "email": "user@example.com",
          "name": "User Name"
        }
        ```

    -   **Response (Error - 401 Unauthorized):**

        ```json
        {
          "message": "Unauthorized"
        }
        ```

### Courses Endpoints

-   `GET /api/courses`
    -   **Description:** Retrieves a list of courses for the authenticated user. Requires authentication.
    -   **Headers:** `Authorization: Bearer <token>`
    -   **Response (Success - 200 OK):**

        ```json
        [
          {
            "id": 1,
            "name": "Math 101",
            "code": "MATH101",
            "color": "#FF0000",
            "createdAt": "2023-11-10T10:00:00.000Z",
            "updatedAt": "2023-11-10T10:00:00.000Z",
            "user_id": 1
          }
        ]
        ```

    -   **Response (Error - 500 Internal Server Error):**

        ```json
        {
          "message": "Server error"
        }
        ```

-   `POST /api/courses`
    -   **Description:** Creates a new course. Requires authentication.
    -   **Headers:** `Authorization: Bearer <token>`
    -   **Request Body:**

        ```json
        {
          "name": "Physics 101",
          "code": "PHYS101",
          "color": "#00FF00"
        }
        ```

    -   **Response (Success - 201 Created):**

        ```json
        {
          "id": 2,
          "name": "Physics 101",
          "code": "PHYS101",
          "color": "#00FF00",
          "createdAt": "2023-11-10T10:00:00.000Z",
          "updatedAt": "2023-11-10T10:00:00.000Z",
          "user_id": 1
        }
        ```

    -   **Response (Error - 500 Internal Server Error):**

        ```json
        {
          "message": "Server error"
        }
        ```

-   `PUT /api/courses/:id`
    -   **Description:** Updates an existing course. Requires authentication.
    -   **Headers:** `Authorization: Bearer <token>`
    -   **Request Body:**

        ```json
        {
          "name": "Updated Physics 101",
          "code": "PHYS101",
          "color": "#0000FF"
        }
        ```

    -   **Response (Success - 200 OK):**

        ```json
        {
          "id": 2,
          "name": "Updated Physics 101",
          "code": "PHYS101",
          "color": "#0000FF",
          "createdAt": "2023-11-10T10:00:00.000Z",
          "updatedAt": "2023-11-10T10:00:00.000Z",
          "user_id": 1
        }
        ```

    -   **Response (Error - 404 Not Found):**

        ```json
        {
          "message": "Course not found"
        }
        ```
    -   **Response (Error - 500 Internal Server Error):**

        ```json
        {
          "message": "Server error"
        }
        ```

-   `DELETE /api/courses/:id`
    -   **Description:** Deletes a course. Requires authentication.
    -   **Headers:** `Authorization: Bearer <token>`
    -   **Response (Success - 200 OK):**

        ```json
        {
          "message": "Course deleted successfully"
        }
        ```

    -   **Response (Error - 404 Not Found):**

        ```json
        {
          "message": "Course not found"
        }
        ```
    -   **Response (Error - 500 Internal Server Error):**

        ```json
        {
          "message": "Server error"
        }
        ```

### Tasks Endpoints

-   `GET /api/tasks`
    -   **Description:** Retrieves a list of tasks for the authenticated user.  Includes the associated Course data. Requires authentication.
    -   **Headers:** `Authorization: Bearer <token>`
    -   **Response (Success - 200 OK):**

        ```json
        [
          {
            "id": 1,
            "title": "Complete Assignment",
            "due_date": "2023-11-15T12:00:00.000Z",
            "priority": "High",
            "completed": false,
            "createdAt": "2023-11-10T12:00:00.000Z",
            "updatedAt": "2023-11-10T12:00:00.000Z",
            "user_id": 1,
            "course_id": 1,
            "Course": {
              "id": 1,
              "name": "Math 101",
              "code": "MATH101",
              "color": "#FF0000",
              "createdAt": "2023-11-10T10:00:00.000Z",
              "updatedAt": "2023-11-10T10:00:00.000Z",
              "user_id": 1
            }
          }
        ]
        ```

    -   **Response (Error - 500 Internal Server Error):**

        ```json
        {
          "message": "Server error"
        }
        ```

-   `GET /api/tasks/overdue`
    -   **Description:** Retrieves a list of overdue tasks for the authenticated user. Includes the associated Course data. Requires authentication.
    -   **Headers:** `Authorization: Bearer <token>`
    -   **Response (Success - 200 OK):**

        ```json
        [
          {
            "id": 1,
            "title": "Complete Assignment",
            "due_date": "2023-11-10T12:00:00.000Z",
            "priority": "High",
            "completed": false,
            "createdAt": "2023-11-09T12:00:00.000Z",
            "updatedAt": "2023-11-10T12:00:00.000Z",
            "user_id": 1,
            "course_id": 1,
            "Course": {
              "id": 1,
              "name": "Math 101",
              "code": "MATH101",
              "color": "#FF0000",
              "createdAt": "2023-11-09T10:00:00.000Z",
              "updatedAt": "2023-11-09T10:00:00.000Z",
              "user_id": 1
            }
          }
        ]
        ```
    -   **Response (Error - 500 Internal Server Error):**

        ```json
        {
          "message": "Server error"
        }
        ```

-   `POST /api/tasks`
    -   **Description:** Creates a new task. Requires authentication.
    -   **Headers:** `Authorization: Bearer <token>`
    -   **Request Body:**

        ```json
        {
          "title": "Read Chapter 5",
          "due_date": "2023-11-20T10:00:00.000Z",
          "priority": "Medium",
          "course_id": 1
        }
        ```

    -   **Response (Success - 201 Created):**

        ```json
        {
          "id": 2,
          "title": "Read Chapter 5",
          "due_date": "2023-11-20T10:00:00.000Z",
          "priority": "Medium",
          "completed": false,
          "createdAt": "2023-11-10T12:00:00.000Z",
          "updatedAt": "2023-11-10T12:00:00.000Z",
          "user_id": 1,
          "course_id": 1
        }
        ```

    -   **Response (Error - 500 Internal Server Error):**

        ```json
        {
          "message": "Server error"
        }
        ```

-   `PUT /api/tasks/:id`
    -   **Description:** Updates an existing task. Requires authentication.
    -   **Headers:** `Authorization: Bearer <token>`
    -   **Request Body:**

        ```json
        {
          "title": "Read Chapter 6",
          "due_date": "2023-11-21T10:00:00.000Z",
          "priority": "High",
          "course_id": 1
        }
        ```

    -   **Response (Success - 200 OK):**

        ```json
        {
          "id": 2,
          "title": "Read Chapter 6",
          "due_date": "2023-11-21T10:00:00.000Z",
          "priority": "High",
          "completed": false,
          "createdAt": "2023-11-10T12:00:00.000Z",
          "updatedAt": "2023-11-10T12:00:00.000Z",
          "user_id": 1,
          "course_id": 1
        }
        ```

    -   **Response (Error - 404 Not Found):**

        ```json
        {
          "message": "Task not found"
        }
        ```
    -   **Response (Error - 500 Internal Server Error):**

        ```json
        {
          "message": "Server error"
        }
        ```

-   `PATCH /api/tasks/:id/toggle`
    -   **Description:** Toggles the completion status of a task. Requires authentication.
    -   **Headers:** `Authorization: Bearer <token>`
    -   **Response (Success - 200 OK):**

        ```json
        {
          "id": 2,
          "title": "Read Chapter 6",
          "due_date": "2023-11-21T10:00:00.000Z",
          "priority": "High",
          "completed": true,
          "createdAt": "2023-11-10T12:00:00.000Z",
          "updatedAt": "2023-11-10T12:00:00.000Z",
          "user_id": 1,
          "course_id": 1
        }
        ```

    -   **Response (Error - 404 Not Found):**

        ```json
        {
          "message": "Task not found"
        }
        ```
    -   **Response (Error - 500 Internal Server Error):**

        ```json
        {
          "message": "Server error"
        }
        ```

-   `DELETE /api/tasks/:id`
    -   **Description:** Deletes a task. Requires authentication.
    -   **Headers:** `Authorization: Bearer <token>`
    -   **Response (Success - 200 OK):**

        ```json
        {
          "message": "Task deleted successfully"
        }
        ```

    -   **Response (Error - 404 Not Found):**

        ```json
        {
          "message": "Task not found"
        }
        ```
    -   **Response (Error - 500 Internal Server Error):**

        ```json
        {
          "message": "Server error"
        }
        ```

## Authentication

-   The API uses JSON Web Tokens (JWT) for authentication.
-   When a user successfully registers or logs in, the server returns a JWT in the response body.
-   For all protected routes (courses and tasks), the client must include the JWT in the `Authorization` header of the request.
-   The `Authorization` header should be in the format: `Authorization: Bearer <token>`.

## Error Handling

The API returns standard HTTP status codes to indicate the outcome of a request.  Error responses generally include a `message` field providing details about the error.

-   **400 Bad Request:**  Indicates that the request was malformed or invalid (e.g., missing required fields).
-   **401 Unauthorized:** Indicates that the user is not authenticated (e.g., missing or invalid JWT).
-   **404 Not Found:** Indicates that the requested resource was not found.
-   **500 Internal Server Error:** Indicates a server-side error.

## CORS Configuration

If you are connecting this backend to a frontend (e.g., React running on `http://localhost:3000`), you need to enable **CORS** in `server.js` (or your main app file).  

Add the following middleware:

```js
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
```

## Technologies Used

-   Node.js
-   Express.js
-   Sequelize (with SQLite)
-   bcrypt (for password hashing)
-   jsonwebtoken (for JWT)
-   cors (for enabling CORS)
-   dotenv (for loading environment variables)
-   node-cron (for scheduling tasks)

## License

[MIT License](LICENSE)
