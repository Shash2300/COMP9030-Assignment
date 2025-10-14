# Cycle 1 Oral Presentation Guide

**Duration:** Tutorial session (approximately 10-15 minutes)
**Format:** Present your cycle1.md document and visual artifacts
**Audience:** Teaching staff and peers

---

## Presentation Structure

### 1. Introduction (1 minute)

**Opening:**
> "Good [morning/afternoon]. Today we're presenting the UX design for the Indigenous Art Atlas, a community-driven platform for documenting and sharing indigenous art across Australia."

**Team Introduction:**
> "Our team consists of [names and roles]."

**Agenda:**
> "We'll cover our target users, key user journeys, wireframe designs, and the ethical considerations that guided our design decisions."

---

### 2. Project Overview (1-2 minutes)

**What to say:**
> "The Indigenous Art Atlas addresses a critical need: there's currently no centralized, culturally-sensitive platform for documenting indigenous art. Our platform will:"

- Create a searchable database of indigenous art
- Use interactive mapping to show art locations
- Empower communities to share their cultural heritage safely
- Protect sacred sites through privacy controls

**Visual:** Show homepage wireframe or project overview slide

---

### 3. User Personas (3-4 minutes)

**Introduce each persona briefly:**

#### Persona 1: Dr. Sarah Mitchell (Academic Researcher)
> "Our first persona is Dr. Sarah Mitchell, a 42-year-old academic researcher. She needs reliable, comprehensive data for her research while respecting cultural protocols."

**Key points:**
- High tech comfort
- Needs detailed metadata and citations
- Pain point: scattered, unverified information

**Visual:** Show persona-researcher.png

---

#### Persona 2: Uncle Tommy Williams (Indigenous Artist)
> "Uncle Tommy is a Yolngu elder and traditional artist. He wants to share appropriate cultural knowledge while protecting sacred information."

**Key points:**
- Medium tech comfort - needs simple interface
- Goals: educate, protect sacred sites, get recognition
- Pain point: past platforms didn't respect cultural boundaries

**His quote is powerful:** *"This is our story, our culture. We want to share it, but it needs to be done right, with respect."*

**Visual:** Show persona-artist.png

---

#### Persona 3: Emma Chen (Art Enthusiast)
> "Emma is a 28-year-old designer and traveler who wants to discover indigenous art respectfully."

**Key points:**
- Very high tech comfort
- Needs visual interface, mobile-friendly
- Pain point: uncertainty about what's appropriate to visit

**Visual:** Show persona-tourist.png

---

### 4. User Flows (2-3 minutes)

**Select ONE flow to walk through in detail** (recommend Flow 2 - most complex):

#### User Flow 2: Submitting Art Entry

> "Let me walk you through how Uncle Tommy would document a new mural his community created."

**Walk through key steps:**
1. "He logs in and clicks 'Submit New Art'"
2. "Our multi-step form breaks the complex process into manageable chunks"
3. "Step 1: Art details - title, description, type, period"
4. "Step 2: Location - this is critical. He uses our interactive map to pin the location"
5. **Emphasize:** "Notice the prominent location sensitivity controls - he can mark sites as restricted"
6. "Step 3: Upload images - multiple photos with previews"
7. "Step 4: Artist attribution"
8. "Finally, he reviews and submits for moderation"

**Why this matters:**
> "This flow demonstrates our commitment to cultural sensitivity - at every step, we're considering how to protect sacred knowledge while enabling sharing."

**Visual:** Show userflow-2-submit-art.png

---

### 5. Wireframes (2-3 minutes)

**Select 2-3 KEY wireframes to present:**

#### Wireframe 1: Homepage
> "Our homepage immediately communicates the platform's purpose through a clear hero section and prominent interactive map."

**Point out:**
- Navigation is simple and persistent
- Map is the star feature
- Featured content provides alternative discovery
- Footer includes Acknowledgment of Country

**Visual:** Show wireframe-homepage.png

---

#### Wireframe 2: Submit Art Form
> "This multi-step submission form was designed with Uncle Tommy in mind - someone who's less tech-savvy but has invaluable knowledge to share."

**Point out:**
- Progress indicator (always know where you are)
- Location sensitivity controls are not hidden - they're front and center
- Each step focuses on one task
- Autosave prevents data loss

**Visual:** Show wireframe-submit-form.png

---

#### Wireframe 3: Admin Panel (optional, if time)
> "Every submission goes through moderation to ensure cultural sensitivity and accuracy."

**Point out:**
- Admin can override location privacy settings
- Review process shows all details
- Rejection requires explanation (transparency)

**Visual:** Show wireframe-admin-panel.png

---

### 6. Design Rationale (2-3 minutes)

**Key Design Principles:**

#### Cultural Sensitivity as Core Value
> "This isn't just a feature - it's fundamental to everything. We've implemented:"

- Multi-layer location protection
- Mandatory admin review
- Three-tier location display (exact, general, hidden)
- Clear guidelines on appropriate content

**Why it matters:**
> "Inappropriate sharing of sacred sites can cause real harm to indigenous communities. Our design prevents this."

---

#### Accessibility for All Users
> "Our personas span a wide range of tech comfort. We designed for the least experienced user without frustrating advanced users."

**Implementation:**
- Progressive disclosure
- Multi-step forms with clear progress
- Mobile-first responsive design
- WCAG 2.1 AA compliance

---

#### Trust Through Transparency
> "For a community platform to succeed, users must trust the process."

**Implementation:**
- Clear submission status
- Visible provenance (who submitted, when)
- Rejection feedback
- Non-commercial commitment

---

### 7. Ethical Considerations (1-2 minutes)

**Highlight key ethical decisions:**

> "We've made several deliberate ethical commitments:"

1. **Non-Commercial:** No ads, no paid promotions - this is for community benefit
2. **Artist Attribution:** All art is properly credited; artists can link to shops
3. **Acknowledgment of Country:** Recognizes traditional ownership
4. **Community Control:** Indigenous voices guide moderation decisions

**The bigger picture:**
> "We're not just building a database. We're creating a platform that respects and honors indigenous culture while making it accessible for education and appreciation."

---

### 8. Next Steps & Conclusion (1 minute)

**What comes next:**
> "With this UX foundation, we'll move into Cycle 2 to build the frontend prototype, bringing these wireframes to life with HTML, CSS, and JavaScript. Then in Cycle 3, we'll implement the full backend with PHP and MySQL."

**Closing:**
> "Our design prioritizes user needs, cultural sensitivity, and ethical responsibility. We believe the Indigenous Art Atlas can become a valuable resource for researchers, artists, and enthusiasts while protecting what's sacred."

**Open for questions:**
> "Thank you. We're happy to answer any questions."

---

## Presentation Tips

### Preparation:
- [ ] Practice timing (aim for 12-14 minutes, leave time for Q&A)
- [ ] Rehearse with your team - assign sections to each member
- [ ] Prepare answers to anticipated questions
- [ ] Test all visuals on presentation screen if possible
- [ ] Have backup plan if tech fails (printed cycle1.md)

### Delivery:
- **Don't read from the document** - use it as a guide
- **Point to visuals** when describing features
- **Make eye contact** with audience
- **Speak clearly and at moderate pace**
- **Show enthusiasm** - you've done great work!

### Team Coordination:
- **Assign sections:** Each team member presents 1-2 sections
- **Smooth transitions:** "Now [teammate] will talk about user flows..."
- **Stay engaged:** Even when not speaking, look attentive

### Handle Questions:
- **Listen fully** before answering
- **It's okay to say** "That's a great question - we considered X..."
- **Redirect to team:** "Would anyone else like to add to that?"
- **If unsure:** "That's something we'll explore more in Cycle 2/3"

---

## Anticipated Questions & Suggested Answers

### Q: "How will you handle verification of indigenous cultural claims?"

**A:** "Excellent question. Our multi-layer approach includes:
1. User roles (verified 'Artist' role for indigenous contributors)
2. Admin moderation by cultural advisors
3. Community reporting mechanism
4. We acknowledge we'll need indigenous cultural experts on our moderation team"

---

### Q: "What if someone submits sacred imagery that shouldn't be shared?"

**A:** "This is exactly why every submission requires admin approval before going live. Additionally:
- Clear submission guidelines explain what not to share
- Location sensitivity flags alert moderators
- Swift takedown process if something is identified post-approval
- We'll establish partnerships with indigenous cultural organizations for guidance"

---

### Q: "How do you balance accessibility with cultural protection?"

**A:** "Great question. Our three-tier location system provides flexibility:
- Exact location for public art and galleries
- General area (e.g., 'Northern Territory') for sensitive sites
- Completely hidden for sacred sites
The admin makes the final call, erring on the side of protection when uncertain."

---

### Q: "Your personas seem quite different - how do you design for all of them?"

**A:** "That's the challenge! Our approach:
- Progressive disclosure - complex features are accessible but not overwhelming
- Multi-step forms help less tech-savvy users
- Advanced search/filter options for researchers
- Visual, mobile-friendly interface for tourists
We designed for Uncle Tommy (medium tech comfort) and enhanced for Emma (high comfort)"

---

### Q: "Have you consulted with indigenous communities?"

**A:** "For this UX design phase, we've based our approach on:
- Existing ethical guidelines for indigenous cultural content
- Research into similar platforms' successes and failures
- Academic literature on cultural sensitivity in digital heritage

In Cycle 4 (Usability Evaluation), we plan to conduct testing with diverse users, ideally including indigenous community members. However, we acknowledge that meaningful consultation requires more than a semester project timeline. A real implementation would require ongoing partnerships with indigenous organizations."

---

### Q: "Why not use Google Maps instead of Leaflet/OpenStreetMap?"

**A:** "Several reasons:
- Privacy: OpenStreetMap doesn't track users like Google does
- Cost: Google Maps has usage limits and costs
- Customization: Leaflet gives us more control over marker types
- Lightweight: Faster loading
- Open source aligns with our non-commercial mission"

---

### Q: "How will you handle the database for sacred knowledge?"

**A:** "We're not storing sacred knowledge - that's the point. Our platform is for appropriate, public-facing cultural sharing. Sacred or restricted knowledge belongs with communities, not in a public database. Our location controls and content guidelines explicitly prevent inappropriate sharing."

---

## Presentation Checklist

**Before the tutorial:**
- [ ] All wireframes created and saved in imgs/
- [ ] Personas created and saved in imgs/
- [ ] User flows created and saved in imgs/
- [ ] cycle1.md is complete and polished
- [ ] Team has practiced together
- [ ] Sections assigned to team members
- [ ] Anticipated Q&A discussed
- [ ] Backup plan if tech fails

**Bring to tutorial:**
- [ ] Laptop with cycle1.md open
- [ ] All image files
- [ ] HDMI adapter (if presenting on external screen)
- [ ] Printed backup of cycle1.md
- [ ] Notes card (bullet points only!)
- [ ] Water bottle

---

## Evaluation Criteria (from rubric)

Your presentation will be assessed on:

| Criteria | What they're looking for |
|----------|-------------------------|
| **User Personas** | Comprehensive, evidence-based, demonstrate deep understanding of needs |
| **User Flows** | Clear, logical, cover all critical journeys with user-centricity |
| **Wireframes** | Well-structured, annotated, communicate layout and interactive elements |
| **Design Rationale** | Thorough explanation justifying choices based on user needs and usability |
| **Oral Presentation** | Engaging, articulate, well-organized, confidently conveys understanding |

**Aim for:** HD level
- Show deep understanding
- Connect everything back to user needs
- Demonstrate cultural sensitivity throughout
- Present confidently and clearly

---

**You've got this!** Your work is thorough and well-thought-out. Present with confidence.
