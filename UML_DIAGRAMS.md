# Study Scheduler - UML Diagrams & System Design

## Table of Contents
1. [Class Diagrams](#class-diagrams)
2. [Sequence Diagrams](#sequence-diagrams)
3. [Use Case Diagrams](#use-case-diagrams)
4. [Component Diagrams](#component-diagrams)
5. [Database ERD](#database-erd)

## Class Diagrams

### 1. Backend Models Class Diagram

```mermaid
classDiagram
    class User {
        +Integer id
        +String email
        +String password_hash
        +String name
        +DateTime created_at
        +DateTime updated_at
        +createUser()
        +findByEmail()
        +validatePassword()
    }
    
    class Course {
        +Integer id
        +String name
        +String code
        +String color
        +DateTime deadline
        +Integer user_id
        +DateTime created_at
        +DateTime updated_at
        +createCourse()
        +updateCourse()
        +deleteCourse()
    }
    
    class Task {
        +Integer id
        +String title
        +DateTime due_date
        +String priority
        +Boolean completed
        +Integer user_id
        +Integer course_id
        +DateTime created_at
        +DateTime updated_at
        +createTask()
        +updateTask()
        +toggleCompletion()
        +getOverdueTasks()
    }
    
    class Notification {
        +Integer id
        +String title
        +String message
        +String type
        +Boolean is_read
        +String priority
        +String action_url
        +DateTime scheduled_for
        +Integer user_id
        +DateTime created_at
        +DateTime updated_at
        +createNotification()
        +markAsRead()
        +sendEmail()
    }
    
    class Sequelize {
        +authenticate()
        +sync()
        +close()
    }
    
    User ||--o{ Course : "has many"
    User ||--o{ Task : "has many"
    User ||--o{ Notification : "has many"
    Course ||--o{ Task : "has many"
    User }o--|| Sequelize : "uses"
```

### 2. Frontend Components Class Diagram

```mermaid
classDiagram
    class App {
        +User user
        +String token
        +Boolean initializing
        +useEffect()
        +render()
    }
    
    class Dashboard {
        +Array tasks
        +Array courses
        +Function addNotification
        +useEffect()
        +computeCourseProgress()
        +render()
    }
    
    class TasksPage {
        +Array tasks
        +Array courses
        +String filter
        +String sortBy
        +createTask()
        +updateTask()
        +deleteTask()
        +toggleTask()
        +render()
    }
    
    class CoursesPage {
        +Array courses
        +Boolean showForm
        +Object formData
        +createCourse()
        +updateCourse()
        +deleteCourse()
        +render()
    }
    
    class Header {
        +User user
        +Function setUser
        +logout()
        +render()
    }
    
    class NotificationContext {
        +Array notifications
        +Function addNotification
        +Function removeNotification
        +Function markAsRead
        +Provider value
    }
    
    App ||--|| Dashboard : "renders"
    App ||--|| TasksPage : "renders"
    App ||--|| CoursesPage : "renders"
    App ||--|| Header : "renders"
    App ||--|| NotificationContext : "provides"
    Dashboard ||--|| NotificationContext : "uses"
```

### 3. Controllers Class Diagram

```mermaid
classDiagram
    class AuthController {
        +register(req, res)
        +login(req, res)
        +me(req, res)
        +validateInput()
        +hashPassword()
        +generateToken()
    }
    
    class CourseController {
        +getCourses(req, res)
        +createCourse(req, res)
        +updateCourse(req, res)
        +deleteCourse(req, res)
        +validateCourse()
        +checkOwnership()
    }
    
    class TaskController {
        +getTasks(req, res)
        +createTask(req, res)
        +updateTask(req, res)
        +deleteTask(req, res)
        +toggleTask(req, res)
        +getOverdueTasks(req, res)
        +validateTask()
        +checkOwnership()
    }
    
    class AuthMiddleware {
        +verifyToken(req, res, next)
        +extractToken()
        +validateToken()
    }
    
    AuthController ||--|| AuthMiddleware : "uses"
    CourseController ||--|| AuthMiddleware : "uses"
    TaskController ||--|| AuthMiddleware : "uses"
```

## Sequence Diagrams

### 1. User Registration Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant DB as Database
    
    U->>F: Fill registration form
    F->>F: Validate form data
    F->>B: POST /api/auth/register
    B->>B: Validate input
    B->>B: Hash password
    B->>DB: Create user record
    DB-->>B: User created
    B->>B: Generate JWT token
    B-->>F: Success response + token
    F->>F: Store token
    F-->>U: Redirect to dashboard
```

### 2. Task Creation Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant DB as Database
    
    U->>F: Fill task form
    F->>F: Validate form data
    F->>B: POST /api/tasks
    B->>B: Verify JWT token
    B->>B: Validate task data
    B->>DB: Create task record
    DB-->>B: Task created
    B->>B: Create notification
    B->>DB: Save notification
    B-->>F: Success response
    F->>F: Update task list
    F-->>U: Show success message
```

### 3. Daily Task Reminder Flow

```mermaid
sequenceDiagram
    participant Cron as Cron Job
    participant B as Backend
    participant DB as Database
    participant Email as Email Service
    
    Cron->>B: Daily at 8:00 AM
    B->>DB: Query overdue tasks
    DB-->>B: Task list
    B->>B: Filter tasks due in 24h
    loop For each task
        B->>DB: Get user details
        DB-->>B: User info
        B->>Email: Send reminder email
        Email-->>B: Email sent
    end
    B->>B: Log completion
```

## Use Case Diagrams

### 1. Main System Use Cases

```mermaid
graph TB
    subgraph "Study Scheduler System"
        subgraph "User Management"
            UC1[Register Account]
            UC2[Login]
            UC3[View Profile]
            UC4[Update Profile]
        end
        
        subgraph "Course Management"
            UC5[Create Course]
            UC6[Edit Course]
            UC7[Delete Course]
            UC8[View Course Progress]
        end
        
        subgraph "Task Management"
            UC9[Create Task]
            UC10[Edit Task]
            UC11[Delete Task]
            UC12[Mark Task Complete]
            UC13[Set Task Priority]
        end
        
        subgraph "Notifications"
            UC14[View Notifications]
            UC15[Mark Notification Read]
            UC16[Receive Email Reminders]
        end
        
        subgraph "Dashboard"
            UC17[View Dashboard]
            UC18[View Statistics]
            UC19[Quick Actions]
        end
    end
    
    subgraph "Actors"
        A1[Student]
        A2[Teacher]
        A3[System]
    end
    
    A1 --> UC1
    A1 --> UC2
    A1 --> UC5
    A1 --> UC6
    A1 --> UC7
    A1 --> UC8
    A1 --> UC9
    A1 --> UC10
    A1 --> UC11
    A1 --> UC12
    A1 --> UC13
    A1 --> UC14
    A1 --> UC15
    A1 --> UC17
    A1 --> UC18
    A1 --> UC19
    
    A2 --> UC1
    A2 --> UC2
    A2 --> UC5
    A2 --> UC6
    A2 --> UC7
    A2 --> UC8
    A2 --> UC9
    A2 --> UC10
    A2 --> UC11
    A2 --> UC12
    A2 --> UC13
    A2 --> UC14
    A2 --> UC15
    A2 --> UC17
    A2 --> UC18
    A2 --> UC19
    
    A3 --> UC16
```

### 2. Authentication Use Cases

```mermaid
graph TB
    subgraph "Authentication System"
        UC1[Register Account]
        UC2[Login]
        UC3[Logout]
        UC4[Forgot Password]
        UC5[Reset Password]
        UC6[Verify Token]
    end
    
    subgraph "Actors"
        A1[Unauthenticated User]
        A2[Authenticated User]
        A3[System]
    end
    
    A1 --> UC1
    A1 --> UC2
    A1 --> UC4
    A2 --> UC3
    A2 --> UC5
    A3 --> UC6
```

## Component Diagrams

### 1. System Architecture Components

```mermaid
graph TB
    subgraph "Frontend Layer"
        C1[React App]
        C2[Components]
        C3[Pages]
        C4[Contexts]
        C5[API Client]
    end
    
    subgraph "Backend Layer"
        C6[Express Server]
        C7[Routes]
        C8[Controllers]
        C9[Middleware]
        C10[Services]
    end
    
    subgraph "Data Layer"
        C11[Sequelize ORM]
        C12[SQLite Database]
        C13[Email Service]
        C14[Cron Jobs]
    end
    
    C1 --> C2
    C1 --> C3
    C1 --> C4
    C1 --> C5
    C5 --> C6
    C6 --> C7
    C7 --> C8
    C8 --> C9
    C8 --> C10
    C8 --> C11
    C11 --> C12
    C10 --> C13
    C10 --> C14
```

### 2. Frontend Component Structure

```mermaid
graph TB
    subgraph "App Component"
        AC1[Router]
        AC2[State Management]
        AC3[Context Providers]
    end
    
    subgraph "Page Components"
        PC1[LandingPage]
        PC2[LoginPage]
        PC3[SignupPage]
        PC4[Dashboard]
        PC5[TasksPage]
        PC6[CoursesPage]
        PC7[CalendarPage]
        PC8[ProfilePage]
    end
    
    subgraph "Shared Components"
        SC1[Header]
        SC2[Footer]
        SC3[ProtectedRoute]
        SC4[Notification]
        SC5[Testimonials]
    end
    
    AC1 --> PC1
    AC1 --> PC2
    AC1 --> PC3
    AC1 --> PC4
    AC1 --> PC5
    AC1 --> PC6
    AC1 --> PC7
    AC1 --> PC8
    
    PC4 --> SC1
    PC5 --> SC1
    PC6 --> SC1
    PC7 --> SC1
    PC8 --> SC1
    
    AC3 --> SC4
```

## Database ERD

### Complete Entity Relationship Diagram

```mermaid
erDiagram
    Users {
        int id PK
        string email UK
        string password_hash
        string name
        datetime created_at
        datetime updated_at
    }
    
    Courses {
        int id PK
        string name
        string code
        string color
        datetime deadline
        int user_id FK
        datetime created_at
        datetime updated_at
    }
    
    Tasks {
        int id PK
        string title
        datetime due_date
        enum priority
        boolean completed
        int user_id FK
        int course_id FK
        datetime created_at
        datetime updated_at
    }
    
    Notifications {
        int id PK
        string title
        string message
        enum type
        boolean is_read
        enum priority
        string action_url
        datetime scheduled_for
        int user_id FK
        datetime created_at
        datetime updated_at
    }
    
    Users ||--o{ Courses : "creates"
    Users ||--o{ Tasks : "creates"
    Users ||--o{ Notifications : "receives"
    Courses ||--o{ Tasks : "contains"
```

## State Machine Diagrams

### 1. Task State Machine

```mermaid
stateDiagram-v2
    [*] --> Created
    Created --> InProgress : Start Task
    InProgress --> Completed : Mark Complete
    InProgress --> Overdue : Past Due Date
    Overdue --> Completed : Mark Complete
    Overdue --> InProgress : Resume Task
    Completed --> [*]
```

### 2. User Authentication State

```mermaid
stateDiagram-v2
    [*] --> Unauthenticated
    Unauthenticated --> Authenticating : Login Attempt
    Authenticating --> Authenticated : Success
    Authenticating --> Unauthenticated : Failure
    Authenticated --> Unauthenticated : Logout
    Authenticated --> [*]
```

---

**Note**: These diagrams are generated using Mermaid syntax and can be rendered in GitHub, GitLab, or any Mermaid-compatible viewer. The diagrams provide a comprehensive view of the system architecture, data flow, and component relationships.
