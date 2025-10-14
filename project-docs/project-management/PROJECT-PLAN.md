# Indigenous Art Atlas - Complete Project Plan

**Course:** COMP9030
**Project:** Indigenous Art Atlas - Community-driven Indigenous Art Database
**Team Members:** [Add team member names and roles]

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Timeline & Milestones](#timeline--milestones)
3. [Cycle 1: UX Design (Week 5 - 10%)](#cycle-1-ux-design)
4. [Cycle 2: Frontend Prototype (Week 8 - 15%)](#cycle-2-frontend-prototype)
5. [Cycle 3: Full-Stack Prototype (Week 10 - 20%)](#cycle-3-full-stack-prototype)
6. [Cycle 4: Usability Evaluation (Week 13 - 15%)](#cycle-4-usability-evaluation)
7. [Git Workflow & Contribution Guidelines](#git-workflow--contribution-guidelines)
8. [Technology Stack](#technology-stack)
9. [Ethical Considerations](#ethical-considerations)

---

## Project Overview

The Indigenous Art Atlas is a community-driven web application designed to track and share indigenous art across various settings—from ancient cave art to contemporary gallery pieces and public installations.

### Key Objectives:
- Create a culturally sensitive platform for documenting indigenous art
- Implement secure user authentication with role-based access
- Provide interactive mapping for art locations with privacy controls
- Enable community contributions with admin moderation
- Ensure accessibility and responsive design

### User Roles:
1. **Visitors** - Browse art, view map, search/filter (no login required)
2. **Registered Users** - Submit art entries, manage submissions
3. **Artists** - Enhanced profile, link submissions to their work
4. **Administrators** - Content moderation, user management, system oversight

---

## Timeline & Milestones

| Cycle | Deliverable | Due Week | Weight | Status |
|-------|-------------|----------|--------|--------|
| Cycle 1 | UX Design | Week 5 | 10% | 🔴 Not Started |
| Cycle 2 | Frontend Prototype | Week 8 | 15% | 🔴 Not Started |
| Cycle 3 | Full-Stack Prototype | Week 10 | 20% | 🔴 Not Started |
| Cycle 4 | Usability Evaluation | Week 13 | 15% | 🔴 Not Started |

---

## Cycle 1: UX Design

**Due:** Week 5 Tutorial Session
**Location:** `c1-c4/cycle1/`
**Weight:** 10% (5% group + 5% individual quiz)

### Deliverables:

#### 1. User Personas (Minimum 2)
Create detailed personas representing target users:

**Suggested Personas:**
- **Cultural Researcher/Academic** - Studies indigenous art history
- **Indigenous Community Member** - Shares cultural knowledge
- **Art Enthusiast/Tourist** - Explores indigenous art locations
- **Contemporary Indigenous Artist** - Documents own work

**Each persona must include:**
- Name, age, background
- Goals and motivations
- Pain points and frustrations
- Technology comfort level
- Quote that captures their perspective
- Photo/illustration

**Location:** Document in `c1-c4/cycle1/cycle1.md`
**Images:** Save persona images in `c1-c4/cycle1/imgs/`

---

#### 2. User Flows (3 Key Flows)
Visual diagrams showing user journeys:

**Required Flows:**

**Flow 1: Visitor Discovers Art**
- Land on homepage
- View interactive map with art markers
- Click marker to see preview
- Navigate to full art detail page
- View image gallery and information
- Optionally search/filter for more art

**Flow 2: User Submits Art Entry**
- Create account / Login
- Navigate to "Submit Art" page
- Fill multi-step form:
  - Art details (title, description, type, period)
  - Location (map picker + sensitivity flag)
  - Upload images
  - Artist information
- Submit for review
- View pending status in dashboard

**Flow 3: Admin Moderates Content**
- Admin login
- View pending submissions queue
- Review submission details
- Check location sensitivity
- Approve/Reject/Edit entry
- Set public visibility options

**Format:** Create flowcharts using any tool (draw.io, Figma, hand-drawn and scanned)
**Location:** Save images in `c1-c4/cycle1/imgs/user-flow-*.png`
**Documentation:** Describe flows in `c1-c4/cycle1/cycle1.md`

---

#### 3. Wireframes (Key Pages)
Low-fidelity page layouts showing structure and functionality:

**Required Pages:**

**a) Homepage**
- Header with logo, navigation (Browse, About, Login)
- Hero section with tagline
- Interactive Leaflet.js map with art markers
- Featured/Recent art entries grid
- Footer with links

**b) Art Detail Page**
- Image gallery/carousel
- Art information panel (title, description, type, period)
- Artist information (if known)
- Map showing location (respecting sensitivity)
- Submission date and submitter
- "Report Content" button (for logged-in users)

**c) Browse/Search Page**
- Search bar with keyword input
- Filter sidebar (art type, period, location)
- Art entries grid with thumbnails
- Sort options (date, title)

**d) Submit Art Form (Registered Users)**
- Multi-step progress indicator
- Step 1: Art Details
- Step 2: Location (with map picker)
- Step 3: Images Upload
- Step 4: Artist Information
- Review and Submit

**e) User Dashboard**
- "My Submissions" list
- Status indicators (Pending/Approved/Rejected)
- Edit/Delete buttons
- Profile settings

**f) Admin Panel**
- Statistics overview
- Pending submissions queue
- User management table
- Category management

**Tools:** Any wireframing tool (Figma, Balsamiq, Sketch, hand-drawn)
**Location:** Save in `c1-c4/cycle1/imgs/wireframe-*.png`
**Requirements:** Include annotations explaining interactive elements

---

#### 4. Design Rationale Document
Written justification for design decisions:

**Structure:**

**Introduction**
- Project purpose and scope
- Target audience summary

**Design Principles**
- Usability principles applied (Nielsen's heuristics, accessibility)
- Cultural sensitivity approach
- Privacy and security considerations

**Layout & Navigation Decisions**
- Why this site structure?
- Navigation pattern justification
- Visual hierarchy rationale

**Interaction Design**
- Form design choices
- Map interaction approach
- Image handling strategy

**Accessibility & Responsiveness**
- Mobile-first approach
- Screen reader compatibility
- Color contrast and readability

**Ethical Considerations**
- Addressing cultural sensitivity
- Location privacy for sacred sites
- Permission and attribution
- Community engagement approach

**How Personas Informed Design**
- Connect design choices back to user needs
- Reference specific persona pain points addressed

**Location:** Main content in `c1-c4/cycle1/cycle1.md`

---

#### 5. Oral Presentation Preparation
**Duration:** Tutorial session
**Format:** Present report and wireframes (no PowerPoint needed)

**Cover:**
- Target users and their needs
- User flows explanation
- Wireframe walkthrough
- Design justification
- Q&A from teaching staff

---

### Cycle 1 Workflow:

1. **Research Phase** (Week 1-2)
   - Team brainstorming session
   - User research (interviews, surveys if possible)
   - Competitor analysis
   - Document findings in `c1-c4/cycle1/data/`

2. **Design Phase** (Week 2-3)
   - Create personas
   - Design user flows
   - Sketch wireframes
   - Get team feedback

3. **Documentation Phase** (Week 3-4)
   - Write design rationale
   - Compile all materials in `cycle1.md`
   - Store all images in `imgs/`
   - Create AI acknowledgment if used

4. **Review & Practice** (Week 4)
   - Internal team review
   - Practice presentation
   - Prepare for Q&A

5. **Submission** (Week 5)
   - Present in tutorial
   - Generate git log: `git log --pretty=format:'%h,%an,%ar,%s' > c1-c4/cycle1/c1-log.csv`
   - Download ZIP from GitHub
   - Submit to FLO

---

## Cycle 2: Frontend Prototype

**Due:** Week 8 Tutorial Session
**Location:** `src/cycle2/`
**Weight:** 15% (10% group + 5% individual quiz)

### Project Structure:
```
src/cycle2/
├── index.html                 # Homepage
├── browse.html                # Art listings page
├── art-detail.html            # Art detail template
├── search.html                # Search/filter page
├── login.html                 # Login form
├── register.html              # Registration form
├── submit-art.html            # Submit art form
├── dashboard.html             # User dashboard
├── admin/
│   ├── index.html             # Admin dashboard
│   ├── pending.html           # Pending submissions
│   └── users.html             # User management
├── about.html                 # About page
├── guidelines.html            # Usage guidelines
├── ethics.html                # Ethical considerations
├── css/
│   ├── main.css               # Main stylesheet
│   ├── responsive.css         # Media queries
│   └── admin.css              # Admin-specific styles
├── js/
│   ├── main.js                # Core JavaScript
│   ├── map.js                 # Leaflet.js map logic
│   ├── form-validation.js     # Form validation
│   ├── image-gallery.js       # Image carousel
│   └── filter.js              # Search/filter logic
├── images/
│   ├── logo.png
│   ├── placeholder-art.jpg
│   └── [other assets]
├── data/
│   └── mock-data.js           # Dummy data for prototype
└── AI-acknowledgement.md      # AI usage documentation
```

### Deliverables:

#### 1. Semantic HTML5 Structure
**All pages must use proper semantic elements:**
- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Proper heading hierarchy (`<h1>` to `<h6>`)
- Form elements with `<label>` and appropriate attributes
- Alt text for all images
- ARIA labels where necessary

#### 2. Comprehensive CSS Styling
**Requirements:**
- Consistent color scheme (choose brand colors)
- Typography system (heading styles, body text)
- Responsive grid layout (CSS Grid or Flexbox)
- Mobile-first approach
- Media queries for tablet and desktop
- Hover states and transitions
- Form styling

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

#### 3. Leaflet.js Map Integration
**Map Features:**
- Display OpenStreetMap tiles
- Add markers for art locations
- Popup on marker click with art info
- Link to full detail page from popup
- Map on homepage and art detail pages

**Basic Implementation:**
```html
<div id="map" style="height: 400px;"></div>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```

#### 4. JavaScript Interactivity

**a) Form Validation**
- Real-time validation for all forms
- Check required fields
- Email format validation
- Password strength indicator
- Display error messages
- Prevent submission if invalid

**b) Image Gallery/Carousel**
- Multiple image display
- Next/Previous buttons
- Thumbnail navigation
- Lightbox/modal view

**c) Dynamic Content Loading**
- Filter art by type, period, location
- Search by keyword
- Update results without page reload
- Sort options (date, title)

**d) Navigation & UX**
- Mobile hamburger menu
- Smooth scrolling
- Back to top button
- Loading states

#### 5. Mock Data
Create JavaScript object with dummy data:
- Sample art entries (10-15)
- User profiles
- Categories

#### 6. AI Acknowledgement
Document any AI tool usage in `src/cycle2/AI-acknowledgement.md`

---

### Cycle 2 Workflow:

**Week 5-6: Setup & Structure**
1. Create directory structure
2. Build HTML for all pages
3. Set up navigation between pages
4. Each team member takes 2-3 pages

**Week 6-7: Styling & Interactivity**
1. Implement CSS styling
2. Ensure responsive design
3. Add JavaScript functionality
4. Integrate Leaflet.js map

**Week 7: Testing & Polish**
1. Cross-browser testing
2. Mobile device testing
3. Accessibility check
4. Code review and cleanup

**Week 8: Presentation**
1. Practice demo
2. Present in tutorial
3. Generate git log: `git log --pretty=format:'%h,%an,%ar,%s' > src/cycle2/c2-log.csv`
4. Submit to FLO

---

## Cycle 3: Full-Stack Prototype

**Due:** Week 10 Tutorial Session
**Location:** `src/cycle3/`
**Weight:** 20% (10% group + 10% individual quiz)

### Project Structure:
```
src/cycle3/
├── index.php                  # Homepage
├── browse.php                 # Art listings
├── art-detail.php             # Dynamic art details
├── search.php                 # Search with AJAX
├── login.php                  # Login handler
├── register.php               # Registration handler
├── logout.php                 # Logout handler
├── submit-art.php             # Submit art form
├── dashboard.php              # User dashboard
├── profile.php                # User/Artist profile
├── admin/
│   ├── index.php              # Admin dashboard
│   ├── pending.php            # Moderation queue
│   ├── users.php              # User management
│   ├── categories.php         # Category management
│   └── reports.php            # User reports
├── api/
│   ├── search.php             # AJAX search endpoint
│   ├── filter.php             # AJAX filter endpoint
│   └── upload-image.php       # Image upload handler
├── includes/
│   ├── header.php             # Common header
│   ├── footer.php             # Common footer
│   ├── db-connect.php         # Database connection
│   ├── auth-check.php         # Authentication check
│   ├── admin-check.php        # Admin authorization
│   └── functions.php          # Helper functions
├── css/                       # Same as Cycle 2
├── js/                        # Enhanced with AJAX
├── uploads/
│   └── art-images/            # Uploaded images
└── AI-acknowledgement.md
```

### Database Schema:

#### Table: `users`
```sql
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('general', 'artist', 'admin') DEFAULT 'general',
    status ENUM('active', 'suspended') DEFAULT 'active',
    bio TEXT,
    contact_info VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);
```

#### Table: `art_entries`
```sql
CREATE TABLE art_entries (
    art_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    art_type_id INT,
    art_period_id INT,
    condition_notes TEXT,
    artist_name VARCHAR(100),
    artist_id INT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    location_description TEXT,
    location_sensitive BOOLEAN DEFAULT FALSE,
    show_exact_location BOOLEAN DEFAULT TRUE,
    submitter_id INT NOT NULL,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approval_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    rejection_reason TEXT,
    approved_by INT NULL,
    approved_date TIMESTAMP NULL,
    FOREIGN KEY (submitter_id) REFERENCES users(user_id),
    FOREIGN KEY (artist_id) REFERENCES users(user_id),
    FOREIGN KEY (approved_by) REFERENCES users(user_id)
);
```

#### Table: `art_images`
```sql
CREATE TABLE art_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    art_id INT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (art_id) REFERENCES art_entries(art_id) ON DELETE CASCADE
);
```

#### Table: `art_types`
```sql
CREATE TABLE art_types (
    type_id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- Sample data
INSERT INTO art_types (type_name, description) VALUES
('Cave Art', 'Ancient rock paintings and engravings'),
('Mural', 'Large-scale wall paintings'),
('Sculpture', 'Three-dimensional artworks'),
('Installation', 'Site-specific art installations'),
('Gallery Piece', 'Works displayed in galleries');
```

#### Table: `art_periods`
```sql
CREATE TABLE art_periods (
    period_id INT AUTO_INCREMENT PRIMARY KEY,
    period_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- Sample data
INSERT INTO art_periods (period_name, description) VALUES
('Ancient', 'Pre-colonial era'),
('Colonial Era', 'During colonization period'),
('Modern', '20th century'),
('Contemporary', '21st century');
```

#### Table: `reports`
```sql
CREATE TABLE reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    art_id INT NOT NULL,
    reporter_id INT NOT NULL,
    reason TEXT NOT NULL,
    status ENUM('pending', 'reviewed', 'dismissed') DEFAULT 'pending',
    report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_by INT NULL,
    review_date TIMESTAMP NULL,
    FOREIGN KEY (art_id) REFERENCES art_entries(art_id) ON DELETE CASCADE,
    FOREIGN KEY (reporter_id) REFERENCES users(user_id),
    FOREIGN KEY (reviewed_by) REFERENCES users(user_id)
);
```

### Core Features Implementation:

#### 1. User Registration & Authentication

**register.php:**
- Validate all inputs (server-side)
- Check if username/email already exists
- Hash password using `password_hash()`
- Insert into database
- Auto-login after registration

**login.php:**
- Validate credentials
- Use `password_verify()` to check password
- Start session
- Store user_id, username, role in session
- Redirect to dashboard

**Session Management:**
```php
<?php
session_start();
// Check if logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}
?>
```

#### 2. Art Submission Form

**submit-art.php:**
- Multi-step form with progress indicator
- Leaflet.js map picker for location
- Multiple image upload (validate: size, type)
- Location sensitivity checkbox
- Store images in `uploads/art-images/`
- Insert into `art_entries` table with status 'pending'

**Image Upload Security:**
- Check file type (JPEG, PNG only)
- Limit file size (max 5MB)
- Rename files to prevent conflicts
- Validate image dimensions

#### 3. User Dashboard

**dashboard.php:**
- Display user's submissions
- Show approval status with badges
- Edit button → pre-fill form
- Delete button → confirmation modal → soft delete

#### 4. Browse & Search

**browse.php:**
- Display all approved art entries
- Grid layout with thumbnails
- Pagination (20 per page)

**search.php (AJAX):**
```javascript
// Client-side
function searchArt(keyword) {
    fetch('api/search.php?q=' + keyword)
        .then(response => response.json())
        .then(data => updateResults(data));
}
```

```php
// Server-side api/search.php
$keyword = mysqli_real_escape_string($conn, $_GET['q']);
$sql = "SELECT * FROM art_entries
        WHERE approval_status = 'approved'
        AND (title LIKE '%$keyword%' OR description LIKE '%$keyword%')";
// Return JSON
```

#### 5. Admin Panel

**admin/pending.php:**
- Display all pending submissions
- View full details
- Approve button → update status
- Reject button → modal for reason
- Edit button → modify any field

**admin/users.php:**
- List all users
- Change role dropdown
- Activate/Suspend toggle
- Delete user (with confirmation)

**admin/categories.php:**
- CRUD for art_types and art_periods
- Add/Edit/Delete functionality

#### 6. Security Measures

**Input Sanitization:**
```php
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
```

**SQL Injection Prevention:**
- Use prepared statements
- Escape all user inputs

**XSS Prevention:**
- Use `htmlspecialchars()` for output
- Validate all inputs

**CSRF Protection:**
- Use tokens for forms
- Verify on submission

---

### Cycle 3 Workflow:

**Week 8: Database Design**
1. Design complete schema
2. Create database and tables
3. Insert sample/seed data
4. Test relationships

**Week 8-9: Core Features**
1. Implement authentication system
2. Build art submission functionality
3. Create user dashboard
4. Develop browse/search pages

**Week 9: Admin & Advanced Features**
1. Build admin panel
2. Implement moderation system
3. Add AJAX search/filter
4. User management features

**Week 9-10: Testing & Polish**
1. Security audit
2. Cross-browser testing
3. Fix bugs
4. Code cleanup and commenting
5. Export database to `src/sql-exports/`

**Week 10: Presentation**
1. Demo full CRUD flow
2. Show data persistence
3. Explain PHP backend
4. Discuss security measures
5. Generate git log
6. Submit to FLO

---

## Cycle 4: Usability Evaluation

**Due:** Week 13 Tutorial Session
**Location:** `c1-c4/cycle4/`
**Weight:** 15% (10% group + 5% individual quiz)

*Details to be reviewed from cycle4.md in repository*

---

## Git Workflow & Contribution Guidelines

### Branch Strategy:

```
main (protected)
├── cycle1/design-persona-john
├── cycle1/design-userflows
├── cycle1/wireframes-homepage
├── cycle2/feature-homepage
├── cycle2/feature-map-integration
├── cycle3/feature-auth-system
└── cycle3/feature-admin-panel
```

### Workflow Steps:

1. **Update main:**
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create feature branch:**
   ```bash
   git checkout -b cycle2/feature-art-gallery
   ```

3. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "Add art gallery page with responsive grid layout"
   ```

4. **Push branch:**
   ```bash
   git push -u origin cycle2/feature-art-gallery
   ```

5. **Create Pull Request:**
   - Go to GitHub
   - Click "Pull Request"
   - Add descriptive title and summary
   - Request review from team member

6. **Review Process:**
   - Reviewer checks code quality
   - Tests functionality
   - Provides feedback
   - Approves and merges

### Commit Message Guidelines:

**Format:** `[Cycle] Action: Description`

**Examples:**
- `[C1] Add: Cultural researcher persona with pain points`
- `[C2] Implement: Responsive navigation with hamburger menu`
- `[C2] Fix: Map markers not displaying on mobile devices`
- `[C3] Add: User registration with password hashing`
- `[C3] Refactor: Consolidate database connection logic`

### PR Guidelines:

**Title:** Clear and descriptive
**Description Must Include:**
- What was changed
- Why it was changed
- Testing performed
- Screenshots (for UI changes)

**Example:**
```markdown
## Summary
Implements the art submission form with multi-step interface and image upload

## Changes
- Created submit-art.php with 4-step form
- Integrated Leaflet.js map picker for location selection
- Added client-side validation
- Implemented image upload with server-side validation

## Testing
- Tested on Chrome, Firefox, Safari
- Validated responsive behavior on mobile
- Checked file upload limits

## Screenshots
[Attach screenshots]
```

---

## Technology Stack

### Frontend:
- **HTML5** - Semantic markup
- **CSS3** - Styling and responsive design
- **JavaScript (Vanilla)** - Interactivity and AJAX
- **Leaflet.js** - Interactive maps
- **OpenStreetMap** - Map tiles

### Backend:
- **PHP 7.4+** - Server-side logic
- **MySQL 5.7+** - Database

### Development Environment:
- **GitHub Codespaces** or local LAMP/MAMP/XAMPP stack
- **VS Code** - Code editor
- **Git** - Version control

### No External Libraries/Frameworks Allowed:
- ❌ React, Vue, Angular
- ❌ Node.js, Express
- ❌ Bootstrap, Tailwind
- ❌ jQuery
- ❌ Laravel, Symfony

---

## Ethical Considerations

### Cultural Sensitivity:
- Respect for indigenous cultures and traditions
- Proper acknowledgment and attribution
- Community consultation approach
- Educational focus, not exploitative

### Privacy & Security:
- Location sensitivity for sacred sites
- Option to hide exact coordinates
- Admin approval before public display
- Secure handling of user data

### Legal Considerations:
- Copyright and intellectual property
- Permission requirements for contemporary art
- Terms of service and usage guidelines
- Non-commercial nature of platform

### Community Guidelines:
- Respectful content policy
- Prohibition of appropriation
- Verification of artist claims
- Transparent moderation process

---

## Success Criteria

### Cycle 1:
- ✅ 2+ detailed personas
- ✅ 3 complete user flows
- ✅ Wireframes for 6+ key pages
- ✅ Comprehensive design rationale
- ✅ Clear oral presentation

### Cycle 2:
- ✅ All pages implemented in HTML/CSS/JS
- ✅ Fully responsive design
- ✅ Working Leaflet.js map
- ✅ Form validation and interactivity
- ✅ Clean, commented code

### Cycle 3:
- ✅ Complete database implementation
- ✅ Secure authentication system
- ✅ Full CRUD functionality
- ✅ Admin moderation working
- ✅ AJAX search/filter
- ✅ Image upload functional
- ✅ Data persists between sessions

### Cycle 4:
- ✅ Usability testing conducted
- ✅ Results analyzed and documented
- ✅ Recommendations provided

---

## Team Responsibilities

*To be filled in by team:*

| Team Member | Role | Cycle 1 Tasks | Cycle 2 Tasks | Cycle 3 Tasks |
|-------------|------|---------------|---------------|---------------|
| Member 1 | | | | |
| Member 2 | | | | |
| Member 3 | | | | |
| Member 4 | | | | |

---

## Meeting Schedule

*To be updated in `project-docs/meeting-notes/`*

- **Weekly meetings:** [Day/Time]
- **Check-ins:** [Frequency]
- **Pre-submission reviews:** [Schedule]

---

## Resources

### Documentation:
- [Leaflet.js Docs](https://leafletjs.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [PHP Manual](https://www.php.net/manual/en/)
- [MySQL Docs](https://dev.mysql.com/doc/)

### Tools:
- [Figma](https://figma.com) - Wireframing
- [draw.io](https://draw.io) - User flows
- [GitHub](https://github.com) - Version control

---

**Last Updated:** [Date]
**Version:** 1.0
