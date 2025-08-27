# Study Scheduler - API Documentation

## Table of Contents
1. [API Overview](#api-overview)
2. [Authentication](#authentication)
3. [Base URL & Headers](#base-url--headers)
4. [Endpoints](#endpoints)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)
7. [Examples](#examples)

## API Overview

The Study Scheduler API provides a RESTful interface for managing academic courses, tasks, and user accounts. The API is built with Node.js and Express, using JWT tokens for authentication.

### API Features
- **RESTful Design**: Standard HTTP methods and status codes
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Consistent error response format
- **CORS Support**: Cross-origin resource sharing enabled

### Technology Stack
- **Framework**: Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Database**: SQLite with Sequelize ORM
- **Password Hashing**: bcrypt

## Authentication

### JWT Token Structure
The API uses JWT tokens for authentication. Tokens are sent in the `Authorization` header.

```http
Authorization: Bearer <jwt_token>
```

### Token Format
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "user_id": 123,
    "email": "user@example.com",
    "iat": 1640995200,
    "exp": 1641081600
  }
}
```

### Token Expiration
- **Access Token**: 24 hours
- **Refresh Token**: Not implemented (future enhancement)

## Base URL & Headers

### Base URL
```
Development: http://localhost:5000
Production: https://your-domain.com
```

### Required Headers
```http
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

### Optional Headers
```http
Accept: application/json
User-Agent: StudyScheduler/1.0
```

## Endpoints

### Authentication Endpoints

#### 1. User Registration
**POST** `/api/auth/register`

Creates a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "created_at": "2024-12-01T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validation Rules:**
- `email`: Required, valid email format, unique
- `password`: Required, minimum 6 characters
- `name`: Required, minimum 2 characters

#### 2. User Login
**POST** `/api/auth/login`

Authenticates user and returns JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validation Rules:**
- `email`: Required, valid email format
- `password`: Required

#### 3. Get Current User
**GET** `/api/auth/me`

Returns the current authenticated user's profile.

**Headers:**
```http
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2024-12-01T10:00:00.000Z",
    "updated_at": "2024-12-01T10:00:00.000Z"
  }
}
```

### Course Endpoints

#### 1. List User Courses
**GET** `/api/courses`

Returns all courses for the authenticated user.

**Headers:**
```http
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `limit` (optional): Number of courses to return (default: 50)
- `offset` (optional): Number of courses to skip (default: 0)
- `search` (optional): Search courses by name or code

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Introduction to Computer Science",
      "code": "CS101",
      "color": "blue",
      "deadline": "2024-12-31T23:59:59.000Z",
      "created_at": "2024-12-01T10:00:00.000Z",
      "updated_at": "2024-12-01T10:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 50,
    "offset": 0,
    "hasMore": false
  }
}
```

#### 2. Create Course
**POST** `/api/courses`

Creates a new course for the authenticated user.

**Headers:**
```http
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "Advanced Mathematics",
  "code": "MATH201",
  "color": "green",
  "deadline": "2024-11-30T23:59:59.000Z"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "id": 2,
    "name": "Advanced Mathematics",
    "code": "MATH201",
    "color": "green",
    "deadline": "2024-11-30T23:59:59.000Z",
    "user_id": 1,
    "created_at": "2024-12-01T10:00:00.000Z",
    "updated_at": "2024-12-01T10:00:00.000Z"
  }
}
```

**Validation Rules:**
- `name`: Required, minimum 2 characters
- `code`: Optional, maximum 20 characters
- `color`: Optional, valid CSS color or predefined color name
- `deadline`: Optional, valid date format

#### 3. Update Course
**PUT** `/api/courses/:id`

Updates an existing course.

**Headers:**
```http
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "Advanced Mathematics II",
  "deadline": "2024-12-15T23:59:59.000Z"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Course updated successfully",
  "data": {
    "id": 2,
    "name": "Advanced Mathematics II",
    "code": "MATH201",
    "color": "green",
    "deadline": "2024-12-15T23:59:59.000Z",
    "updated_at": "2024-12-01T11:00:00.000Z"
  }
}
```

#### 4. Delete Course
**DELETE** `/api/courses/:id`

Deletes a course and all associated tasks.

**Headers:**
```http
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Course deleted successfully"
}
```

### Task Endpoints

#### 1. List User Tasks
**GET** `/api/tasks`

Returns all tasks for the authenticated user.

**Headers:**
```http
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `limit` (optional): Number of tasks to return (default: 50)
- `offset` (optional): Number of tasks to skip (default: 0)
- `completed` (optional): Filter by completion status (true/false)
- `priority` (optional): Filter by priority (HIGH/MEDIUM/LOW)
- `course_id` (optional): Filter by course
- `due_date` (optional): Filter by due date range

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Complete Assignment 1",
      "due_date": "2024-12-15T23:59:59.000Z",
      "priority": "HIGH",
      "completed": false,
      "course_id": 1,
      "Course": {
        "id": 1,
        "name": "Introduction to Computer Science",
        "color": "blue"
      },
      "created_at": "2024-12-01T10:00:00.000Z",
      "updated_at": "2024-12-01T10:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 50,
    "offset": 0,
    "hasMore": false
  }
}
```

#### 2. Create Task
**POST** `/api/tasks`

Creates a new task for the authenticated user.

**Headers:**
```http
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "title": "Read Chapter 5",
  "due_date": "2024-12-10T23:59:59.000Z",
  "priority": "MEDIUM",
  "course_id": 1
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 2,
    "title": "Read Chapter 5",
    "due_date": "2024-12-10T23:59:59.000Z",
    "priority": "MEDIUM",
    "completed": false,
    "user_id": 1,
    "course_id": 1,
    "created_at": "2024-12-01T10:00:00.000Z",
    "updated_at": "2024-12-01T10:00:00.000Z"
  }
}
```

**Validation Rules:**
- `title`: Required, minimum 2 characters
- `due_date`: Required, valid date format, future date
- `priority`: Optional, one of: HIGH, MEDIUM, LOW (default: MEDIUM)
- `course_id`: Optional, valid course ID

#### 3. Update Task
**PUT** `/api/tasks/:id`

Updates an existing task.

**Headers:**
```http
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "title": "Read Chapter 5 and 6",
  "priority": "HIGH"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": 2,
    "title": "Read Chapter 5 and 6",
    "priority": "HIGH",
    "updated_at": "2024-12-01T11:00:00.000Z"
  }
}
```

#### 4. Delete Task
**DELETE** `/api/tasks/:id`

Deletes a task.

**Headers:**
```http
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

#### 5. Toggle Task Completion
**PATCH** `/api/tasks/:id/toggle`

Toggles the completion status of a task.

**Headers:**
```http
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task completion status updated",
  "data": {
    "id": 2,
    "completed": true,
    "updated_at": "2024-12-01T11:00:00.000Z"
  }
}
```

#### 6. Get Overdue Tasks
**GET** `/api/tasks/overdue`

Returns all overdue tasks for the authenticated user.

**Headers:**
```http
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 3,
      "title": "Submit Final Project",
      "due_date": "2024-11-30T23:59:59.000Z",
      "priority": "HIGH",
      "completed": false,
      "days_overdue": 1
    }
  ]
}
```

## Error Handling

### Error Response Format
All API errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

### HTTP Status Codes
- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Access denied
- **404 Not Found**: Resource not found
- **422 Unprocessable Entity**: Validation error
- **500 Internal Server Error**: Server error

### Error Codes
- **VALIDATION_ERROR**: Input validation failed
- **AUTHENTICATION_ERROR**: Invalid or expired token
- **AUTHORIZATION_ERROR**: Insufficient permissions
- **NOT_FOUND_ERROR**: Resource not found
- **DUPLICATE_ERROR**: Resource already exists
- **INTERNAL_ERROR**: Server error

## Rate Limiting

Currently, the API does not implement rate limiting. Future versions may include:
- **Authentication endpoints**: 5 requests per minute
- **General endpoints**: 100 requests per minute per user
- **File uploads**: 10 requests per minute per user

## Examples

### Complete Workflow Example

#### 1. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@university.edu",
    "password": "securepass123",
    "name": "John Student"
  }'
```

#### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@university.edu",
    "password": "securepass123"
  }'
```

#### 3. Create Course
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_from_login>" \
  -d '{
    "name": "Computer Science 101",
    "code": "CS101",
    "color": "blue",
    "deadline": "2024-12-31T23:59:59.000Z"
  }'
```

#### 4. Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_from_login>" \
  -d '{
    "title": "Complete Assignment 1",
    "due_date": "2024-12-15T23:59:59.000Z",
    "priority": "HIGH",
    "course_id": 1
  }'
```

#### 5. Get Tasks
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <token_from_login>"
```

### JavaScript/Node.js Examples

#### Using Fetch API
```javascript
// Login
const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const { data: { token } } = await loginResponse.json();

// Create task
const taskResponse = await fetch('http://localhost:5000/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'New Task',
    due_date: '2024-12-20T23:59:59.000Z',
    priority: 'MEDIUM'
  })
});
```

#### Using Axios
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API calls
const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error.response.data);
    throw error;
  }
};
```

---

**Note**: This API documentation covers all current endpoints and functionality. For the latest updates and additional features, please refer to the source code or contact the development team.
