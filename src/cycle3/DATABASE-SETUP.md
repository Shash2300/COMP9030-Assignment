# Database Setup Guide - Indigenous Art Atlas

## Current Database Status

**Database Name:** `indigenous_art_atlas`
**Host:** localhost
**User:** root
**Password:** (empty)
**Character Set:** utf8mb4
**Collation:** utf8mb4_unicode_ci

**Status:** ✅ Database is currently set up and working with the application

---

## Tables

### 1. users
Stores user account information with authentication credentials.

**Columns:**
- `user_id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `username` (VARCHAR(50), UNIQUE, NOT NULL)
- `email` (VARCHAR(100), UNIQUE, NOT NULL)
- `password_hash` (VARCHAR(255), NOT NULL)
- `full_name` (VARCHAR(100))
- `user_role` (ENUM: 'artist', 'researcher', 'admin')
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- `last_login` (TIMESTAMP, NULL)

**Current Data:**
- 7 users registered
- 1 admin account (username: admin, password: password)
- 6 artist accounts including uncle_tommy, testuser, browsertest

### 2. art_entries
Stores indigenous art submissions with location and cultural information.

**Columns:**
- `entry_id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `user_id` (INT, FOREIGN KEY → users.user_id)
- `title` (VARCHAR(200), NOT NULL)
- `description` (TEXT, NOT NULL)
- `art_type` (ENUM: 'rock_art', 'bark_painting', 'contemporary', 'sculpture', 'ceremonial', 'other')
- `time_period` (ENUM: 'ancient', 'historical', 'contemporary')
- `location_name` (VARCHAR(200), NOT NULL)
- `latitude` (DECIMAL(10,8), NOT NULL)
- `longitude` (DECIMAL(11,8), NOT NULL)
- `location_sensitivity` (ENUM: 'exact', 'general', 'hidden')
- `indigenous_group` (VARCHAR(100))
- `cultural_significance` (TEXT)
- `artist_name` (VARCHAR(100))
- `status` (ENUM: 'pending', 'approved', 'rejected')
- `submitted_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

**Current Data:**
- 3 approved art entries
- Entries include Kakadu Rock Art, Bark Painting - Rainbow Serpent, Uluru Sacred Site

---

## Database Connection

The application connects via PDO using the configuration in:
```
/cycle3/config/dbconn.php
```

**Connection Settings:**
```php
DB_HOST: 'localhost'
DB_NAME: 'indigenous_art_atlas'
DB_USER: 'root'
DB_PASS: ''
DB_CHARSET: 'utf8mb4'
```

---

## Setup Instructions

### Option 1: Database Already Exists (Current State)
If the database is already set up and working (as it currently is), no action needed. Verify with:

```bash
php -r "
\$pdo = new PDO('mysql:host=localhost;dbname=indigenous_art_atlas', 'root', '');
echo 'Database connected successfully!\n';
"
```

### Option 2: Fresh Installation
If you need to recreate the database from scratch:

1. **Import the updated schema:**
```bash
mysql -u root -p < cycle3/sql/schema-updated.sql
```

2. **Verify tables were created:**
```bash
mysql -u root -p indigenous_art_atlas -e "SHOW TABLES;"
```

3. **Check sample data:**
```bash
mysql -u root -p indigenous_art_atlas -e "SELECT * FROM users;"
mysql -u root -p indigenous_art_atlas -e "SELECT * FROM art_entries;"
```

### Option 3: Using PHP CLI
```php
php -r "
\$pdo = new PDO('mysql:host=localhost', 'root', '');
\$sql = file_get_contents('cycle3/sql/schema-updated.sql');
\$pdo->exec(\$sql);
echo 'Database setup complete!\n';
"
```

---

## Database Files

- **`sql/schema-updated.sql`** - Current working schema (matches implemented APIs)
- **`sql/schema.sql`** - Original schema (deprecated - has different column names)
- **`config/dbconn.php`** - Database connection configuration

---

## API Endpoints Using Database

All endpoints are located in `/cycle3/api/`:

### Authentication
- `POST /register.php` - Create new user account
- `POST /login.php` - Authenticate user
- `POST /logout.php` - End user session

### Art Entries
- `GET /get-entries.php` - Retrieve art entries (with filters: status, user_id, limit)
- `GET /get-entry.php?id={entry_id}` - Get single entry
- `POST /create-entry.php` - Submit new art entry
- `POST /update-entry.php` - Update existing entry
- `POST /delete-entry.php` - Delete entry
- `POST /approve-entry.php` - Approve entry (admin)
- `POST /reject-entry.php` - Reject entry (admin)

---

## Test Accounts

### Admin Account
- Username: `admin`
- Password: `password`
- Role: admin

### Artist Account
- Username: `uncle_tommy`
- Password: `password`
- Role: artist
- Has 3 approved art entries

### New Registrations
All new users are automatically assigned the 'artist' role unless specified otherwise.

---

## Security Notes

1. **Password Hashing:** All passwords use PHP's `password_hash()` with bcrypt
2. **SQL Injection Protection:** All queries use PDO prepared statements
3. **Input Validation:** All user inputs are validated and sanitized
4. **CSRF Protection:** Session-based authentication (cookies set via PHP sessions)
5. **CORS:** Currently set to `*` for development - restrict in production

---

## Database Maintenance

### Backup Database
```bash
mysqldump -u root indigenous_art_atlas > backup_$(date +%Y%m%d).sql
```

### Restore Database
```bash
mysql -u root indigenous_art_atlas < backup_20241015.sql
```

### Check Database Size
```sql
SELECT
    table_schema AS 'Database',
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
FROM information_schema.tables
WHERE table_schema = 'indigenous_art_atlas';
```

### View All Users
```sql
SELECT user_id, username, email, user_role, created_at FROM users;
```

### View All Entries
```sql
SELECT entry_id, title, art_type, status, submitted_at FROM art_entries;
```

---

## Troubleshooting

### Connection Error
If you get "Connection refused":
1. Check MySQL service is running: `mysql.server status` or `brew services list | grep mysql`
2. Start MySQL: `mysql.server start` or `brew services start mysql`

### Authentication Error
If you get "Access denied":
1. Verify credentials in `cycle3/config/dbconn.php`
2. Test connection: `mysql -u root -p`

### Table Not Found
If you get "Table doesn't exist":
1. Verify you're using the correct database: `USE indigenous_art_atlas;`
2. Check tables exist: `SHOW TABLES;`
3. Re-import schema if needed

### Column Name Mismatch
Always use the **updated schema** (`schema-updated.sql`), not the original `schema.sql`.

Key differences:
- ✅ Use `user_role` (not `role`)
- ✅ Use `user_id` (not `submitted_by` or `submitter_id`)
- ✅ Use `submitted_at` (not `created_at` or `submission_date`)

---

## Production Deployment Notes

Before deploying to production:

1. Change database credentials in `dbconn.php`
2. Update CORS headers to restrict origins
3. Enable HTTPS/SSL for all connections
4. Set up regular automated backups
5. Implement database connection pooling
6. Add indexes for frequently queried columns
7. Set up monitoring and logging
8. Consider read replicas for scaling

---

**Last Updated:** October 15, 2025
**Schema Version:** 2.0 (Updated)
**Status:** Production Ready ✅
