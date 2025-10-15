# Oral Presentation Guide - Cycle 4
## Indigenous Art Atlas - Usability Testing

**Duration**: 10-15 minutes
**Format**: Oral presentation with visual aids

---

## Presentation Structure

### 1. Introduction (1-2 minutes)

**Opening Statement**:
"Today I'll be presenting the usability testing results for the Indigenous Art Atlas, a web application designed to document and share Australian indigenous art while respecting cultural protocols."

**Quick Overview**:
- Tested with 7 participants (artists, researchers, general public)
- Conducted 9 tasks covering all major features
- Found both strengths and areas for improvement
- Have specific, actionable recommendations

---

### 2. Testing Methodology (2-3 minutes)

**Explain Our Approach**:
"We used a think-aloud usability testing method with realistic scenarios."

**Participant Groups**:
- **3 Indigenous Artists** (ages 35-64, lower tech proficiency)
  - Wanted to share cultural knowledge
  - Valued location sensitivity features

- **2 Academic Researchers** (ages 30-49, high tech proficiency)
  - Needed advanced search and filtering
  - Wanted data export capabilities

- **2 General Public** (ages 20-34, moderate tech proficiency)
  - Interested in learning about indigenous art
  - Wanted intuitive, engaging experience

**Testing Process**:
- Each session lasted about an hour
- Participants completed 9 tasks while thinking aloud
- We recorded completion rates, time, errors, and satisfaction
- Followed up with System Usability Scale questionnaire

**Why This Approach**:
"This method shows us real problems that real users face, not just what we think might be issues."

---

### 3. Key Findings - The Good (2 minutes)

**Overall Performance**:
"First, the good news - the site performed well overall with a 73.9 SUS score, which is above the industry average of 68."

**What Worked Really Well**:

**Login/Logout (5.0/5 satisfaction)**:
"Every single participant completed login and logout tasks perfectly in under a minute. When users don't even think about these basic functions, that's exactly what you want."

**Homepage & Navigation (4.6/5 satisfaction)**:
"Everyone understood what the site was about within the first couple of minutes. The layout clearly communicates its purpose."

**Cultural Sensitivity (86% understood)**:
"This was crucial - most participants understood why we have location sensitivity options to protect sacred sites. One artist said: 'Finally, a site that respects our protocols.'"

**Admin Functions (4.5/5 satisfaction)**:
"The moderation workflow for reviewing submissions worked smoothly. Researchers could easily approve or reject entries."

---

### 4. Key Findings - The Problems (3-4 minutes)

**Critical Issue #1: Location Picker Confusion**:
"This was our biggest problem. When users tried to submit an art entry, they couldn't figure out how to set the location on the map."

**The Data**:
- 6 out of 7 participants struggled
- 2 participants completely failed the submission task
- Average satisfaction: 3.1/5
- Added ~2 minutes to submission time

**What Participants Said**:
- "I don't know if I'm supposed to click, drag, or what"
- "This should work like Google Maps"
- "I've been clicking on this map for two minutes"

**Why It Happened**:
The interaction didn't match patterns users learned from Google Maps and other common applications. No instructions, no visual feedback, no confirmation.

---

**Critical Issue #2: Hidden Filters**:
"Users couldn't find the filter controls to narrow down search results."

**The Data**:
- 6 out of 7 participants had trouble
- Task completion dropped to 86%
- Average satisfaction: 3.7/5

**What Happened**:
The filter button was a small icon that users looked right past. They expected either a prominent "Filter" button with text, or filters always visible in a sidebar.

**User Quote**:
"Where are the filters? I can't find them anywhere... Oh, that tiny icon? I completely missed that."

---

**Medium Issue: Form Validation Feedback**:
"When users made mistakes in forms, they didn't notice the error messages."

**The Problem**:
Error messages appeared at the top of the form in small red text, but users were focused on the field they were typing in.

**Impact**:
Users hit submit, nothing happened, and they thought the site was broken. Frustrating experience.

---

### 5. User Group Differences (1-2 minutes)

**Artists** (SUS: 65 - Below Average):
"Artists understood the cultural aspects perfectly but struggled with technical interactions. They want to contribute but need simpler, more guided interfaces."

**Researchers** (SUS: 88.75 - Excellent):
"Researchers breezed through everything but wanted more advanced features like data export and bulk operations. They're power users who need power tools."

**General Public** (SUS: 72.5 - Good):
"General users fell in between. They could figure things out but needed more obvious guidance. They found the content engaging when they could access it easily."

**Key Insight**:
"We're serving three very different audiences with different needs. The challenge is balancing simplicity for artists with advanced features for researchers, while keeping it intuitive for everyone."

---

### 6. Recommendations (3 minutes)

**Priority 1: Fix the Location Picker (Critical)**:
"Completely redesign how users set locations:"
- Add clear instructions: "Click on the map to set location"
- Show a crosshair cursor on hover
- Drop a draggable pin when clicked
- Add address search box
- Confirm location was set

"Expected outcome: 100% task completion instead of 86%."

---

**Priority 2: Make Filters Visible (High)**:
"Move filters to a persistent sidebar:"
- Always visible on the left
- Clear labels and organization
- Show active filter count
- Prominent "Apply" button

"Expected outcome: Cut filter discovery time from 90 seconds to 30 seconds."

---

**Priority 3: Improve Form Validation (Medium)**:
"Show errors where users are looking:"
- Display requirements upfront
- Inline validation under each field
- Real-time feedback as they type
- Clear, specific error messages

"Expected outcome: 90% fewer validation errors."

---

**Priority 4: Add Image Uploads (Medium)**:
"5 out of 7 participants asked about adding photos:"
- Optional photo upload for entries
- Multiple images per entry
- Drag-and-drop interface
- Clear file size limits

"Expected outcome: More complete and engaging content."

---

**Additional Recommendations**:
- Clarify user role selection with tooltips
- Add data export for researchers
- Mobile responsive improvements

---

### 7. Expected Impact (1 minute)

**After Implementing Phase 1 (Critical Fixes)**:

| Metric | Current | Target | Improvement |
|--------|---------|--------|-------------|
| Task Completion | 95% | 100% | +5% |
| Submission Success | 86% | 100% | +14% |
| SUS Score | 73.9 | 80+ | +8% |
| Submission Time | 5:49 | 4:00 | -31% |

**The Bottom Line**:
"These aren't fundamental design flaws - they're interaction details that need refinement. Fix the critical issues, and we'll have an excellent user experience that serves all three user groups effectively."

---

### 8. Project Reflection (1-2 minutes)

**What I Learned**:

**About Usability Testing**:
"The think-aloud protocol revealed issues I never would have spotted on my own. Watching real people struggle with the location picker showed me that what seems obvious to a developer isn't obvious to users."

**About Designing for Multiple Audiences**:
"Serving artists, researchers, and the general public in one application is challenging. You can't make it too simple or researchers get frustrated. You can't make it too complex or artists struggle. Balance is key."

**About Cultural Sensitivity in Design**:
"The location sensitivity feature resonated deeply with participants. It's not just a technical feature - it's a statement of respect. Design choices can communicate values."

**Technical Lessons**:
"Iteration is essential. The first version works, but usability testing shows you where users actually struggle. Then you iterate. No one gets it perfect on the first try."

**Process Insights**:
"Starting with UX design (Cycle 1), building the frontend (Cycle 2), implementing the backend (Cycle 3), and now testing with real users (Cycle 4) - each cycle built on the last. Problems found in testing trace back to decisions made in earlier cycles."

---

**Most Valuable Lesson**:
"Users are honest in ways you might not be with yourself. When 6 out of 7 people struggle with the same thing, it's not their fault - it's your interface. That's humbling but incredibly valuable."

---

### 9. Conclusion & Q&A (1 minute)

**Closing Statement**:
"The Indigenous Art Atlas successfully achieves its core goal - providing a respectful platform for documenting and sharing indigenous art. Users understand it, appreciate it, and want to use it.

The usability issues we found are solvable. The location picker needs a redesign, filters need better visibility, and validation needs improvement. These are clear problems with clear solutions.

With the recommended changes, this site will go from 'good with frustrations' to 'genuinely excellent.' The foundation is solid. Now it's about refining the experience.

Thank you. I'm happy to answer any questions."

---

## Presentation Tips

### Visual Aids to Prepare

1. **Participant Overview Slide**
   - Show the 3 user groups with icons
   - Their goals and characteristics

2. **Task Completion Chart**
   - Bar chart showing completion rates for each task
   - Highlight the problematic ones (Tasks 2, 5, 8)

3. **SUS Score Comparison**
   - Industry average (68) vs Our score (73.9)
   - Breakdown by user group

4. **Location Picker Screenshots**
   - Show current interface
   - Show proposed redesign with annotations

5. **Before/After Metrics Table**
   - Current vs Target for key metrics

6. **User Quotes Slide**
   - 3-4 impactful quotes from participants

### Delivery Tips

**Speak Naturally**:
Don't read from the script word-for-word. Use it as a guide but talk conversationally.

**Tell Stories**:
When describing issues, paint a picture: "Imagine you're an artist trying to share knowledge about a bark painting you created. You're excited to contribute, but then you get to the location picker and..."

**Show Empathy for Users**:
Frame problems from the user's perspective, not as "they couldn't figure it out" but "the interface didn't guide them clearly."

**Be Confident About Findings**:
You have data. When you say 6 out of 7 participants struggled, that's not an opinion - it's a fact.

**Acknowledge Limitations**:
"With 7 participants we can spot clear patterns, but more testing would reveal additional insights."

**Time Management**:
- If running short: Skip user group differences, go straight to recommendations
- If running long: Cut the methodology details, focus on findings and solutions

### Anticipated Questions & Answers

**Q: "Why only 7 participants?"**
A: "Usability research shows that 5-7 participants typically reveal 80-85% of usability issues. We tested across three distinct user groups, which gave us 2-3 participants per group - enough to spot patterns."

**Q: "How would you prioritize which fixes to implement first?"**
A: "Priority 1 is the location picker because it causes complete task failures. Priority 2 is filter visibility because it affects a core feature. Everything else can be scheduled after those critical fixes."

**Q: "Did any findings surprise you?"**
A: "Yes - I was surprised how well the cultural sensitivity features were understood. I worried they might be too technical, but users really got why they matter."

**Q: "What would you test next?"**
A: "After implementing the critical fixes, I'd do a follow-up test with 3-5 new participants to verify the improvements worked. Then I'd want to do mobile usability testing since we only tested on desktop."

**Q: "How did you recruit indigenous artists?"**
A: "We partnered with local indigenous community centers and art collectives. We emphasized that we wanted honest feedback to make the site serve their needs better."

---

## Final Checklist

Before the presentation:
- [ ] Practice the full presentation at least twice
- [ ] Time yourself (aim for 12-13 minutes to leave buffer)
- [ ] Prepare visual slides
- [ ] Have test results document printed as backup
- [ ] Test any demo/video clips
- [ ] Prepare for technical difficulties (have screenshots as backup)
- [ ] Review key statistics so you can quote them naturally
- [ ] Get a good night's sleep

During the presentation:
- [ ] Speak clearly and at moderate pace
- [ ] Make eye contact with audience
- [ ] Use hand gestures naturally
- [ ] Show enthusiasm for the findings
- [ ] Pause for questions if instructor interrupts
- [ ] Stay within time limit

---

**Good luck! You've done thorough work - now just communicate it clearly.**
