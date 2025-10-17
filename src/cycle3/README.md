# Cycle 3 - PHP Backend

This directory contains the complete PHP backend implementation for the Indigenous Art Atlas application.

## Directory Structure

```
cycle3/
├── config/
│   └── dbconn.php           # Database connection with PDO
├── includes/
│   ├── auth.php             # Authentication system
│   └── art_crud.php         # CRUD operations for art entries
└── api/
    ├── login.php            # User login endpoint
    ├── register.php         # User registration endpoint
    ├── logout.php           # User logout endpoint
    ├── get-entries.php      # Get all art entries (with filters)
    ├── get-entry.php        # Get single art entry by ID
    ├── create-entry.php     # Create new art entry
    ├── update-entry.php     # Update existing art entry
    ├── delete-entry.php     # Delete art entry
    ├── approve-entry.php    # Approve pending entry (admin only)
    └── reject-entry.php     # Reject pending entry (admin only)
```

## Database Configuration

The application connects to a MySQL database with the following configuration:

- **Database Name**: `indigenous_art_atlas`
- **Host**: `localhost`
- **User**: `root`
- **Password**: *(empty - update in `/config/dbconn.php` for production)*

### Required Tables

**users table:**
```sql
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin', 'moderator') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);
```

**art_entries table:**
```sql
CREATE TABLE art_entries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    artist VARCHAR(100) NOT NULL,
    culture VARCHAR(100) NOT NULL,
    year_created INT,
    medium VARCHAR(100),
    description TEXT,
    location VARCHAR(200) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    image_url VARCHAR(500),
    submitted_by INT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (submitted_by) REFERENCES users(user_id) ON DELETE CASCADE
);
```

## Security Features

All files implement the following security measures:

- **SQL Injection Prevention**: PDO prepared statements throughout
- **Password Security**: bcrypt hashing with `password_hash()` and `password_verify()`
- **Input Validation**: Type checking, length validation, and format validation
- **Input Sanitization**: `htmlspecialchars()` for XSS prevention
- **Authentication**: Session-based authentication system
- **Authorization**: Role-based access control (admin, moderator, user)
- **CORS Headers**: Configured for API access (adjust for production)

## API Endpoints

### Authentication Endpoints

#### POST `/api/login.php`
Login user and create session.

**Request:**
```json
{
    "username": "username or email",
    "password": "password"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Login successful!",
    "user": {
        "user_id": 1,
        "username": "username",
        "email": "email@example.com",
        "role": "user"
    }
}
```

#### POST `/api/register.php`
Register new user account.

**Request:**
```json
{
    "username": "newuser",
    "email": "email@example.com",
    "password": "password123",
    "role": "user"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Registration successful!",
    "user_id": 1
}
```

#### POST/GET `/api/logout.php`
Logout current user and destroy session.

**Response:**
```json
{
    "success": true,
    "message": "Logout successful!"
}
```

### Art Entry Endpoints

#### GET `/api/get-entries.php`
Get all art entries with optional filters.

**Query Parameters:**
- `status` - Filter by status (approved, pending, rejected)
- `culture` - Filter by culture
- `user_id` - Filter by submitting user

**Response:**
```json
{
    "success": true,
    "entries": [...],
    "count": 10
}
```

#### GET `/api/get-entry.php?id=1`
Get single art entry by ID.

**Response:**
```json
{
    "success": true,
    "entry": {
        "entry_id": 1,
        "title": "Art Title",
        "artist": "Artist Name",
        ...
    }
}
```

#### POST `/api/create-entry.php`
Create new art entry (requires authentication).

**Request:**
```json
{
    "title": "Art Title",
    "artist": "Artist Name",
    "culture": "Cultural Origin",
    "year_created": 2023,
    "medium": "Oil on Canvas",
    "description": "Description here",
    "location": "Location Name",
    "latitude": -33.8688,
    "longitude": 151.2093,
    "image_url": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Art entry created successfully!",
    "entry_id": 1,
    "status": "pending"
}
```

#### POST/PUT `/api/update-entry.php`
Update existing art entry (requires authentication and ownership/admin).

**Request:**
```json
{
    "id": 1,
    "title": "Updated Title",
    "description": "Updated description"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Art entry updated successfully!"
}
```

#### POST/DELETE `/api/delete-entry.php`
Delete art entry (requires authentication and ownership/admin).

**Request:**
```json
{
    "id": 1
}
```

**Response:**
```json
{
    "success": true,
    "message": "Art entry deleted successfully!"
}
```

#### POST `/api/approve-entry.php`
Approve pending art entry (admin only).

**Request:**
```json
{
    "id": 1
}
```

**Response:**
```json
{
    "success": true,
    "message": "Art entry approved successfully!"
}
```

#### POST `/api/reject-entry.php`
Reject pending art entry (admin only).

**Request:**
```json
{
    "id": 1
}
```

**Response:**
```json
{
    "success": true,
    "message": "Art entry rejected."
}
```

## Usage Examples

### JavaScript Fetch API

```javascript
// Login
fetch('/api/login.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: 'user@example.com',
        password: 'password123'
    })
})
.then(response => response.json())
.then(data => console.log(data));

// Get entries
fetch('/api/get-entries.php?status=approved')
.then(response => response.json())
.then(data => console.log(data.entries));

// Create entry
fetch('/api/create-entry.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: 'New Art',
        artist: 'Artist Name',
        culture: 'Culture',
        location: 'Location',
        latitude: -33.8688,
        longitude: 151.2093
    })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Error Handling

All endpoints return JSON responses with:
- `success`: boolean indicating success/failure
- `message`: human-readable message
- Additional data fields as needed

HTTP status codes:
- `200` - Success
- `201` - Created (for new resources)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `405` - Method Not Allowed
- `500` - Internal Server Error

## AI Acknowledgment

All files in this directory were developed with assistance from Claude AI (Anthropic) for:
- Code structure and organization
- Security best practices
- Input validation patterns
- Error handling strategies
- API design patterns


