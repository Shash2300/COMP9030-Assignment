# Cycle 1: UX Design - Indigenous Art Atlas

**Project:** Indigenous Art Atlas - Community-driven Indigenous Art Database
**Team:** [Add team member names]
**Date:** October 2025
**Due:** Week 5 Tutorial Session

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [User Research](#user-research)
3. [User Personas](#user-personas)
4. [User Flows](#user-flows)
5. [Wireframes](#wireframes)
6. [Design Rationale](#design-rationale)
7. [Ethical Considerations](#ethical-considerations)

---

## Project Overview

The Indigenous Art Atlas is a web-based platform designed to serve as a community-driven database for tracking, documenting, and sharing indigenous art across various real-world settings. The platform aims to bridge the gap between ancient cultural heritage and contemporary artistic expression while maintaining the highest standards of cultural sensitivity and respect.

### Purpose
- Create a centralized, accessible database of indigenous art
- Preserve and share cultural knowledge
- Connect communities with their artistic heritage
- Educate the public about indigenous art and culture
- Support contemporary indigenous artists

### Scope
The platform will include:
- Public-facing interface for browsing and discovering art
- Interactive mapping to locate art geographically
- Secure user registration and authentication
- Community submission system with moderation
- Admin panel for content and user management
- Privacy controls for culturally sensitive locations

---

## User Research

### Research Methodology
Our team conducted research to understand the needs, goals, and pain points of potential users of the Indigenous Art Atlas. This included:

**Methods Used:**
- Literature review of existing indigenous art databases and cultural heritage platforms
- Analysis of similar community-driven documentation projects
- Consideration of ethical guidelines for indigenous cultural content
- Review of accessibility and usability best practices

**Key Findings:**
1. **Cultural Sensitivity is Paramount** - Users need assurance that sacred or sensitive locations are protected
2. **Educational Value** - Many users seek to learn about indigenous culture and history
3. **Community Ownership** - Indigenous community members want control over how their culture is represented
4. **Accessibility** - Platform must be intuitive for users with varying technical skills
5. **Trust and Verification** - Need for moderation to ensure accuracy and respect

---

## User Personas

We have identified three primary user personas that represent our target audience:

### Persona 1: Dr. Sarah Mitchell - Cultural Researcher

![Dr. Sarah Mitchell](imgs/persona-researcher.png)

**Demographics:**
- Age: 42
- Location: Adelaide, South Australia
- Occupation: Academic Researcher in Indigenous Studies
- Education: PhD in Anthropology

**Background:**
Dr. Mitchell is a non-indigenous researcher who has dedicated her career to studying and documenting indigenous Australian art and its cultural significance. She frequently travels to regional areas to conduct fieldwork and collaborates with indigenous communities on research projects.

**Goals:**
- Document and catalog indigenous art for academic research
- Access reliable, comprehensive information about art locations and context
- Contribute to preservation of cultural knowledge
- Share findings with academic community and general public
- Respect cultural protocols and obtain proper permissions

**Needs:**
- Detailed information about art pieces (period, type, condition, cultural context)
- Accurate geographic data for research purposes
- Ability to search and filter by multiple criteria
- References and citation-ready information
- Understanding of location sensitivity and access restrictions

**Pain Points:**
- Scattered information across multiple sources
- Difficulty verifying authenticity of information
- Unclear protocols for accessing certain sites
- Lack of consolidated database for research
- Concerns about inadvertently disrespecting cultural protocols

**Technology Comfort:** High - Regularly uses academic databases, GIS tools, and research platforms

**Quote:**
*"I need a reliable resource that helps me conduct respectful research while ensuring I'm not contributing to the exploitation or misrepresentation of indigenous culture."*

**How the Platform Helps:**
- Centralized, searchable database
- Clear indication of location sensitivity
- Detailed metadata for academic use
- Moderation ensures accuracy and respect
- Transparent submission and verification process

---

### Persona 2: Uncle Tommy Williams - Indigenous Community Member & Artist

![Uncle Tommy Williams](imgs/persona-artist.png)

**Demographics:**
- Age: 58
- Location: Arnhem Land, Northern Territory
- Occupation: Traditional Artist and Cultural Educator
- Background: Yolngu Elder

**Background:**
Uncle Tommy is a respected Yolngu elder who creates traditional bark paintings and teaches younger generations about their cultural heritage. He is passionate about sharing appropriate cultural knowledge with the wider community while protecting sacred and restricted information.

**Goals:**
- Share knowledge of traditional and contemporary indigenous art
- Document his own artwork and connect it to cultural stories (where appropriate)
- Educate non-indigenous Australians about indigenous culture
- Protect sacred sites and sensitive cultural information
- Support other indigenous artists by showcasing their work
- Ensure accurate representation of cultural context

**Needs:**
- Simple, intuitive interface (not tech-heavy)
- Clear control over what information is shared publicly
- Ability to mark locations as sensitive or restricted
- Option to provide cultural context and stories
- Platform that respects cultural protocols
- Way to connect with other artists and community members

**Pain Points:**
- Concerns about cultural appropriation and misuse of sacred imagery
- Past experiences with platforms that didn't respect cultural boundaries
- Worry about exact locations being shared for sensitive sites
- Complex technology can be a barrier
- Lack of indigenous voices in how platforms are designed
- Difficulty getting proper recognition and attribution

**Technology Comfort:** Medium - Uses smartphone and social media but prefers simple, clear interfaces

**Quote:**
*"This is our story, our culture. We want to share it, but it needs to be done right, with respect. Some things are meant for everyone, some things are not."*

**How the Platform Helps:**
- Location privacy controls built-in
- Simple submission process
- Cultural sensitivity is core design principle
- Moderation ensures respect
- Artist profiles for recognition
- Clear guidelines about appropriate content

---

### Persona 3: Emma Chen - Art Enthusiast & Tourist

![Emma Chen](imgs/persona-tourist.png)

**Demographics:**
- Age: 28
- Location: Melbourne, Victoria
- Occupation: Graphic Designer
- Background: Second-generation Australian, Chinese heritage

**Background:**
Emma is an art lover and designer who enjoys traveling within Australia to discover indigenous art. She follows contemporary indigenous artists on social media and has visited several galleries and public art installations. She wants to learn more about indigenous culture respectfully and support indigenous artists.

**Goals:**
- Discover indigenous art locations to visit during travels
- Learn about the cultural significance and stories behind art
- Support indigenous artists by visiting galleries and purchasing work
- Share discoveries on social media (respectfully)
- Expand understanding of indigenous culture and history
- Plan art-focused travel itineraries

**Needs:**
- Visual, engaging interface with high-quality images
- Interactive map showing art locations
- Clear directions and access information
- Information about visiting hours, entry requirements
- Mobile-friendly design for on-the-go access
- Ability to save favorites for trip planning
- Context about cultural significance

**Pain Points:**
- Uncertainty about which locations are appropriate to visit
- Worry about inadvertently being disrespectful
- Difficulty finding comprehensive information
- Scattered resources across multiple websites
- Unknown if locations are publicly accessible
- Lack of context makes it hard to fully appreciate art

**Technology Comfort:** Very High - Digital native, comfortable with apps, maps, and social platforms

**Quote:**
*"I want to experience and appreciate indigenous art, but I don't want to be an ignorant tourist. I need guidance on how to do this respectfully."*

**How the Platform Helps:**
- Beautiful, visual browsing experience
- Interactive map with clear markers
- Access information and visitor guidelines
- Educational content about cultural significance
- Clear indication of what's appropriate to visit
- Mobile-responsive design
- Links to support indigenous artists

---

## User Flows

### User Flow 1: Visitor Discovers Indigenous Art

**Scenario:** Emma (tourist) wants to find indigenous art to visit during her weekend trip to regional NSW.

**Flow Diagram:** See `imgs/userflow-1-discover-art.png`

**Steps:**

1. **Landing on Homepage**
   - Emma arrives at Indigenous Art Atlas homepage
   - Sees hero image with tagline and mission statement
   - Views featured art entries and interactive map preview

2. **Exploring Interactive Map**
   - Clicks on map to expand full view
   - Sees markers for various art locations across Australia
   - Zooms into NSW region where she's planning to travel
   - Notices different marker colors/icons indicating art types

3. **Viewing Art Location**
   - Clicks on a marker near her destination
   - Popup appears with art thumbnail, title, and brief description
   - Sees indicator if location is publicly accessible
   - Clicks "View Details" link

4. **Art Detail Page**
   - Views full page with multiple images in gallery
   - Reads detailed description of the art piece
   - Learns about cultural significance and historical context
   - Checks location information and visiting guidelines
   - Notes that exact location is shown (not marked sensitive)
   - Sees submission date and contributor name

5. **Exploring Related Art**
   - Scrolls to "Similar Art" section
   - Browses by same art type or nearby locations
   - Adds locations to mental note for trip planning

6. **Optional: Search/Browse More**
   - Returns to browse page to filter by region
   - Uses search to find "rock art" or "murals"
   - Sorts results by proximity to planned route

**Success Criteria:**
- User can easily find art relevant to their location
- Information is clear and comprehensive
- Cultural context enhances appreciation
- User understands visit protocols
- Journey feels intuitive and engaging

---

### User Flow 2: Registered User Submits New Art Entry

**Scenario:** Uncle Tommy wants to document a contemporary mural created by his community that depicts traditional stories.

**Flow Diagram:** See `imgs/userflow-2-submit-art.png`

**Steps:**

1. **Authentication**
   - Uncle Tommy logs into his existing account
   - System recognizes him as registered user with 'Artist' role
   - Lands on his dashboard

2. **Initiating Submission**
   - Clicks "Submit New Art" button in navigation
   - Arrives at multi-step submission form
   - Sees progress indicator (Step 1 of 4)

3. **Step 1: Art Details**
   - Enters art title: "Gumatj Clan Creation Stories Mural"
   - Writes detailed description of the mural and its meaning
   - Selects art type: "Mural"
   - Selects art period: "Contemporary"
   - Adds condition notes: "Excellent - recently completed (2024)"
   - Clicks "Next"

4. **Step 2: Location Information**
   - Sees interactive map (Leaflet.js)
   - Clicks/searches to find community center location
   - Drops pin on map to set coordinates
   - Adds location description: "Community Center, Yirrkala"
   - **IMPORTANT:** Checks "This location is publicly accessible"
   - Leaves "Location is culturally sensitive" UNCHECKED (public viewing is encouraged)
   - Clicks "Next"

5. **Step 3: Images Upload**
   - Clicks "Choose Images" button
   - Selects 4 photos from computer (overall mural + detail shots)
   - Previews thumbnails to confirm upload
   - Marks primary image for thumbnail
   - Clicks "Next"

6. **Step 4: Artist Information**
   - Selects "I am the artist" option
   - Form auto-fills with his artist profile
   - Adds additional artists: "Created in collaboration with Youth Art Group"
   - Clicks "Next"

7. **Review and Submit**
   - Reviews all information on summary page
   - Checks accuracy of details
   - Reads submission agreement about cultural sensitivity
   - Clicks "Submit for Review"

8. **Confirmation**
   - Sees success message: "Thank you! Your submission is under review"
   - Receives explanation that admin will review before publishing
   - Redirected to dashboard where submission shows "Pending" status

9. **Awaiting Approval**
   - Submission appears in "My Submissions" list
   - Status badge shows "Pending Review"
   - Can edit or delete submission while pending

**Success Criteria:**
- Form is intuitive despite multiple steps
- Progress is always clear
- Location sensitivity controls are prominent
- Upload process is smooth
- User understands approval process
- Can track submission status

---

### User Flow 3: Admin Reviews and Approves Submission

**Scenario:** Platform administrator reviews Uncle Tommy's mural submission to ensure it meets guidelines before making it public.

**Flow Diagram:** See `imgs/userflow-3-admin-moderation.png`

**Steps:**

1. **Admin Login**
   - Admin logs in using separate admin credentials
   - Lands on admin dashboard

2. **Dashboard Overview**
   - Sees statistics: "3 Pending Submissions, 142 Total Entries, 89 Active Users"
   - Notices alert badge on "Pending Submissions" menu item
   - Clicks to view moderation queue

3. **Pending Submissions Queue**
   - Sees list of submissions awaiting review
   - Table shows: thumbnail, title, submitter, submission date, art type
   - Filters queue to show newest first
   - Clicks on Uncle Tommy's mural submission

4. **Review Submission Details**
   - Views complete submission with all information
   - Checks all 4 uploaded images (quality, appropriateness)
   - Reads description for accuracy and cultural sensitivity
   - Reviews location data on map
   - Checks location sensitivity flags
   - Notes submitter is verified 'Artist' role user

5. **Verification Steps**
   - Confirms images are high quality and appropriate
   - Checks description for respectful language and accuracy
   - Verifies location coordinates match description
   - Confirms location accessibility setting is appropriate
   - Ensures no sacred/restricted imagery is present

6. **Decision: Approve**
   - All criteria met - submission is appropriate and valuable
   - Clicks "Approve" button
   - System displays "Show exact location?" option
   - Admin confirms: "Yes, show exact location" (not sensitive)
   - Adds internal note: "Excellent documentation of contemporary community art"

7. **Approval Confirmation**
   - Submission status changes to "Approved"
   - Entry is now live and visible on public site
   - Uncle Tommy receives notification: "Your submission has been approved!"
   - Admin dashboard updates: "2 Pending Submissions" remaining

8. **Post-Approval**
   - Entry appears on map with marker
   - Shows in public browse/search results
   - Uncle Tommy sees "Approved" badge in his dashboard
   - Entry links to his artist profile

**Alternative Flow: Rejection**
- If submission violates guidelines or contains sensitive content
- Admin clicks "Reject" button
- Required to provide reason: "Please remove images showing restricted ceremony details"
- Uncle Tommy receives notification with explanation
- Can edit and resubmit

**Success Criteria:**
- Admin can efficiently review submissions
- All information is presented clearly
- Decision options are clear (approve/reject/edit)
- Location controls are prominent in decision process
- Submitter receives timely feedback
- Approved content goes live immediately

---

## Wireframes

*Note: Wireframes are low-fidelity mockups focusing on structure and functionality, not visual design.*

### Wireframe 1: Homepage

**File:** `imgs/wireframe-homepage.png`

**Key Elements:**

**Header:**
- Logo: "Indigenous Art Atlas" (left)
- Navigation: Home | Browse | About | Guidelines | Login/Register (right)
- Mobile: Hamburger menu

**Hero Section:**
- Large background image (indigenous art)
- Headline: "Discover and Share Indigenous Art Across Australia"
- Subheading: Brief mission statement
- CTA Button: "Explore the Map"

**Interactive Map Section:**
- Full-width embedded Leaflet.js map
- Markers showing approved art locations
- Zoom controls
- Legend explaining marker types
- "View Full Map" button

**Featured Art Section:**
- Heading: "Recently Added"
- Grid layout: 3-4 art entry cards
- Each card shows:
  - Thumbnail image
  - Art title
  - Art type badge
  - Location (general)
  - "View Details" link

**About Section (Brief):**
- 2-column layout
- Left: Text about mission and values
- Right: Image or statistics
- Link to full About page

**Footer:**
- Quick links (Guidelines, Contact, Privacy)
- Copyright notice
- Acknowledgment of Country statement

**Annotations:**
- Map must load quickly - lazy load if needed
- Cards should have hover effects
- Responsive grid collapses to single column on mobile
- Header sticks on scroll

---

### Wireframe 2: Art Detail Page

**File:** `imgs/wireframe-art-detail.png`

**Layout:**

**Header:** (Same as homepage)

**Main Content: 2-Column Layout**

**Left Column (60% width):**

**Image Gallery:**
- Large primary image at top
- Thumbnail strip below for multiple images
- Lightbox functionality on click
- Previous/Next arrows
- Image counter: "2 / 5"

**Description Section:**
- Heading: Art Title
- Art type and period badges
- Full text description
- "Read More" expansion if very long

**Right Column (40% width):**

**Information Panel:**
- Location Map (smaller, static Leaflet view)
- Location description text
- If publicly accessible: "Visitor Guidelines" expandable section
- If sensitive: "Location protected for cultural reasons"

**Metadata Box:**
- Art Type: [Type]
- Period: [Period]
- Condition: [Notes]
- Submitted: [Date]
- Submitted by: [Username] (clickable to profile)

**Artist Information (if applicable):**
- Artist name
- Artist bio snippet
- "View Artist Profile" link

**Action Buttons:**
- [For logged-in users] "Report Content" button

**Related Art Section:**
- Heading: "Similar Art Nearby"
- Horizontal card scroll
- 4-5 related entries

**Footer:** (Same as homepage)

**Annotations:**
- Image gallery must work on mobile (swipe)
- Map shows exact location OR general area depending on sensitivity
- Related art uses same algorithm as browse page
- Report button opens modal with form

---

### Wireframe 3: Submit Art Form (Multi-Step)

**File:** `imgs/wireframe-submit-form.png`

**Header:** (Same as homepage, but "Submit New Art" is highlighted)

**Progress Indicator:**
- Horizontal stepper: ● ○ ○ ○
- Labels: Art Details | Location | Images | Artist Info
- Shows current step highlighted

**Step 1: Art Details**

Form Fields:
```
[Text Input] Art Title *
Required. Max 200 characters.

[Textarea] Description *
Required. Provide detailed description and cultural context.

[Dropdown] Art Type *
- Select type -
- Cave Art
- Rock Art
- Mural
- Sculpture
- Installation
- Gallery Piece
- Other

[Dropdown] Art Period *
- Select period -
- Ancient (Pre-colonial)
- Colonial Era
- Modern (20th Century)
- Contemporary (21st Century)

[Textarea] Condition/Quality Notes
Describe current condition, any damage, preservation efforts.

[Button: Secondary] Cancel   [Button: Primary] Next →
```

**Annotations:**
- Real-time character count on title
- Required fields marked with *
- Validation on click Next
- Autosave draft every 2 minutes
- Mobile: Full-width form fields

---

**Step 2: Location**

Form Layout:
```
[Interactive Map - Leaflet.js]
Click on the map to set the art location, or search for an address.
[Search Box] Search for location...

Latitude: [Auto-filled]  Longitude: [Auto-filled]

[Text Input] Location Description
e.g., "Inside Gallery X, near old bridge"

[Checkbox] ⬜ This location is publicly accessible
[Checkbox] ⬜ This location is culturally sensitive / restricted

[Info Box]
⚠️ If you mark this as sensitive, the exact coordinates may be
hidden or shown as a general area only. Admin will review.

[Button: Secondary] ← Back   [Button: Primary] Next →
```

**Annotations:**
- Map defaults to user's approximate location (Australia-wide if not available)
- Draggable pin
- Coordinates update in real-time
- Sensitivity warning is prominent
- Mobile: Map fills width, touch-friendly

---

**Step 3: Images Upload**

Form Layout:
```
[Upload Area - Drag and Drop]
Drag images here or click to browse
Accepted: JPG, PNG | Max 5MB per image | Up to 6 images

[Upload Button] Choose Images

[Preview Section]
[Thumbnail 1] [×]  ⭐ Primary
[Thumbnail 2] [×]  [Set as Primary]
[Thumbnail 3] [×]  [Set as Primary]

[Info Box]
📷 Upload clear, high-resolution images. First image will be used
as thumbnail unless you select a different primary image.

[Button: Secondary] ← Back   [Button: Primary] Next →
```

**Annotations:**
- Drag-and-drop for desktop
- Show upload progress bars
- Allow reordering images
- Delete button (×) on each thumbnail
- Star indicates primary image
- Mobile: Opens camera/photo library

---

**Step 4: Artist Information**

Form Layout:
```
[Radio Buttons]
⚪ Artist is Unknown
⚪ I am the Artist
⚪ Attributing to Another Artist

[Conditional: If "I am the Artist"]
[Pre-filled from profile]
Artist Name: Uncle Tommy Williams
This will link to your artist profile.

[Text Input] Additional Artists/Collaborators
e.g., "Created with Youth Art Group"

[Conditional: If "Attributing to Another Artist"]
[Text Input] Artist Name
[Text Input] Artist Information (if known)

[Checkbox] ⬜ I have permission to submit this information
[Checkbox] ⬜ I confirm this submission respects cultural protocols

[Button: Secondary] ← Back   [Button: Primary] Review →
```

---

**Step 5: Review & Submit**

Layout:
```
[Heading] Review Your Submission

[Summary Card - All Info]
Art Title: [Displayed]
Description: [Truncated with "read more"]
Type: [Badge]  Period: [Badge]
Location: [Mini map + description]
Sensitivity: [Yes/No]
Images: [Thumbnail strip]
Artist: [Name]

[Edit Links] next to each section

[Final Confirmation]
[Checkbox] ⬜ I agree to the Submission Guidelines and Terms

[Button: Secondary] ← Back   [Button: Primary] Submit for Review
```

**On Submit:**
```
[Success Modal]
✓ Submission Received!

Thank you! Your submission is now under review by our moderators.
You'll receive a notification when it's been approved.

[Button] View My Submissions   [Button] Submit Another
```

**Annotations:**
- Review page shows all data in read-only format
- Quick edit links jump back to relevant step
- Clear indication submission goes to moderation
- Success modal has clear next actions

---

### Wireframe 4: User Dashboard

**File:** `imgs/wireframe-dashboard.png`

**Header:** (Same as homepage, "Dashboard" highlighted)

**Page Layout:**

**Sidebar Navigation (Left 20%):**
```
[User Avatar]
Uncle Tommy Williams
Artist

Menu:
→ My Submissions
  My Profile
  Account Settings
  Logout
```

**Main Content (Right 80%):**

**Dashboard Header:**
```
My Submissions

[Button: Primary] + Submit New Art
```

**Submissions List:**

**Filters/Tabs:**
```
[Tab: Active] All (8)  |  Pending (1)  |  Approved (6)  |  Rejected (1)
```

**Table/Card View:**
```
[Submission Card 1]
┌─────────────────────────────────────────┐
│ [Thumbnail]  Gumatj Clan Creation Mural │
│              Submitted: Oct 12, 2025    │
│              Status: [PENDING REVIEW]   │
│                                         │
│              [Button] Edit  [Button] Delete │
└─────────────────────────────────────────┘

[Submission Card 2]
┌─────────────────────────────────────────┐
│ [Thumbnail]  Traditional Bark Painting  │
│              Submitted: Sept 28, 2025   │
│              Status: [APPROVED] ✓       │
│              Views: 342 | Added to map  │
│              [Button] View Public Page  │
└─────────────────────────────────────────┘

[Submission Card 3]
┌─────────────────────────────────────────┐
│ [Thumbnail]  Rock Art Site              │
│              Submitted: Sept 15, 2025   │
│              Status: [REJECTED]         │
│              Reason: Location marked... │
│              [Button] Edit & Resubmit   │
└─────────────────────────────────────────┘
```

**Empty State (if no submissions):**
```
No submissions yet

Start sharing indigenous art with the community!

[Button] Submit Your First Entry
```

**Annotations:**
- Status badges color-coded (Yellow=Pending, Green=Approved, Red=Rejected)
- Rejected items show truncated reason with "read more"
- Approved items show engagement metrics
- Edit maintains draft functionality
- Mobile: Sidebar becomes dropdown menu

---

### Wireframe 5: Browse/Search Page

**File:** `imgs/wireframe-browse.png`

**Header:** (Same as homepage, "Browse" highlighted)

**Page Layout:**

**Filter Sidebar (Left 25%):**
```
[Search Box]
🔍 Search by title, artist, keywords...

Filters:

Art Type
☐ Cave Art (23)
☐ Rock Art (45)
☐ Mural (18)
☐ Sculpture (12)
☐ Installation (9)
☐ Gallery Piece (35)

Art Period
☐ Ancient (67)
☐ Colonial Era (15)
☐ Modern (28)
☐ Contemporary (32)

Location
☐ NSW (45)
☐ VIC (32)
☐ QLD (28)
☐ SA (18)
☐ WA (19)
☐ NT (41)
☐ TAS (9)

[Button] Clear Filters
```

**Main Content (Right 75%):**

**Results Header:**
```
Showing 142 Art Entries

Sort by: [Dropdown: Date Added ▼]
- Date Added (Newest)
- Date Added (Oldest)
- Title (A-Z)
- Location (Nearest)

[Icon: Grid View] [Icon: List View] [Icon: Map View]
```

**Results Grid:**
```
[Card 1]          [Card 2]          [Card 3]
┌───────────┐    ┌───────────┐    ┌───────────┐
│   Image   │    │   Image   │    │   Image   │
├───────────┤    ├───────────┤    ├───────────┤
│Title      │    │Title      │    │Title      │
│[Type]     │    │[Type]     │    │[Type]     │
│Location   │    │Location   │    │Location   │
└───────────┘    └───────────┘    └───────────┘

[Card 4]          [Card 5]          [Card 6]
...
```

**Pagination:**
```
← Previous   1  [2]  3  4  5  ...  24   Next →
```

**Annotations:**
- Filters apply instantly (AJAX, no page reload)
- Search has debounce (waits for typing to stop)
- Grid shows 12 cards per page (4 columns × 3 rows)
- Cards have hover effect (slight zoom + shadow)
- Location sorting requires user location permission
- Mobile: Sidebar becomes collapsible drawer, 1-2 column grid

---

### Wireframe 6: Admin Panel - Pending Submissions

**File:** `imgs/wireframe-admin-panel.png`

**Admin Header:**
```
Indigenous Art Atlas - Admin Panel

Navigation:
Dashboard | Pending Submissions (3) | All Entries | Users | Categories | Reports | Logout
```

**Main Content:**

**Page Header:**
```
Pending Submissions

3 submissions awaiting review
```

**Submissions Queue Table:**
```
┌─────────┬─────────────────────┬────────────────┬─────────┬────────────┬─────────┐
│ Thumb   │ Title               │ Submitter      │ Type    │ Submitted  │ Actions │
├─────────┼─────────────────────┼────────────────┼─────────┼────────────┼─────────┤
│ [IMG]   │ Gumatj Clan Mural   │ Tommy Williams │ Mural   │ Oct 12     │ [Review]│
│         │                     │ (Artist)       │         │            │         │
├─────────┼─────────────────────┼────────────────┼─────────┼────────────┼─────────┤
│ [IMG]   │ Ancient Cave Paint  │ Sarah Mitchell │ Cave Art│ Oct 11     │ [Review]│
│         │                     │ (General)      │         │            │         │
├─────────┼─────────────────────┼────────────────┼─────────┼────────────┼─────────┤
│ [IMG]   │ Sydney Street Art   │ Emma Chen      │ Install │ Oct 10     │ [Review]│
│         │                     │ (General)      │         │            │         │
└─────────┴─────────────────────┴────────────────┴─────────┴────────────┴─────────┘
```

**Review Modal (when clicking "Review"):**
```
┌─────────────────────────────────────────────────────────────┐
│ Review Submission                                      [×]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ [Image Gallery - full size]                                │
│                                                             │
│ Title: Gumatj Clan Creation Stories Mural                  │
│ Type: Mural | Period: Contemporary                         │
│                                                             │
│ Description:                                                │
│ [Full text displayed...]                                   │
│                                                             │
│ Location:                                                   │
│ [Map view]                                                  │
│ Yirrkala Community Center                                   │
│ Coordinates: -12.2545, 136.8895                            │
│                                                             │
│ ☑ Publicly Accessible                                      │
│ ☐ Culturally Sensitive                                     │
│                                                             │
│ Artist: Tommy Williams (Verified Artist)                    │
│                                                             │
│ ───────────────────────────────────────                    │
│                                                             │
│ Admin Decision:                                             │
│                                                             │
│ Location Display:                                           │
│ ⚪ Show exact location                                      │
│ ⚪ Show general area only                                   │
│ ⚪ Hide location entirely                                   │
│                                                             │
│ [Textarea] Internal Notes (optional)                        │
│                                                             │
│ [Button: Danger] Reject  [Button: Success] Approve         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Reject Modal (if Reject clicked):**
```
┌────────────────────────────────────┐
│ Reject Submission             [×] │
├────────────────────────────────────┤
│                                    │
│ [Textarea] Reason for Rejection *  │
│ Required. This will be sent to     │
│ the submitter.                     │
│                                    │
│ [Button] Cancel  [Button] Confirm  │
│                                    │
└────────────────────────────────────┘
```

**Annotations:**
- Queue sorted by submission date (oldest first)
- Quick view shows thumbnail and key info
- Review modal shows ALL submission details
- Location controls are prominent
- Approval/rejection requires confirmation
- Rejection requires reason
- Approved items go live immediately
- Submitter receives automatic notification

---

## Design Rationale

### Introduction

The Indigenous Art Atlas design prioritizes cultural sensitivity, accessibility, and community empowerment. Every design decision has been carefully considered to balance the goals of education and documentation with the critical need to respect indigenous cultural protocols and sacred sites.

---

### Design Principles

#### 1. Cultural Sensitivity as a Core Value

**Rationale:**
Indigenous art and cultural sites are not merely aesthetic objects—they carry deep cultural, spiritual, and historical significance. Many sites are sacred or restricted, and inappropriate sharing can cause real harm to communities.

**Design Implementation:**
- **Location Privacy Controls:** Built into the core submission process, not an afterthought
- **Mandatory Sensitivity Flags:** Users must actively consider and declare location sensitivity
- **Admin Override Capability:** Moderators can adjust privacy settings regardless of submitter's choice
- **Tiered Location Display:** Three levels (exact, general area, hidden) allow nuanced protection
- **Cultural Context Required:** Description fields encourage sharing appropriate stories and significance

**How This Addresses User Needs:**
- Uncle Tommy (Artist): Feels safe sharing appropriate knowledge while protecting sacred information
- Dr. Mitchell (Researcher): Understands access protocols and respects boundaries
- Emma (Tourist): Learns which sites are appropriate to visit

---

#### 2. User-Centric Design for Diverse Skill Levels

**Rationale:**
Our personas span a wide range of technical comfort—from Emma (very high) to Uncle Tommy (medium). The platform must be intuitive for the least technically experienced user while not feeling simplistic to advanced users.

**Design Implementation:**
- **Progressive Disclosure:** Complex features hidden until needed
- **Multi-Step Forms:** Break complex submission into digestible chunks with clear progress
- **Persistent Navigation:** Always clear where you are and how to get elsewhere
- **Clear Visual Hierarchy:** Important actions are prominent; secondary actions are accessible but not distracting
- **Helpful Micro-Copy:** Instructions and explanations at point of need
- **Forgiving Interaction:** Autosave drafts, confirmation modals for destructive actions

**How This Addresses User Needs:**
- Uncle Tommy: Can successfully submit art without tech frustration
- Dr. Mitchell: Can quickly navigate to advanced search/filter features
- Emma: Enjoys smooth, modern interface with visual appeal

---

#### 3. Trust Through Transparency

**Rationale:**
For a community-driven platform to succeed, users must trust both the content and the process. This requires transparency in moderation, sourcing, and decision-making.

**Design Implementation:**
- **Clear Submission Status:** Users always know where their submission stands
- **Visible Provenance:** Every entry shows who submitted it and when
- **Moderation Explained:** Users understand that content is reviewed for quality and sensitivity
- **Rejection Feedback:** When content is rejected, submitters receive clear, respectful explanation
- **Public Guidelines:** Expectations and protocols are clearly documented and accessible
- **Acknowledgment of Country:** Footer acknowledges traditional owners and platform's respect

**How This Addresses User Needs:**
- All Personas: Trust that platform is managed responsibly and respectfully
- Dr. Mitchell: Can cite sources with confidence in their verification
- Uncle Tommy: Knows submissions won't be misused or disrespected

---

### Layout and Navigation Decisions

#### Homepage Layout

**Decision:** Hero section + interactive map + featured content structure

**Rationale:**
- **Hero:** Immediately communicates purpose and mission—visitors understand what the platform is within seconds
- **Map:** The map is the star feature and primary discovery tool—it needs to be prominent on the homepage
- **Featured Content:** Provides alternative discovery path for users who prefer browsing over map interaction
- **Clear CTAs:** "Explore the Map" and "Submit New Art" guide users toward primary actions

**Alternatives Considered:**
- Map-only homepage: Too overwhelming, lacks context for first-time visitors
- Gallery-first layout: Buries the unique mapping feature that differentiates this platform

---

#### Navigation Pattern

**Decision:** Persistent top navigation bar with clear, limited options

**Rationale:**
- **Persistent Access:** Users can navigate from anywhere without scrolling
- **Limited Options:** Prevents decision paralysis—only essential sections in main nav
- **Clear Authentication:** Login/Register always visible for ease of access
- **Mobile-Friendly:** Hamburger menu is universally understood pattern
- **Visual Hierarchy:** Current page highlighted

**Navigation Structure:**
```
Public: Home | Browse | About | Guidelines | Login/Register
Authenticated: [Same] + Dashboard + Submit
Admin: Separate admin panel with full admin navigation
```

---

#### Form Design: Multi-Step Submission

**Decision:** Break submission into 4 steps rather than one long form

**Rationale:**
- **Cognitive Load Reduction:** Each step focuses on one topic, reducing overwhelm
- **Progress Indication:** Users always know how far they've come and how much remains
- **Validation Per Step:** Errors caught early before user invests time in later steps
- **Mobile-Friendly:** Shorter screens work better on mobile devices
- **Autosave Drafts:** Users can return without losing progress

**User Testing Insight:**
- Long forms have high abandonment rates, especially on mobile
- Users appreciate clear progress indicators in multi-step processes
- Step 2 (Location) is the most complex—isolating it allows focus on map interaction

---

### Interaction Design

#### Map Interaction

**Decision:** Leaflet.js with OpenStreetMap for interactive mapping

**Rationale:**
- **Lightweight:** Leaflet is fast-loading, doesn't require Google API key
- **Free and Open:** No usage limits or cost barriers
- **Customizable Markers:** Can create different marker styles for different art types
- **Mobile Touch Support:** Works well on touch devices
- **Privacy-Friendly:** OpenStreetMap doesn't track users like Google Maps

**Interaction Pattern:**
- Click marker → Popup with preview → Link to full detail page
- Zoom controls for exploration
- Clustering for areas with many markers (prevents visual clutter)

**How This Addresses User Needs:**
- Emma: Visual, intuitive way to discover art while trip planning
- Dr. Mitchell: Geographic search aligns with research methodology
- Uncle Tommy: Simple pin-dropping for location selection

---

#### Image Gallery/Carousel

**Decision:** Primary large image with thumbnail strip navigation

**Rationale:**
- **Visual Focus:** Art is inherently visual—images must be prominent and high-quality
- **Multiple Perspectives:** Many art pieces benefit from multiple angles/details
- **Lightbox Expansion:** Users can examine details closely
- **Thumbnail Navigation:** Clear indication of how many images and easy switching
- **Mobile Swipe:** Touch-friendly gesture navigation

**Accessibility Consideration:**
- Alt text required for all images
- Keyboard navigation support (arrow keys)
- Screen reader announces image counter

---

#### Search and Filter

**Decision:** AJAX-based instant filtering without page reloads

**Rationale:**
- **Immediate Feedback:** Users see results update as they select filters
- **Exploration-Friendly:** Easy to try different filter combinations
- **Performance:** Only fetches data needed rather than full page reload
- **Modern Expectation:** Users expect instant, responsive filtering from platforms like Airbnb, Spotify

**Filter Categories Chosen:**
- **Art Type:** Aligns with user's specific interests (Emma wants murals, Dr. Mitchell researches cave art)
- **Art Period:** Historical context is key to understanding significance
- **Location:** Geographic search for travelers and researchers

---

### Accessibility and Responsiveness

#### Mobile-First Approach

**Decision:** Design for mobile screens first, enhance for larger screens

**Rationale:**
- **Usage Patterns:** Emma uses platform on-the-go while traveling
- **Inclusivity:** Many indigenous communities may have limited access to desktop computers
- **Performance:** Mobile-first forces efficiency and fast loading
- **Future-Proof:** Mobile usage continues to grow across all demographics

**Responsive Breakpoints:**
- Mobile: < 768px (Single column, touch-friendly, simplified navigation)
- Tablet: 768-1024px (Two columns where appropriate, hybrid touch/cursor)
- Desktop: > 1024px (Full layout, multiple columns, enhanced features)

**Mobile Optimizations:**
- Touch targets minimum 44×44px
- Hamburger navigation menu
- Collapsed filters (drawer/modal)
- Optimized image sizes
- Swipe gestures for galleries

---

#### Accessibility Features

**Decision:** WCAG 2.1 AA compliance as minimum standard

**Rationale:**
- **Legal Requirement:** Government and educational sites must be accessible
- **Ethical Imperative:** Exclude no one from accessing cultural knowledge
- **Broader Reach:** Many indigenous community members may have accessibility needs
- **SEO Benefits:** Accessible markup improves search engine indexing

**Implementation:**
- **Semantic HTML:** Proper heading hierarchy, landmark regions
- **Color Contrast:** Text meets 4.5:1 contrast ratio minimum
- **Keyboard Navigation:** All interactive elements accessible without mouse
- **Alt Text:** Descriptive alt text for all images (required field in submission)
- **Focus Indicators:** Visible focus states for keyboard users
- **Screen Reader Support:** ARIA labels where needed, but semantic HTML prioritized
- **Captions/Transcripts:** For any video/audio content (future feature)

---

### Ethical Considerations

#### Acknowledgment of Country

**Decision:** Include acknowledgment in footer and about page

**Rationale:**
- **Respect:** Recognizes traditional ownership of the land
- **Transparency:** Platform acknowledges its role as curator of indigenous cultural content
- **Education:** Many non-indigenous users learn importance of acknowledgments

**Example Text:**
```
We acknowledge the Traditional Owners of Country throughout Australia and
recognize their continuing connection to land, waters, and culture. We pay
our respects to their Elders past, present, and emerging.
```

---

#### Attribution and Artist Recognition

**Decision:** Prominent artist attribution and optional artist profiles

**Rationale:**
- **Cultural Respect:** Indigenous artists deserve recognition and compensation for their work
- **Encourages Participation:** Artists more likely to contribute if they receive credit
- **Combat Appropriation:** Clear attribution fights cultural appropriation
- **Economic Opportunity:** Artist profiles can link to galleries/shops where work can be purchased

**Implementation:**
- Artist name always displayed on art detail page
- Artist profiles show bio and all attributed works
- Option to link external sites (shop, social media)

---

#### Sacred Knowledge Protection

**Decision:** Multi-layer protection for sensitive content

**Rationale:**
- **Potential for Harm:** Misuse of sacred imagery or site locations can have serious spiritual and cultural consequences
- **Community Trust:** Platform must earn and maintain trust of indigenous communities
- **Legal Considerations:** Some cultural heritage is legally protected
- **Ethical Duty:** Non-indigenous platform maintainers have responsibility to protect what they don't fully understand

**Protection Layers:**
1. **Submitter Declaration:** Users flag sensitivity during submission
2. **Admin Review:** Every submission reviewed by moderator before publication
3. **Location Controls:** Three-tier system (exact, general, hidden)
4. **Content Guidelines:** Clear guidance on what should not be shared
5. **Report Mechanism:** Community can flag inappropriate content
6. **Takedown Process:** Swift removal if content is identified as harmful

---

#### Non-Commercial Commitment

**Decision:** Platform is non-commercial, no ads, no paid promotions

**Rationale:**
- **Exploitation Prevention:** Commercializing indigenous culture would perpetuate historic exploitation
- **Trust Building:** Users more likely to contribute knowing platform is for community benefit
- **Focus on Mission:** No conflict between cultural respect and profit motive

**Future Sustainability:**
- Educational institution hosting
- Grant funding from cultural heritage organizations
- Volunteer moderation with indigenous cultural advisors

---

## Conclusion

The Indigenous Art Atlas UX design is built on a foundation of cultural respect, user empowerment, and accessible technology. Every element—from the multi-step submission form to the location privacy controls—has been carefully crafted to serve our diverse user base while upholding the highest ethical standards.

### Key Takeaways:

1. **Personas Drive Design:** Dr. Mitchell, Uncle Tommy, and Emma represent three distinct but equally important user groups whose needs inform every design decision.

2. **Cultural Sensitivity is Non-Negotiable:** Location privacy, moderation, and clear guidelines protect sacred knowledge while enabling appropriate sharing.

3. **Simplicity Enables Participation:** Intuitive forms and clear navigation ensure users of all technical levels can contribute.

4. **Transparency Builds Trust:** Clear processes, visible provenance, and community guidelines foster confidence in the platform.

5. **Accessibility is Essential:** Mobile-first, WCAG-compliant design ensures the platform serves everyone.

### Next Steps:

With this UX foundation established, we will proceed to:
- **Cycle 2:** Implement the frontend prototype with HTML, CSS, and JavaScript
- **Cycle 3:** Build the full-stack application with PHP and MySQL backend
- **Cycle 4:** Conduct usability testing and gather community feedback

---

*This document was created as part of the COMP9030 Cycle 1 UX Design assignment. All design decisions prioritize user needs, cultural sensitivity, and ethical responsibility.*
