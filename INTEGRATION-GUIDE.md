# Frontend-Backend Integration Guide
## Indigenous Art Atlas - Full Stack Application

---

## Overview

The Indigenous Art Atlas is now a fully integrated full-stack web application with the frontend (Cycle 2) connected to the backend (Cycle 3) via REST APIs.

---

## Architecture

```
Frontend (Cycle 2)                    Backend (Cycle 3)
├── HTML/CSS/JavaScript      →→→      ├── PHP APIs
├── API Helper (api.js)      ←←←      ├── MySQL Database
└── User Interface                    └── Authentication & CRUD
```

---

## How to Run the Full Application

### 1. Database Setup

# Database Setup

To run this project, you need to import the database:

1. Open phpMyAdmin in your browser: `http://localhost/phpmyadmin`

2. Import the database file: `assignment/src/sql-exports/compatible-setup.sql`

3. Click "Go" to create the database

That's it - the database will be ready to use.



### 2. Access the Application

# Starting the Project

1. Start your local server (XAMPP/WAMP)

2. Open your browser and go to:

`http://localhost/assignment/src/cycle2/index.html`


# Admin Access

To access the admin pages, you have to physically type in the browser:

- Admin Login: `http://localhost/assignment/src/cycle2/admin-login.html`


**Note:** Admin pages are not linked from the regular site for security reasons.

## Test Accounts

### Admin Account
- **Username**: `admin`
- **Password**: `password`
- **Role**: Administrator (can approve/reject submissions)

### Artist Account
- **Username**: `uncle_tommy`
- **Password**: `password`
- **Role**: Artist (can submit art entries)

