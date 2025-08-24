# Study Scheduler - Comprehensive Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Database Schema](#database-schema)
5. [API Documentation](#api-documentation)
6. [Frontend Components](#frontend-components)
7. [Setup & Installation](#setup--installation)
8. [Usage Guide](#usage-guide)
9. [Technical Specifications](#technical-specifications)

## System Overview

**Study Scheduler** is a comprehensive web application designed to help students and professionals manage their academic workload, track course progress, and organize tasks efficiently. The system provides an intuitive interface for managing courses, tasks, and deadlines with automated reminders and progress tracking.

### Key Benefits
- **Centralized Management**: All academic activities in one place
- **Smart Reminders**: Automated email notifications for upcoming deadlines
- **Progress Tracking**: Visual progress indicators for courses and tasks
- **Priority Management**: Task prioritization system for better organization
- **Responsive Design**: Works seamlessly across all devices

## Features

### Core Functionality
- **User Authentication**: Secure login/signup with JWT tokens
- **Course Management**: Create, edit, and track course progress
- **Task Management**: Add, complete, and prioritize tasks
- **Calendar Integration**: Visual calendar view of all deadlines
- **Progress Tracking**: Real-time progress monitoring
- **Notification System**: In-app and email notifications
- **Dashboard Analytics**: Overview of academic performance

### Advanced Features
- **Automated Reminders**: Daily email notifications for upcoming tasks
- **Priority System**: High, Medium, Low priority levels for tasks
- **Course Deadlines**: Track course completion deadlines
- **Task Completion**: Mark tasks as complete with progress tracking
- **Responsive UI**: Modern, intuitive interface design

## Architecture

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (SQLite)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Components    │    │   Controllers   │    │   Models        │
│   Pages         │    │   Middleware    │    │   Relationships │
│   Contexts      │    │   Routes        │    │   Constraints   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack
- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, Sequelize ORM
- **Database**: SQLite3
- **Authentication**: JWT, bcrypt
- **Email**: Nodemailer
- **Scheduling**: node-cron

## Database Schema

### Entity Relationship Diagram
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    User     │    │   Course    │    │    Task     │
├─────────────┤    ├─────────────┤    ├─────────────┤
│ id (PK)     │    │ id (PK)     │    │ id (PK)     │
│ email       │    │ name        │    │ title       │
│ password    │    │ code        │    │ due_date    │
│ name        │    │ color       │    │ priority    │
│ created_at  │    │ deadline    │    │ completed   │
│ updated_at  │    │ user_id(FK) │    │ user_id(FK) │
└─────────────┘    └─────────────┘    │ course_id   │
         │              │             │ (FK)        │
         │              │             └─────────────┘
         │              │                     │
         │              │                     │
         └──────────────┼─────────────────────┘
                        │
         ┌─────────────┐│
         │Notification ││
         ├─────────────┤│
         │ id (PK)     ││
         │ title       ││
         │ message     ││
         │ type        ││
         │ is_read     ││
         │ priority    ││
         │ user_id(FK) ││
         └─────────────┘│
                        │
                        └─────────────┐
                                      │
                                      ▼
                              ┌─────────────┐
                              │   Course    │
                              │   Task      │
                              │   User      │
                              │ Notification│
                              └─────────────┘
```

### Table Definitions

#### Users Table
```sql
CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Courses Table
```sql
CREATE TABLE Courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(255),
    color VARCHAR(50),
    deadline DATETIME,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
```

#### Tasks Table
```sql
CREATE TABLE Tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    due_date DATETIME NOT NULL,
    priority ENUM('HIGH', 'MEDIUM', 'LOW') DEFAULT 'MEDIUM',
    completed BOOLEAN DEFAULT FALSE,
    user_id INTEGER NOT NULL,
    course_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (course_id) REFERENCES Courses(id)
);
```

#### Notifications Table
```sql
CREATE TABLE Notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('TASK_DUE', 'TASK_OVERDUE', 'COURSE_REMINDER', 'SYSTEM', 'ACHIEVEMENT') DEFAULT 'SYSTEM',
    is_read BOOLEAN DEFAULT FALSE,
    priority ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') DEFAULT 'MEDIUM',
    action_url VARCHAR(255),
    scheduled_for DATETIME,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Course Endpoints
- `GET /api/courses` - List user courses
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Task Endpoints
- `GET /api/tasks` - List user tasks
- `GET /api/tasks/overdue` - List overdue tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion

## Frontend Components

### Component Hierarchy
```
App
├── Router
│   ├── LandingPage
│   ├── LoginPage
│   ├── SignupPage
│   ├── Dashboard
│   ├── TasksPage
│   ├── CoursesPage
│   ├── CalendarPage
│   └── ProfilePage
├── Header
├── Footer
├── ProtectedRoute
└── NotificationProvider
    ├── NotificationsContainer
    └── Notification
```

### Key Components
- **Dashboard**: Main overview with statistics and quick actions
- **TasksPage**: Task management interface
- **CoursesPage**: Course management interface
- **CalendarPage**: Calendar view of deadlines
- **Header**: Navigation and user menu
- **Notification**: In-app notification system

## Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
Create `.env` file in backend directory:
```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

## Usage Guide

### Getting Started
1. **Register/Login**: Create account or sign in
2. **Add Courses**: Create courses with deadlines
3. **Create Tasks**: Add tasks with due dates and priorities
4. **Track Progress**: Monitor course and task completion
5. **Set Reminders**: Receive automated notifications

### Best Practices
- Set realistic deadlines for tasks
- Use priority levels effectively
- Regularly update task completion status
- Review overdue tasks weekly

## Technical Specifications

### Performance
- **Response Time**: < 200ms for API calls
- **Database**: SQLite for development, scalable to PostgreSQL
- **Caching**: In-memory caching for frequently accessed data

### Security
- **Authentication**: JWT tokens with expiration
- **Password**: bcrypt hashing
- **Validation**: Input sanitization and validation
- **CORS**: Configured for secure cross-origin requests

### Scalability
- **Modular Architecture**: Easy to extend and maintain
- **Database**: ORM abstraction for database switching
- **API Design**: RESTful endpoints for easy integration

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Maintainer**: Development Team
