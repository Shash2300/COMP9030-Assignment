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




## Summary of AI Usage

### Files Modified/Created with AI Assistance:
1. `sql/schema.sql` - Database schema (100% AI-generated, reviewed and adapted)
2. `config/dbconn.php` - Database connection (90% AI-generated, 10% customized)
3. `includes/auth.php` - Authentication system (95% AI-generated, 5% adapted)
4. `includes/art_crud.php` - CRUD operations (90% AI-generated, 10% customized for Indigenous Art Atlas)
5. `api/*.php` (10 files) - REST API endpoints (100% AI-generated, reviewed)
6. `README.md` - Documentation (80% AI-generated, 20% project-specific additions)



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







# AI Acknowledgement - Frontend Development

## Declaration

I acknowledge the use of **Claude (Claude 3.5 Sonnet, October 2024)** in debugging and fixing issues with the Indigenous Art Atlas frontend submission system.

The prompts and outputs from this AI tool are documented below, along with my personal interpretation and modifications.

---

## 1. Admin Login System Fix

### Issue Identified
The admin login form was not submitting properly due to:
- Incorrect database file path in `admin-login.php`
- Wrong SQL column name for user role checking
- CORS errors when opening files directly

### Prompt
```
The admin login page doesn't seem to be submitting even though the database is there. 
What can I do?

[Provided files: compatible_setup.sql, admin-login.html, admin-login.js, admin-login.php]
```

### AI Solution
1. **Database Path Fix** in `admin-login.php`:
   - Changed: `require_once '../cycle3/config/database.php';`
   - To: `require_once '../config/dbconn.php';`

2. **SQL Query Fix**:
   - Changed: `WHERE email = ? AND (user_type = 'admin' OR role = 'admin')`
   - To: `WHERE email = ? AND (user_type = 'admin' OR user_role = 'admin')`

3. **CORS Solution**:
   - Identified that opening HTML files directly (`file:///`) causes CORS errors
   - Provided instructions to run a local web server using `php -S localhost:8000`

### Personal Understanding
I learned that modern browsers block AJAX requests from `file://` URLs to `http://` URLs for security reasons. This is why a local web server is necessary for testing PHP applications. The database column mismatch shows the importance of verifying schema against queries.

**Files Modified**:
- `src/cycle3/api/admin-login.php` (2 lines changed)

---

## 2. Art Submission Form - Multi-Step Navigation

### Issue Identified
The submit art form's multi-step navigation wasn't working:
- Next/Back buttons had no event handlers
- Form data wasn't being stored between steps
- Map coordinates weren't validating properly

### Prompt
```
Submit art forms are not working. When I click on the map and get longitude/latitude 
in the form field but it still says "please select a point on the map"
```

### AI Solution
Created a comprehensive fix for `submit-art.js` that:

1. **Navigation System**:
```javascript
// Fixed button event handlers
function setupButtonHandlers() {
    document.querySelectorAll('.form-actions button').forEach(button => {
        button.removeAttribute('onclick');
        
        if (button.classList.contains('btn-primary')) {
            button.addEventListener('click', handleNextStep);
        } else if (button.classList.contains('btn-secondary')) {
            button.addEventListener('click', handlePrevStep);
        }
    });
}
```

2. **Map Coordinate Validation Fix**:
```javascript
function validateStep2() {
    // Check both formData and input fields for coordinates
    const latInput = document.querySelector('input[name="latitude"]');
    const lngInput = document.querySelector('input[name="longitude"]');
    
    const hasFormDataCoords = formData.latitude && formData.longitude;
    const hasInputCoords = latInput && lngInput && latInput.value && lngInput.value;
    
    if (!hasFormDataCoords && !hasInputCoords) {
        showError('location-error', 'Please select a location on the map');
        return false;
    }
    
    // Update formData if coordinates exist in inputs
    if (hasInputCoords && !hasFormDataCoords) {
        formData.latitude = latInput.value;
        formData.longitude = lngInput.value;
    }
    return true;
}
```

3. **Complete Form Submission Handler**:
```javascript
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData();
    // Collect all form fields including coordinates
    formData.append('latitude', formData.latitude || latInput?.value || '');
    formData.append('longitude', formData.longitude || lngInput?.value || '');
    
    const response = await fetch('../cycle3/api/create-entry.php', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
    });
}
```

### Personal Understanding
The issue was that the validation was only checking the JavaScript `formData` object but not the actual input field values. When users clicked on the map, the coordinates were being set in the input fields but not synced with the formData object. The fix checks both locations and syncs them, ensuring validation passes regardless of how the data was set.

**File Created**: `submit-art-complete.js` (450+ lines)

---

## 3. Database Schema Mapping

### Issue Identified
Form submission was failing because:
- Form was sending numeric IDs but database expected enum values
- Missing field mappings between form and database schema

### Prompt
```
The form was sending art_type_id but database expects art_type (enum)
Form was sending art_period_id but database expects time_period (enum)
```

### AI Solution
Created mapping functions in `create-entry.php`:

```php
// Map form values to database enum values
$art_type_map = [
    '1' => 'rock_art',
    '2' => 'rock_art', 
    '3' => 'contemporary',
    '4' => 'sculpture',
    '5' => 'contemporary',
    '6' => 'contemporary'
];

$period_map = [
    '1' => 'ancient',
    '2' => 'historical',
    '3' => 'contemporary',
    '4' => 'contemporary'
];

// Convert form values to enums
$art_type_enum = $art_type_map[$art_type_form] ?? 'other';
$time_period_enum = $period_map[$art_period_form] ?? 'contemporary';
```

### Personal Understanding
This mapping is necessary because the HTML form uses numeric values in dropdowns for simplicity, but the database uses descriptive enum values for clarity and data integrity. The mapping ensures compatibility between frontend and backend without changing either structure.

**File Modified**: `src/cycle3/api/create-entry.php` (20+ lines added)

---

## 4. Image Upload Functionality

### Issue Identified
The image upload feature needed:
- Drag and drop support
- File type and size validation
- Preview functionality
- Multiple file handling (up to 6 images)

### AI Solution
Implemented complete image handling:

```javascript
function setupImageUpload() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('image-upload');
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    });
    
    // File validation
    function handleFiles(files) {
        for (let file of files) {
            if (uploadedImages.length >= 6) {
                alert('Maximum 6 images allowed');
                break;
            }
            
            if (!file.type.match(/image\/(jpeg|png)/)) {
                alert('Only JPG and PNG allowed');
                continue;
            }
            
            if (file.size > 5 * 1024 * 1024) {
                alert('File too large (max 5MB)');
                continue;
            }
            
            uploadedImages.push(file);
            showImagePreview(file);
        }
    }
}
```

### Personal Understanding
The drag-and-drop functionality enhances user experience by allowing intuitive file uploads. The validation ensures server resources aren't wasted on invalid files. The 6-image limit and 5MB size restriction are reasonable constraints for web applications to prevent abuse while allowing sufficient documentation of artworks.

---

## 5. Form Validation System

### Issue Identified
Each step needed specific validation:
- Step 1: Required fields (title, description, type, period)
- Step 2: Location selection
- Step 3: Optional image upload with warning
- Step 4: Optional artist information
- Step 5: Agreement checkboxes

### AI Solution
Created step-specific validation:

```javascript
function validateCurrentStep() {
    switch(currentStep) {
        case 1:
            // Validate required fields
            if (!title.value.trim()) {
                showError('title-error', 'Title is required');
                return false;
            }
            // ... other validations
            break;
            
        case 2:
            // Check coordinates from both sources
            if (!hasFormDataCoords && !hasInputCoords) {
                showError('location-error', 'Please select a location');
                return false;
            }
            break;
            
        case 3:
            // Optional but warn if no images
            if (uploadedImages.length === 0) {
                if (!confirm('No images uploaded. Continue without images?')) {
                    return false;
                }
            }
            break;
            
        case 5:
            // Check all agreement boxes
            const checks = ['permission-check', 'cultural-check', 'guidelines-check'];
            return checks.every(id => document.getElementById(id)?.checked);
    }
    return true;
}
```

### Personal Understanding
The validation strategy respects the different requirements of each step. Required fields use inline error messages for immediate feedback, while optional fields use confirmation dialogs. The final step requires explicit agreement to submission guidelines, ensuring legal and cultural compliance.

---

## 6. CSS and Chrome Extension Conflicts

### Issue Identified
Chrome extensions were injecting CSS that broke the page layout:
- `chrome-extension://kbfnbcaeplbcioakkpcpgfkobkghlhen/src/css/` errors

### AI Solution
1. Identified that the errors were from Chrome extensions, not the application
2. Provided inline style fixes to override extension interference
3. Focused on making JavaScript work despite CSS issues

### Personal Understanding
Browser extensions can inject styles and scripts into web pages, sometimes causing conflicts. The solution was to ensure the JavaScript functionality worked independently of styling issues, proving that separation of concerns (structure/style/behavior) is important for robust applications.

---

## Summary of AI Assistance

### Problems Solved:
1.  Admin login database connection and authentication
2.  Multi-step form navigation
3.  Map coordinate validation
4.  Database field mapping
5.  Image upload with validation
6.  Form submission to database
7.  CORS and local server setup

### Key Learnings:
1. **CORS Policy**: Browsers block cross-origin requests from file:// URLs
2. **Event Delegation**: Properly attaching event listeners after DOM changes
3. **Data Synchronization**: Keeping form fields and JavaScript objects in sync
4. **Progressive Enhancement**: Making forms work even with CSS failures
5. **Validation Strategy**: Different approaches for required vs optional fields

### Files Created/Modified:
- `submit-art-complete.js` - Complete rewrite with all fixes
- `create-entry-complete.php` - Enhanced with field mapping and validation
- `admin-login-fixed.php` - Fixed database path and SQL query
- Various troubleshooting guides and scripts

### Testing Approach:
All solutions were tested for:
- ✓ Form navigation between all 5 steps
- ✓ Field validation with appropriate error messages
- ✓ Map interaction and coordinate storage
- ✓ Image upload with drag-and-drop
- ✓ Database submission with correct field mapping
- ✓ Admin authentication flow

---

## References

Anthropic. (2024). Claude (3.5 Sonnet, October 2024 version) [Large language model]. https://claude.ai/

Indigenous Art Atlas Project. (2024). COMP9030 Assignment Repository.