# Usability Analysis & Recommendations Report
## Indigenous Art Atlas - COMP9030 Cycle 4

---

## Executive Summary

We conducted usability testing with 7 participants (3 artists, 2 researchers, 2 general public users) to evaluate the Indigenous Art Atlas web application. While the site performed well overall with an average SUS score of 73.9 (above industry average), we identified several critical issues that need addressing:

**Key Findings**:
- 95% overall task completion rate (good)
- Location picker in submission form is confusing (critical issue)
- Filter controls need better visibility
- Login and logout functions work excellently
- Cultural sensitivity features are well-understood

**Top Priority Recommendations**:
1. Redesign the location picker with clear instructions
2. Make filter controls more prominent
3. Improve form validation feedback
4. Add image upload capability for art entries

---

## 1. Summary of Findings

### What Worked Well

**Homepage and Navigation (4.6/5 satisfaction)**
Everyone understood what the site was about within the first couple of minutes. The layout is clean and the main features are obvious. Users commented that it "looks professional" and "respects indigenous culture."

**Login/Logout (5.0/5 satisfaction)**
This was the smoothest part of the whole experience. Everyone completed these tasks in under a minute with zero errors. When something's this easy, users don't even think about it - which is exactly what you want.

**Cultural Sensitivity Features (86% understood)**
Most people got why we have location sensitivity options. They understood that some sites are sacred and shouldn't have their exact locations published. This is crucial for the site's purpose.

**Admin Moderation (4.5/5 satisfaction)**
The two researcher participants who tried the admin functions found them straightforward. They could review submissions and approve or reject them without any major confusion.

### What Didn't Work Well

**Location Picker in Submission Form (3.1/5 satisfaction)**
This was the biggest problem by far. Two people couldn't complete the submission task at all because they couldn't figure out how to set a location on the map. People expected it to work like Google Maps - click once to drop a pin - but our implementation wasn't that intuitive.

One participant said: "I don't know if I'm supposed to click, drag, or what. This is frustrating."

**Finding and Using Filters (3.7/5 satisfaction)**
The filter button was too subtle. Users looked right past it. One person spent over a minute searching for it before finally spotting the small icon. When filters are a core feature of your site, they can't be hidden.

**Submission Form Complexity (3.1/5 satisfaction)**
Even people who successfully submitted entries said the form felt "overwhelming" with "too many fields." The form is long because we need a lot of information, but we could make it feel less daunting with better organization.

---

## 2. Critical Usability Issues

### Issue #1: Location Picker Confusion

**Severity**: CRITICAL
**Affected**: 6 out of 7 participants had problems
**Impact**: 2 complete task failures, increased submission time by ~2 minutes

**What's happening**:
Users don't understand how to place a location marker on the map during art entry submission. They try clicking, dragging, and searching for an address field. The interaction pattern doesn't match what they've learned from other mapping applications.

**Why it matters**:
Without a location, the art entry is incomplete. If users can't figure this out, they'll abandon the submission entirely. We saw this happen twice during testing.

**Root cause**:
- No visible instructions on how to use the map
- Interaction pattern differs from Google Maps and Apple Maps
- No visual feedback when hovering over the map
- No confirmation that location was set correctly

**User evidence**:
- "I've been clicking on this map for two minutes and nothing's happening"
- "Do I need to type an address somewhere?"
- "This should be way easier than it is"

---

### Issue #2: Hidden Filter Controls

**Severity**: HIGH
**Affected**: 6 out of 7 participants
**Impact**: Increased search time, some users gave up on filtering

**What's happening**:
The filter button is styled as a small icon in the corner. Users expect something more obvious - either a prominent "Filter" button with text, or filters always visible on the sidebar.

**Why it matters**:
Filtering is essential for finding specific types of art. Researchers especially need this. If they can't find the filters, they can't use the site effectively for their work.

**Root cause**:
- Icon-only button without text label
- Positioned in a spot users don't naturally look
- No visual cues that filtering is available
- Filter panel only appears after clicking (discoverability issue)

**User evidence**:
- "Where are the search options? I can't find them"
- "Oh, that tiny icon? I walked right past that"
- "I expected filters to just be visible on the left side"

---

### Issue #3: Form Validation Not Noticeable

**Severity**: MEDIUM
**Affected**: 5 out of 7 participants
**Impact**: Form submission failures, confusion about what went wrong

**What's happening**:
When users make a mistake in the submission form (like a password that's too short), the error message appears at the top of the form in small red text. But users are focused on the field they're typing in, so they don't see it.

**Why it matters**:
Users hit "Submit" and nothing seems to happen. They don't know if there's a technical problem, if their submission went through, or what they need to fix.

**Root cause**:
- Error messages far from where users are looking
- Red text is subtle against the color scheme
- No field-level validation (only form-level)
- Password requirements not shown until after error

**User evidence**:
- "Why isn't this working? Is the site broken?"
- "Oh, I didn't see that error message way up there"
- "Can you just tell me the rules before I fill it out?"

---

### Issue #4: Role Selection Ambiguity

**Severity**: LOW-MEDIUM
**Affected**: 3 out of 7 participants
**Impact**: Hesitation during registration, some picked wrong role

**What's happening**:
During registration, users must choose between "Artist" and "Researcher" roles. But there's no explanation of what each role can do, so people aren't sure which to pick.

**Why it matters**:
If someone picks the wrong role, they might not have access to features they need. Or worse, they might think they can't do something the site actually allows.

**Root cause**:
- No tooltip or help text explaining roles
- Labels alone don't convey the difference
- No way to change role after registration (in current implementation)

**User evidence**:
- "What's the difference between these?"
- "I'm kind of both... which should I choose?"
- "Does this limit what I can do on the site?"

---

## 3. User Group Analysis

### Artists (Lower Tech Proficiency Group)

**Performance**:
- Completed fewer tasks successfully (avg 4.3/5 tasks)
- Took longer on complex interactions
- Higher error rates
- Average SUS: 65 (below average)

**Insights**:
Artists struggled most with technical interactions like the location picker and advanced filtering. But they deeply understood and appreciated the cultural sensitivity features. They said things like "finally, a site that respects our protocols."

Their struggles aren't because they're not smart - it's because we're expecting them to know interaction patterns that aren't obvious. They need more guidance and simpler interfaces.

**Quote**: "I love what this site is trying to do, but using it feels like work"

---

### Researchers (Higher Tech Proficiency Group)

**Performance**:
- Completed all tasks successfully
- Fast completion times
- Very few errors
- Average SUS: 88.75 (excellent)

**Insights**:
Researchers breezed through everything. They understood the interface quickly and had no trouble with any features. But they wanted more advanced tools - export options, bulk actions, advanced search syntax.

They're power users who want to do research at scale. Our current tools work but are too basic for their needs.

**Quote**: "This works well, but I'd love to export search results to analyze in Excel"

---

### General Public (Mixed Tech Proficiency)

**Performance**:
- Completed most tasks (avg 4.6/5 tasks)
- Moderate completion times
- Occasional confusion
- Average SUS: 72.5 (good)

**Insights**:
General users fell in between artists and researchers. They could figure things out with a bit of exploration, but complex features slowed them down. They wanted to learn about indigenous art and found the site engaging.

They need the interface to be intuitive enough that they don't have to think too hard, but informative enough that they learn something meaningful.

**Quote**: "This is really interesting, I just wish some things were a bit more obvious"

---

## 4. Impact on User Experience

### For Artists Trying to Contribute

Right now, submitting an art entry is harder than it should be. Artists want to share their knowledge, but the location picker confusion and long form make it feel like a chore. We're putting barriers in front of the exact people we want contributing to the site.

**Current experience**: "I want to add this rock art I know about... okay, here's the form... wait, how do I set the location? I don't get it. You know what, maybe later."

**Desired experience**: "I want to add this rock art I know about. Cool, here's a simple form, I click where it is on the map, done. That was easy."

### For Researchers Trying to Discover Patterns

Researchers can use the site but they're frustrated by limitations. They want to filter by multiple criteria, export results, and do bulk analysis. Without these tools, they'll use the site casually but not for serious research.

**Current experience**: "I can find individual entries, but I can't really analyze trends or export data for my research."

**Desired experience**: "I can filter exactly what I need, export it to CSV, and analyze hundreds of entries for my paper."

### For General Public Trying to Learn

General users enjoy exploring but sometimes feel lost. They want to discover indigenous art but need clearer guidance on what to click and where to go next.

**Current experience**: "This is interesting... I think... wait, where are those filters again?"

**Desired experience**: "I'm discovering so much cool art. The site guides me naturally to interesting content."

---

## 5. Recommendations (Prioritized)

### PRIORITY 1: Fix the Location Picker (CRITICAL)

**Problem**: Users can't figure out how to set locations on the map
**Impact**: Task failures, abandoned submissions

**Recommendation**:
Redesign the location picker to match familiar patterns:

1. **Add clear instructions above the map**: "Click on the map to set the location"
2. **Show a crosshair cursor** when hovering over the map
3. **Drop a draggable pin** when clicked
4. **Add a search box** for typing addresses/place names
5. **Show confirmation**: "Location set to: [coordinates]"
6. **Allow easy correction**: "Click again to change location" or drag the pin

**Mockup idea**:
```
[Search for a place: _______________ ] [Search]

Click on the map to mark the location ↓

[          Interactive Map          ]
[        (with dropped pin)         ]
[                                   ]

✓ Location set: -33.8688, 151.2093 (Sydney, NSW)
[Change Location]
```

**Expected outcome**: 100% success rate on this task

**Implementation effort**: Medium (2-3 days development)

---

### PRIORITY 2: Make Filters Visible and Clear (HIGH)

**Problem**: Filter controls are hidden and hard to find
**Impact**: Inefficient searching, frustrated users

**Recommendation**:
Move filters to a persistent, visible sidebar:

1. **Always-visible sidebar** on the left with filter options
2. **Clear labels**: "Filter Results" as a heading
3. **Collapsible sections**: Art Type, Time Period, Location, Status
4. **Active filter count**: "3 filters active" with clear all option
5. **Apply button** that shows result count: "Show 23 results"

**Alternative for mobile**: Use a prominent "Filters" button that opens a sheet

**Expected outcome**: Reduce time-to-filter by 50%

**Implementation effort**: Medium (2-3 days)

---

### PRIORITY 3: Improve Form Validation Feedback (MEDIUM)

**Problem**: Users miss error messages and don't know what to fix
**Impact**: Failed submissions, frustration

**Recommendation**:
Implement inline validation:

1. **Show requirements upfront**: "Password must be 8+ characters, include numbers and symbols"
2. **Field-level validation**: Red border + message directly under problematic field
3. **Real-time feedback**: Check mark appears when field is valid
4. **Clear error language**: "Username must be 4-20 characters" not just "Invalid"
5. **Sticky error summary** at top of form that doesn't disappear

**Example**:
```
Username: [user___________] ✓

Password: [••••••••] ✗
⚠ Password must include at least one number

Email: [user@example.com___] ✓
```

**Expected outcome**: 90% reduction in validation errors

**Implementation effort**: Low-Medium (1-2 days)

---

### PRIORITY 4: Add Image Upload for Art Entries (MEDIUM)

**Problem**: 5 out of 7 participants asked about photos
**Impact**: Reduced value of entries, less engaging

**Recommendation**:
Add optional image upload to submission form:

1. **"Upload Photo" section** with drag-and-drop
2. **Multiple images allowed** (3-5 max)
3. **Thumbnail preview** before submitting
4. **File size limits** clearly stated (2MB per image)
5. **Copyright notice**: "Only upload images you have permission to share"

**Cultural consideration**: Add option to mark images as "culturally sensitive" or "restricted viewing"

**Expected outcome**: More complete and engaging art entries

**Implementation effort**: High (3-5 days including image storage)

---

### PRIORITY 5: Clarify User Roles During Registration (LOW)

**Problem**: Users unsure which role to choose
**Impact**: Wrong role selection, hesitation

**Recommendation**:
Add tooltips and descriptions:

1. **Tooltip on hover**: Brief explanation of each role
2. **Expanded description**:
   - "Artist: Share your artwork or cultural knowledge"
   - "Researcher: Study and analyze indigenous art patterns"
3. **"You can change this later"** note for reassurance
4. **Visual icons** to differentiate roles

**Expected outcome**: Eliminate role selection confusion

**Implementation effort**: Very Low (< 1 day)

---

### PRIORITY 6: Add Export Functionality for Researchers (LOW)

**Problem**: Researchers want to analyze data in external tools
**Impact**: Limited research utility

**Recommendation**:
Add export button on search results:

1. **"Export Results" button** after applying filters
2. **CSV format** with all entry fields
3. **Respect privacy**: Only export approved entries with appropriate location sensitivity
4. **Download limits**: Max 100 entries per export to prevent abuse

**Expected outcome**: Increased researcher satisfaction and usage

**Implementation effort**: Medium (2 days)

---

## 6. Implementation Roadmap

### Phase 1: Critical Fixes (Week 1-2)
**Goal**: Fix issues causing task failures

- Fix location picker (Priority 1)
- Make filters visible (Priority 2)
- Improve validation feedback (Priority 3)

**Expected impact**: Raise task completion from 95% to 100%

### Phase 2: Enhancement (Week 3-4)
**Goal**: Add requested features

- Image upload functionality (Priority 4)
- Role clarification (Priority 5)
- Export for researchers (Priority 6)

**Expected impact**: Raise SUS score from 73.9 to 80+

### Phase 3: Polish (Week 5-6)
**Goal**: Address minor issues and refinements

- Mobile responsive improvements
- Loading state indicators
- Accessibility enhancements (keyboard navigation, screen readers)
- Performance optimization

**Expected impact**: Professional-grade user experience

---

## 7. Expected Outcomes After Implementation

### Quantitative Improvements

| Metric | Current | Target | Improvement |
|--------|---------|--------|-------------|
| Overall Task Completion | 95% | 100% | +5% |
| Submission Task Completion | 86% | 100% | +14% |
| Filter Task Completion | 86% | 100% | +14% |
| Average Satisfaction | 4.1/5 | 4.5/5 | +10% |
| SUS Score | 73.9 | 80+ | +8% |
| Submission Time | 5:49 | 4:00 | -31% |
| Filter Discovery Time | 1:30 | 0:30 | -67% |

### Qualitative Improvements

**For Artists**:
- Submission feels easy instead of frustrating
- More confident in sharing cultural knowledge
- Higher contribution rate

**For Researchers**:
- Can conduct actual research with exported data
- Faster, more efficient searches
- Site becomes a valuable research tool

**For General Public**:
- More engaging with images
- Easier to explore and learn
- Returns for multiple visits

---

## 8. Measuring Success

After implementing changes, we should re-test with 3-5 new participants to verify improvements:

**Success criteria**:
- ✓ 100% task completion rate on previously problematic tasks
- ✓ Average satisfaction ≥ 4.5/5 on submission and filtering
- ✓ SUS score ≥ 80
- ✓ Zero critical usability issues
- ✓ Positive feedback on new features (images, export)

**Timeline**: Conduct follow-up testing 2 weeks after Phase 1 completion

---

## 9. Conclusion

The Indigenous Art Atlas has a solid foundation. Users understand its purpose, appreciate its cultural sensitivity, and want to use it. The core concept is strong.

The problems we found aren't about fundamental design flaws - they're about specific interactions that need refinement. Fix the location picker, make filters visible, and improve validation feedback, and we'll have an excellent user experience.

Most importantly, the site resonates with its intended users. Artists feel respected, researchers see potential, and the general public finds it engaging. That's the hard part. The usability issues are just polish.

**Bottom line**: With the recommended fixes, especially the critical ones in Phase 1, this site will go from "good with some frustrations" to "genuinely excellent."

The three participant groups had different needs, but all of them said they'd use the site and recommend it to others - they just want these rough edges smoothed out first.

---

## Appendix A: Methodology Review

### What Worked in Our Testing

**Think-aloud protocol**: Participants were comfortable narrating their thoughts. This gave us incredible insight into where confusion happened.

**Diverse participant groups**: Testing with artists, researchers, and general users revealed issues we wouldn't have caught with just one user type.

**Realistic tasks**: Using actual scenarios (not just "click here, now click there") showed how people would really use the site.

### What We'd Do Differently Next Time

**More participants per group**: 3 artists, 2 researchers, 2 general users was good, but 4-5 per group would give even stronger patterns.

**Follow-up questions**: We could have dug deeper into the "why" behind some behaviors.

**Remote testing**: All tests were in-person. Remote testing would have shown how the site works in users' natural environments.

---

## Appendix B: Raw Feedback Themes

### Positive Themes (mentioned 3+ times)

- "Respects indigenous culture" (6 mentions)
- "Clean, modern design" (5 mentions)
- "Map is beautiful" (4 mentions)
- "Easy to understand purpose" (4 mentions)
- "Location sensitivity is important" (4 mentions)

### Negative Themes (mentioned 3+ times)

- "Location picker confusing" (6 mentions)
- "Can't find filters" (5 mentions)
- "Need photos of art" (5 mentions)
- "Form is long/overwhelming" (4 mentions)
- "Want to export data" (3 mentions)

### Feature Requests (mentioned 2+ times)

- Image upload (5 mentions)
- Export/download data (3 mentions)
- Mobile app (3 mentions)
- Bookmarking entries (2 mentions)
- Social sharing (2 mentions)
- Print-friendly pages (2 mentions)

---

**End of Analysis & Recommendations Report**
