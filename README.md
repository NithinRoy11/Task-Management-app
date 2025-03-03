# Task Management App

## Overview
The **Task Management App** is designed to help users efficiently organize and track their tasks. It allows users to create, update, delete, and manage their tasks seamlessly with an intuitive interface.

## Features
- User authentication (signup/login)
- Create, edit, and delete tasks
- Set task priorities and due dates
- Track task completion status
- Responsive UI for mobile and desktop
- API-based architecture for seamless integration

## Tech Stack
### Frontend
- **Framework:** React.js
- **State Management:** Redux (if applicable)
- **Styling:** Tailwind CSS / CSS Modules
- **Routing:** React Router
- **API Communication:** Axios / Fetch API

### Backend
- **Framework:** Node.js with Express.js
- **Authentication:** JWT (JSON Web Token)
- **Database:** MySQL (using Sequelize ORM)
- **Security:** Helmet, CORS, bcrypt for password hashing
- **Logging:** Winston / Morgan

### Database Schema
#### Users Table
- `id`: INT, Primary Key, Auto-increment
- `name`: VARCHAR(255)
- `email`: VARCHAR(255), Unique
- `password`: VARCHAR(255) (Hashed)
- `createdAt`: TIMESTAMP

#### Tasks Table
- `id`: INT, Primary Key, Auto-increment
- `userId`: INT, Foreign Key (References Users Table)
- `title`: VARCHAR(255)
- `description`: TEXT
- `status`: ENUM ('Pending', 'In Progress', 'Completed')
- `dueDate`: DATETIME
- `createdAt`: TIMESTAMP

## Installation Guide
### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or later)
- MySQL (local or cloud-based)
- npm or yarn

### Steps to Clone and Run the Project
#### Clone the Repository
```sh
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```

#### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables in `.env` file:
   ```env
   PORT=5000
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   JWT_SECRET=your_secret_key
   ```
4. Run database migrations:
   ```sh
   npx sequelize-cli db:migrate
   ```
5. Start the backend server:
   ```sh
   npm start
   ```

#### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm start
   ```

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Fetch all tasks for a user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Deployment
### Frontend
- Deploy on **Vercel / Netlify**
- Run:
  ```sh
  npm run build
  ```
- Upload `build` folder to the hosting platform

### Backend
- Deploy on **Heroku / AWS / Render**
- Use **MySQL database** for production
- Run:
  ```sh
  npm start
  ```


