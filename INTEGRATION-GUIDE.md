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

The database is already created and populated. To recreate or reset:

```bash
# Login to MySQL
mysql -u root

# Create database (if needed)
CREATE DATABASE indigenous_art_atlas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Import schema
mysql -u root indigenous_art_atlas < src/cycle3/sql/schema.sql
```

### 2. Start PHP Server

```bash
# Option 1: Start from cycle2 (frontend) directory
cd src/cycle2
php -S localhost:8000

# Option 2: Start from cycle3 (backend) directory
cd src/cycle3
php -S localhost:8000
```

### 3. Access the Application

Open your browser and go to:
- **Frontend**: `http://localhost:8000/index.html`
- **Browse Art**: `http://localhost:8000/browse.html`
- **Login**: `http://localhost:8000/login.html`

---

## Test Accounts

### Admin Account
- **Username**: `admin`
- **Password**: `password`
- **Role**: Administrator (can approve/reject submissions)

### Artist Account
- **Username**: `uncle_tommy`
- **Password**: `password`
- **Role**: Artist (can submit art entries)

---

## Integrated Features

### ✅ Authentication
- **Login**: Uses PHP sessions with backend authentication
- **Register**: Creates real user accounts in database
- **Logout**: Destroys PHP session and clears localStorage

### ✅ Art Browsing
- **Homepage**: Fetches recent approved art entries from database
- **Browse Page**: Displays all approved entries with real-time filtering
- **Art Detail**: Shows complete information from database

### ✅ Art Submission
- **Form Submission**: Creates new entries in database
- **Status Tracking**: Entries marked as "pending" awaiting approval
- **User Dashboard**: Shows user's submitted entries

### ✅ Admin Functions
- **Moderation**: Admins can approve or reject pending entries
- **User Management**: View all users and their roles

---

## API Endpoints Used

### Authentication APIs
```
POST /cycle3/api/login.php
POST /cycle3/api/register.php
POST /cycle3/api/logout.php
```

### Art Entry APIs
```
GET  /cycle3/api/get-entries.php?status=approved&limit=10
GET  /cycle3/api/get-entry.php?id=1
POST /cycle3/api/create-entry.php
POST /cycle3/api/update-entry.php?id=1
POST /cycle3/api/delete-entry.php?id=1
```

### Admin APIs
```
POST /cycle3/api/approve-entry.php?id=1
POST /cycle3/api/reject-entry.php?id=1
```

---

## How the Integration Works

### 1. API Helper (`src/cycle2/js/api.js`)

This file provides a clean interface for all backend communication:

```javascript
// Example: Login
const result = await API.login(username, password);

// Example: Get art entries
const result = await API.getEntries({ status: 'approved', limit: 6 });

// Example: Create art entry
const result = await API.createEntry(artData);
```

### 2. Data Conversion

The API helper converts between frontend and backend data formats:

**Backend format** (from MySQL):
```json
{
  "entry_id": 1,
  "art_type": "rock_art",
  "time_period": "ancient",
  "location_name": "Kakadu National Park"
}
```

**Frontend format** (for display):
```json
{
  "id": 1,
  "artType": "rock_art",
  "period": "ancient",
  "locationDescription": "Kakadu National Park"
}
```

### 3. Async/Await Pattern

All API calls use async/await for clean asynchronous code:

```javascript
async function initFeaturedArt() {
    // Show loading state
    featuredArtGrid.innerHTML = '<p>Loading...</p>';

    // Fetch from backend
    const recentArt = await getRecentArt(6);

    // Display results
    featuredArtGrid.innerHTML = recentArt.map(art => createArtCard(art)).join('');
}
```

---

## Testing the Integration

### Test 1: User Registration & Login

1. Go to `http://localhost:8000/register.html`
2. Register a new account
3. You'll be redirected to the dashboard
4. Logout and login again to verify

**Expected**: User account created in database, PHP session established

### Test 2: Browse Art Entries

1. Go to `http://localhost:8000/browse.html`
2. You should see art entries from the database
3. Try filtering by art type or period
4. Click on an entry to view details

**Expected**: Real data from MySQL database displayed

### Test 3: Submit Art Entry

1. Login as `uncle_tommy` (password: `password`)
2. Go to Submit Art page
3. Fill out the form and submit
4. Check your dashboard - entry should show as "pending"

**Expected**: New entry created in database with status="pending"

### Test 4: Admin Moderation

1. Login as `admin` (password: `password`)
2. Go to admin dashboard
3. Find pending entries
4. Approve or reject them

**Expected**: Entry status changes in database, visible on browse page when approved

---

## Troubleshooting

### Problem: "Connection error" when calling APIs

**Solution**: Make sure PHP server is running from the correct directory. The frontend expects APIs at `../cycle3/api/`.

```bash
# Start from cycle2 directory
cd src/cycle2
php -S localhost:8000
```

### Problem: CORS errors in console

**Solution**: All API files include CORS headers for development:
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
```

### Problem: Login fails with "Invalid credentials"

**Solution**: The default password for test accounts is `password`. The password hash in the database is bcrypt of "password".

### Problem: "Database connection failed"

**Solution**: Check MySQL is running and database exists:
```bash
mysql -u root -e "SHOW DATABASES;"
# Should list: indigenous_art_atlas
```

---

## Database Structure

### Users Table
```sql
user_id, username, email, password_hash, full_name, user_role, created_at
```

### Art Entries Table
```sql
entry_id, user_id, title, description, art_type, time_period,
location_name, latitude, longitude, location_sensitivity,
indigenous_group, cultural_significance, artist_name,
status, submitted_at
```

---

## File Structure

```
COMP9030-Assignment/
├── src/
│   ├── cycle2/                    # Frontend
│   │   ├── index.html            # Homepage
│   │   ├── browse.html           # Browse art
│   │   ├── login.html            # Login page
│   │   ├── register.html         # Registration
│   │   ├── dashboard.html        # User dashboard
│   │   ├── submit-art.html       # Submit form
│   │   ├── js/
│   │   │   ├── api.js           # ⭐ NEW - API helper
│   │   │   ├── main.js          # ⭐ UPDATED - Now uses API
│   │   │   ├── map.js           # Map functionality
│   │   │   └── validation.js    # Form validation
│   │   └── css/
│   │
│   └── cycle3/                    # Backend
│       ├── api/                   # REST API endpoints
│       │   ├── login.php
│       │   ├── register.php
│       │   ├── get-entries.php
│       │   └── ...
│       ├── includes/
│       │   ├── auth.php          # Authentication
│       │   └── art_crud.php      # CRUD operations
│       ├── config/
│       │   └── dbconn.php        # Database connection
│       └── sql/
│           └── schema.sql        # Database schema
│
└── INTEGRATION-GUIDE.md          # This file
```

---

## Security Features

✓ **SQL Injection Prevention**: PDO prepared statements
✓ **XSS Protection**: Input sanitization with `htmlspecialchars()`
✓ **Password Security**: Bcrypt hashing with `password_hash()`
✓ **Session Management**: Secure PHP sessions
✓ **CSRF Protection**: Session validation on all API requests
✓ **Role-Based Access**: Admin functions restricted to admin users

---

## Future Enhancements

Potential improvements for future cycles:
- Image upload functionality for art entries
- Real-time map updates with WebSockets
- Advanced search with Elasticsearch
- User profile pages with social features
- Email notifications for entry approvals
- Mobile responsive improvements
- Progressive Web App (PWA) features

---

## Summary

The Indigenous Art Atlas is now a complete full-stack application with:
- **Frontend**: Modern, responsive HTML/CSS/JavaScript interface
- **Backend**: Secure PHP REST API with MySQL database
- **Integration**: Clean API layer connecting both layers
- **Authentication**: Real user accounts with PHP sessions
- **Database**: Persistent storage of art entries and users

All cycles (1-4) are complete and the application is fully functional!

---

**Last Updated**: October 15, 2024
**Status**: ✅ Fully Integrated and Functional
