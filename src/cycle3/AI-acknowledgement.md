# AI Acknowledgement - Cycle 3: Backend Implementation

## Declaration

I acknowledge the use of **ChatGPT (GPT-4, October 2024)** and **Claude (Claude 3.5 Sonnet, October 2024)** in generating content included in this submission.

The prompts and outputs from these AI tools are documented below, along with my personal interpretation and modifications.

---

## 1. Database Schema Design

### Prompt (Line 1-44)
```
Create a MySQL database schema for an Indigenous Art Atlas web application.

Requirements:
- Users table with authentication fields (username, email, password_hash, role)
- Art entries table with artwork details (title, description, type, location)
- Support for location sensitivity levels (exact, general, hidden)
- Cultural information fields (indigenous group, significance, protocols)
- Moderation workflow (pending, approved, rejected status)
- Proper foreign keys and indexes
```

### AI Output
Generated complete SQL schema with:
- Users table with role-based access control
- Art entries table with comprehensive fields
- Proper indexes for performance
- Foreign key constraints
- Sample data inserts

### Personal Interpretation
I reviewed and adapted the schema to specifically support the Indigenous Art Atlas requirements. I added specific art types relevant to Australian indigenous art (rock_art, bark_painting, ceremonial) and ensured the location sensitivity field aligns with our ethical considerations for sacred sites. The schema enables the full CRUD functionality required for Cycle 3.

**File**: `src/cycle3/sql/schema.sql`

---

## 2. Database Connection (PDO)

### Prompt (Line 45-67)
```
Create a secure PHP database connection using PDO for MySQL.

Requirements:
- Use PDO with prepared statement support
- UTF-8 character encoding for indigenous language support
- Exception error mode for proper error handling
- Secure credential management
- Connection reuse to avoid multiple connections
```

### AI Output
Generated `dbconn.php` with:
- PDO initialization with security options
- UTF-8 charset configuration
- Error handling with try-catch
- Global connection variable management

### Personal Interpretation
The AI-generated connection code provides a solid foundation for secure database access. I understand that PDO's prepared statements prevent SQL injection attacks, which is critical for user-submitted data. The UTF-8 encoding ensures proper storage of indigenous language characters. In a production environment, I would move the credentials to environment variables.

**File**: `src/cycle3/config/dbconn.php`
**Lines**: All (69 lines)

---

## 3. Authentication System

### Prompt (Line 89-145)
```
Create a complete PHP authentication system with:
- User registration with password hashing (bcrypt)
- Login with credential verification
- Secure session management
- Role-based access control (admin, artist, researcher)
- Helper functions for checking login status and roles
- Input validation and error handling
```

### AI Output
Generated `auth.php` with functions:
- `registerUser()` - Creates new user accounts
- `loginUser()` - Authenticates users
- `logoutUser()` - Destroys sessions
- `isLoggedIn()` - Checks authentication status
- `hasRole()` - Checks user permissions
- `getCurrentUser()` - Gets current user data

### Personal Interpretation
This authentication system implements industry-standard security practices. The use of `password_hash()` and `password_verify()` ensures passwords are securely stored and never exposed in plain text. Session management prevents unauthorized access to protected resources. I understand that the role-based access control allows us to restrict admin functions (like approving art submissions) to authorized users only.

**File**: `src/cycle3/includes/auth.php`
**Lines**: All (216 lines)

---

## 4. CRUD Operations for Art Entries

### Prompt (Line 167-289)
```
Create comprehensive CRUD operations for art entries:

CREATE:
- Validate all required fields
- Sanitize user input to prevent XSS
- Check user authentication
- Set status to 'pending' for moderation

READ:
- Get all entries with optional filters (status, type, user_id)
- Support pagination with limit and offset
- Get single entry by ID with submitter details

UPDATE:
- Verify user owns the entry or is admin
- Update only provided fields
- Sanitize all input

DELETE:
- Verify user owns the entry or is admin
- Remove entry from database

ADMIN:
- Approve entries (change status to approved)
- Reject entries with reason
```

### AI Output
Generated `art_crud.php` with complete CRUD functions:
- `createArtEntry($data)` - Create with validation
- `getArtEntries($filters, $limit, $offset)` - Read multiple
- `getArtEntry($entry_id)` - Read single
- `updateArtEntry($entry_id, $data)` - Update with authorization
- `deleteArtEntry($entry_id)` - Delete with authorization
- `approveArtEntry($entry_id, $notes)` - Admin approval
- `rejectArtEntry($entry_id, $reason)` - Admin rejection

### Personal Interpretation
These CRUD operations form the core backend functionality for Cycle 3. I understand that:

1. **Security**: Every function uses prepared statements and input sanitization to prevent SQL injection and XSS attacks
2. **Authorization**: Update and delete operations verify that users can only modify their own entries (unless they're admins)
3. **Validation**: The create function validates coordinates, required fields, and data types before insertion
4. **Cultural Sensitivity**: The location_sensitivity field allows submitters to protect sacred site locations

The moderation workflow (pending → approved/rejected) ensures all art entries are reviewed before going live, which is important for maintaining quality and cultural appropriateness.

**File**: `src/cycle3/includes/art_crud.php`
**Lines**: All (423 lines)

---

## 5. RESTful API Endpoints

### Prompt (Line 312-389)
```
Create REST API endpoints for the Indigenous Art Atlas:

Authentication APIs:
- POST /api/login.php - User login
- POST /api/register.php - User registration
- POST /api/logout.php - User logout

Art Entry APIs:
- GET /api/get-entries.php - Get all entries (with filters)
- GET /api/get-entry.php?id=X - Get single entry
- POST /api/create-entry.php - Create new entry
- PUT /api/update-entry.php?id=X - Update entry
- DELETE /api/delete-entry.php?id=X - Delete entry
- POST /api/approve-entry.php?id=X - Approve entry (admin)
- POST /api/reject-entry.php?id=X - Reject entry (admin)

Requirements:
- JSON response format
- Appropriate HTTP status codes
- CORS headers for development
- Input validation
- Error handling
```

### AI Output
Generated 10 API endpoint files with:
- JSON request/response handling
- HTTP method validation
- Appropriate status codes (200, 201, 400, 401, 403, 404, 405)
- CORS headers for frontend integration
- Error messages for debugging

### Personal Interpretation
These API endpoints provide a clean interface between the frontend (from Cycle 2) and the backend. I understand that:

1. **RESTful Design**: Using appropriate HTTP methods (GET for read, POST for create, PUT for update, DELETE for delete) follows REST principles
2. **JSON Format**: All responses are JSON, making it easy for JavaScript to parse
3. **Status Codes**: Using proper HTTP status codes (401 for unauthorized, 404 for not found) helps with debugging
4. **CORS Headers**: Allow the frontend to make cross-origin requests during development

The API structure separates concerns, making the codebase maintainable and testable.

**Files**:
- `src/cycle3/api/login.php` (44 lines)
- `src/cycle3/api/register.php` (23 lines)
- `src/cycle3/api/logout.php` (19 lines)
- `src/cycle3/api/get-entries.php` (33 lines)
- `src/cycle3/api/get-entry.php` (29 lines)
- `src/cycle3/api/create-entry.php` (32 lines)
- `src/cycle3/api/update-entry.php` (37 lines)
- `src/cycle3/api/delete-entry.php` (29 lines)
- `src/cycle3/api/approve-entry.php` (34 lines)
- `src/cycle3/api/reject-entry.php` (31 lines)

---

## 6. Documentation and Setup

### Prompt (Line 412-456)
```
Create comprehensive documentation for the Cycle 3 backend including:
- Installation instructions
- Database setup steps
- API endpoint documentation with examples
- Testing procedures
- Security considerations
- Troubleshooting guide
```

### AI Output
Generated `README.md` with complete documentation covering all aspects of setup, usage, and testing.

### Personal Interpretation
Clear documentation is essential for the oral presentation and for other developers to understand the system. The README provides step-by-step instructions for setting up the backend, which will be useful for demonstrating the full-stack functionality in the Cycle 3 presentation.

**File**: `src/cycle3/README.md`

---

## Summary of AI Usage

### Files Modified/Created with AI Assistance:
1. `sql/schema.sql` - Database schema (100% AI-generated, reviewed and adapted)
2. `config/dbconn.php` - Database connection (90% AI-generated, 10% customized)
3. `includes/auth.php` - Authentication system (95% AI-generated, 5% adapted)
4. `includes/art_crud.php` - CRUD operations (90% AI-generated, 10% customized for Indigenous Art Atlas)
5. `api/*.php` (10 files) - REST API endpoints (100% AI-generated, reviewed)
6. `README.md` - Documentation (80% AI-generated, 20% project-specific additions)

### Total Code Statistics:
- **Total Lines**: ~1,850 lines of PHP and SQL
- **AI-Generated**: ~1,600 lines (86%)
- **Human-Written/Adapted**: ~250 lines (14%)

### What I Learned:
1. **Security Best Practices**: Understanding PDO prepared statements, password hashing, and input sanitization
2. **RESTful API Design**: Proper HTTP methods, status codes, and JSON responses
3. **Session Management**: How to securely manage user sessions in PHP
4. **Database Design**: Creating normalized schemas with proper relationships and indexes
5. **CRUD Architecture**: Separating concerns between database operations and API endpoints

### Ethical Considerations:
All AI-generated code was:
- ✓ Carefully reviewed for correctness and security
- ✓ Tested for functionality
- ✓ Adapted to fit the Indigenous Art Atlas requirements
- ✓ Documented with comments explaining the logic
- ✓ Properly attributed in this acknowledgement file

---

## References

OpenAI. (2024). ChatGPT (GPT-4, October 2024 version) [Large language model]. https://chat.openai.com/

Anthropic. (2024). Claude (3.5 Sonnet, October 2024 version) [Large language model]. https://claude.ai/
