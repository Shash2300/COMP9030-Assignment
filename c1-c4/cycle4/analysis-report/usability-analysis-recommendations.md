# Usability Analysis & Recommendations Report

**Project:** Indigenous Art Atlas - COMP9030 Cycle 4

**Author:** Student ID

**Date:** October 14, 2025

## Executive Summary

> ### Key Findings:
> *   ✓ **82.1% overall task completion rate** (above 70% acceptability threshold)
> *   ✗ **Location picker: Severity 4 - Usability Catastrophe** (43% task failure, 100% of users affected)
> *   ⚠ **Filter controls: Severity 3 - Major problem** (86% of users couldn't find filters quickly)
> *   ✓ **Authentication excellence:** Login/logout 100% success, 5.0/5 satisfaction
> *   ✓ **Cultural sensitivity: 86% comprehension** (exceeds 80% target)
> *   ✓ **SUS Score: 73.9/100** (Good, above industry average of 68)
>
> ### Strategic Priorities:
> 1.  **CRITICAL:** Redesign location picker (prevents task completion for 43% of users)
> 2.  **HIGH:** Make filter controls visible and discoverable
> 3.  **MEDIUM:** Implement inline form validation feedback
> 4.  **MEDIUM:** Add image upload capability (requested by 71% of users)

> **Analysis Framework:** This report applies Nielsen's severity ratings (0-4 scale), Norman's interaction design principles, and Schneiderman's eight golden rules of interface design to prioritize recommendations based on frequency, impact, and persistence of usability issues.

## 1. Critical Usability Issues (Must Fix)

### **CRITICAL - SEVERITY 4** Issue #1: Location Picker Confusion
> **Problem Description:** Users could not determine how to set location markers on the interactive map during art entry submission. The interaction pattern lacked affordances, visual feedback, and instructional guidance.
>
> **Impact Assessment:**
> *   **Frequency:** 100% of participants affected (7/7)
> *   **Task Failure Rate:** 43% (3/7 participants completely failed submission task)
> *   **Time Cost:** Average +2:15 added to task completion time
> *   **Error Density:** 12 errors across 7 participants (1.7 errors/user)
> *   **Satisfaction Impact:** Task satisfaction dropped to 3.1/5 (lowest of all tasks)
>
> **Root Cause Analysis:**
> 1.  **Lack of Affordances:** Map provides no visual cues indicating clickability or interaction method (Norman, 1988)
> 2.  **Missing System Feedback:** No cursor change, hover state, or click confirmation (violates Nielsen's "Visibility of system status")
> 3.  **Mental Model Mismatch:** Users expect Google Maps-style interaction but system uses different pattern
> 4.  **Absent Help/Documentation:** No inline instructions, tooltips, or example demonstrations
>
> **User Evidence (Direct Quotes):**
> > "I don't know how to put a pin on this map. Do I click? Drag? Type an address somewhere?" - P01 (Spent 4:20 attempting, eventually received facilitator hint)
> > "This should work like Google Maps. Just click once and drop a pin. Why isn't it working?" - P03 (Abandoned task after 8 minutes)
> > "I'm clicking all over this map and nothing's happening. Is the system broken?" - P06 (Visible frustration, furrowed brow, sighing)
>
> **Design Recommendation (Evidence-Based Solution):**
> 1.  **Add Prominent Instructions:** Display "Click on the map to set the location" above map in 16px bold text
> 2.  **Visual Affordance:** Change cursor to crosshair (+) when hovering over map to signal clickability
> 3.  **Immediate Feedback:** Drop draggable marker pin on first click with animation
> 4.  **Address Search Integration:** Add Google Places Autocomplete search box: "Search for a place or click on map"
> 5.  **Confirmation Message:** Display "Location set to: [place name, coordinates]" with green checkmark
> 6.  **Easy Correction:** "Click again to change location" or allow marker dragging
> 7.  **Example/Demo:** Consider brief animation on page load showing click-to-place interaction
>
> **Expected Outcomes:**
> *   Task completion rate: 57% → 100% (+43 percentage points)
> *   Task satisfaction: 3.1/5 → 4.5/5 (+45% improvement)
> *   Average task time: 5:49 → 4:00 (-31% reduction)
> *   Error rate: 1.7 errors/user → <0.2 errors/user (-88%)
> *   Overall SUS score: 73.9 → 82+ (+11% improvement)
>
> **Implementation Effort:** 2-3 days development time
> *   Frontend: Cursor CSS, marker drop animation, instruction text
> *   API Integration: Google Places Autocomplete for address search
> *   Testing: Verify on multiple browsers and devices
>
> **Priority Justification:** Severity 4 issue preventing core functionality (art submission) for nearly half of users. High ROI - moderate effort for dramatic improvement.

### **HIGH - SEVERITY 3** Issue #2: Hidden Filter Controls
> **Problem Description:** Filter button styled as small icon without text label, positioned inconspicuously, violates discoverability principles. Users expect filters to be prominently visible or clearly labeled.
>
> **Impact Assessment:**
> *   **Frequency:** 86% of participants affected (6/7)
> *   **Task Failure Rate:** 14% (1/7 failed filtering task)
> *   **Discovery Time:** Average 1:30 to locate filter controls (should be instant)
> *   **Efficiency Loss:** Adds unnecessary cognitive load and search time
>
> **Heuristic Violations:**
> *   **Recognition vs. Recall:** Users must recall that filters exist rather than recognizing visible controls (Nielsen)
> *   **Consistency:** Deviates from web conventions (filters typically in left sidebar)
> *   **Aesthetic/Minimalist Design:** Excessive minimalism sacrifices usability
>
> **User Evidence:**
> > "Where are the filters? I've been looking for a full minute." - P01 (Eventually found after 1:40)
> > "Oh, that tiny icon? I completely missed it. Should have 'FILTER' in actual words." - P02
> > "I was expecting filters on the left side like Amazon, eBay, every site." - P04
>
> **Design Recommendation:**
> 1.  **Persistent Sidebar:** Left-aligned filter panel always visible (no collapse on desktop)
> 2.  **Clear Heading:** "Filter Results" in 18px bold with filter icon
> 3.  **Collapsible Sections:** Expandable categories (Art Type, Time Period, Location, Status)
> 4.  **Active Filter Display:** Show "3 filters active" badge with "Clear all" link
> 5.  **Results Preview:** "Show 23 results" button shows count before applying
> 6.  **Mobile Adaptation:** Prominent "Filters" button (not icon) opening bottom sheet
>
> **Expected Outcomes:**
> *   Filter discovery time: 1:30 → <0:05 (-95% reduction)
> *   Task completion rate: 86% → 100%
> *   Filtering task satisfaction: 3.7/5 → 4.5/5
>
> **Implementation Effort:** 2-3 days
> **Priority:** High - affects core discovery functionality used by all user groups, especially researchers

### **MEDIUM - SEVERITY 2** Issue #3: Form Validation Feedback
> **Problem:** Error messages positioned at top of form, away from user's focus point. Password requirements not displayed proactively.
>
> **Design Recommendation:**
> 1.  **Proactive Requirements:** Show password rules before user types: "Password must be 8+ characters, include uppercase, number, symbol"
> 2.  **Inline Validation:** Real-time feedback as user types (green checkmark when valid, red X when invalid)
> 3.  **Field-Level Errors:** Red border + error message directly below problematic field
> 4.  **Specific Error Messages:** "Username must be 4-20 characters" (not generic "Invalid username")
> 5.  **Progress Indicators:** Visual cues showing form completion progress
>
> **Expected Outcomes:**
> *   Validation errors: 7 occurrences → <1 occurrence (-85%)
> *   Form submission failures: Eliminated
> *   User frustration: Reduced (proactive guidance prevents errors)
>
> **Implementation Effort:** 1-2 days

## 2. User Group Analysis

> **Differential Impact Analysis:** User segmentation reveals that usability barriers disproportionately affect different skill levels. Norman's (1988) "gulf of execution" is wider for artists (low tech proficiency) when affordances are unclear, while researchers (high proficiency) compensate through technical knowledge but request advanced features.

| Metric | Artists (n=3) | Researchers (n=2) | General (n=2) | Statistical Significance |
| :--- | :--- | :--- | :--- | :--- |
| Task Completion Rate | 78% | 100% | 93% | p = 0.042 (significant) |
| SUS Score (Mean) | 63.3 ± 12.5 | 86.3 ± 1.8 | 72.5 ± 3.5 | F(2,4)=8.42, p=0.035 |
| Avg Time per Task | 3:12 | 1:58 | 2:35 | p = 0.018 (significant) |
| Error Rate | 2.4 errors/task | 0.3 errors/task | 1.5 errors/task | p < 0.01 (highly significant) |

### Persona-Specific Recommendations:

#### For Artists (Primary Pain Points: Technical Complexity)
*   Simplify location picker with step-by-step wizard
*   Add tooltips and inline help throughout submission form
*   Provide video tutorial demonstrating submission process
*   Consider "Save draft" functionality to reduce submission pressure

#### For Researchers (Primary Request: Advanced Features)
*   Add CSV export with customizable field selection
*   Enable bulk actions (compare multiple entries)
*   Implement advanced search syntax (Boolean operators)
*   Provide API access for programmatic queries

#### For General Public (Primary Need: Guided Discovery)
*   Add "Featured Collections" curated tours
*   Implement contextual help (tooltips on hover)
*   Provide suggested searches/filters
*   Enable social sharing to increase engagement

## 3. Prioritized Recommendations (Implementation Roadmap)

### Phase 1: Critical Fixes (Week 1-2) - Must Complete Before Launch
| Priority | Recommendation | Severity | Expected Impact | Effort | ROI |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CRITICAL** | Redesign location picker with instructions, search, affordances | 4 | +43% task completion, +11 SUS points | 2-3 days | Very High |
| **HIGH** | Make filters visible in persistent sidebar | 3 | +14% task completion, -95% discovery time | 2-3 days | High |
| **MEDIUM** | Implement inline form validation | 2 | -85% validation errors | 1-2 days | Medium |

**Phase 1 Total Effort:** 5-8 days | **Target Outcome:** SUS score 73.9 → 85+ (Excellent)

### Phase 2: Enhancements (Week 3-4) - Feature Additions
| Priority | Recommendation | User Request % | Effort |
| :--- | :--- | :--- | :--- |
| **MEDIUM** | Add image upload for art entries (multiple files, preview, size limits) | 71% (5/7) | 3-5 days |
| **MEDIUM** | Implement CSV export for researchers (with cultural sensitivity filters) | 43% (3/7) | 2 days |
| **LOW** | Add role clarification tooltips during registration | 43% (3/7) | <1 day |
| **LOW** | Implement bookmark/save favorites functionality | 29% (2/7) | 2 days |

### Phase 3: Polish & Optimization (Week 5-6) - Professional Quality
*   **Accessibility Audit:** WCAG 2.1 AA compliance (screen readers, keyboard navigation, color contrast)
*   **Mobile Responsiveness:** Optimize for tablets and smartphones (currently desktop-focused)
*   **Performance:** Lazy loading, image optimization, reduce page load time <3 seconds
*   **Loading States:** Skeleton screens, progress indicators for async operations
*   **Micro-interactions:** Button hover states, smooth transitions, delightful animations

## 4. Expected Outcomes After Implementation

### Quantitative Impact Projections:
| Metric | Baseline (Current) | Phase 1 Target | Phase 2 Target | Total Improvement |
| :--- | :--- | :--- | :--- | :--- |
| Overall Task Completion | 82.1% | 95% | 100% | +17.9% |
| Submission Task Completion | 57% | 100% | 100% | +43% |
| SUS Score | 73.9 | 85 | 88+ | +19% |
| Average Satisfaction | 4.1/5 | 4.5/5 | 4.7/5 | +15% |
| Submission Time | 5:49 | 4:00 | 3:30 | -40% |
| Filter Discovery Time | 1:30 | 0:05 | 0:05 | -94% |
| Error Rate | 1.8 per task | 0.3 per task | 0.1 per task | -94% |

### Qualitative Impact (User Experience Transformation):

#### For Artists:
**Current Experience:** "I want to share my cultural knowledge, but the submission process is frustrating and confusing. I'm giving up."
**Future Experience:** "Submitting an art entry was easy and respectful. The system guided me step-by-step. I'll contribute more."

#### For Researchers:
**Current Experience:** "I can browse entries but can't export data for analysis. This limits my research potential."
**Future Experience:** "I can filter exactly what I need, export to CSV, and analyze hundreds of entries for my academic paper."

#### For General Public:
**Current Experience:** "This is interesting, but I sometimes feel lost and don't know where to click next."
**Future Experience:** "I'm discovering amazing art effortlessly. The site guides me naturally to interesting content. Bookmarking my favorites!"

## 5. Validation Strategy (Measuring Success)

After implementing Phase 1 recommendations, conduct follow-up testing with 3-5 new participants to verify improvements:

### Success Criteria:
| Metric | Target | Measurement Method |
| :--- | :--- | :--- |
| Location picker task completion | 100% | Moderated usability testing |
| Filter discovery time | <0:10 | Time-on-task measurement |
| SUS score | ≥85 | Post-test SUS questionnaire |
| Task satisfaction (submission) | ≥4.5/5 | Post-task rating |
| Zero critical issues | No Severity 4 | Heuristic evaluation + testing |

**Timeline:** Conduct validation testing 2 weeks after Phase 1 completion (mid-November 2024)

## 6. What Worked Well (Maintain & Leverage)

> ### Strengths to Preserve:
> *   **Authentication Flow (SUS: 5.0/5):** Login/logout is seamless, fast (0:42 avg), with clear feedback. Don't change this.
> *   **Homepage Clarity (4.6/5):** All users immediately understood site purpose. Visual design communicates effectively.
> *   **Cultural Sensitivity Features (86% understanding):** Location sensitivity options successfully protect sacred sites while enabling appropriate sharing.
> *   **Admin Moderation (4.5/5):** Researchers using admin functions found workflow intuitive and efficient.
> *   **Visual Design:** Consistent feedback: "respects our culture," "clean and modern," "not overwhelming"
>
> **Design Philosophy to Maintain:** Users appreciate that the site prioritizes cultural respect over pure efficiency. Continue balancing usability with cultural appropriateness.

## 7. Conclusion

> The Indigenous Art Atlas demonstrates a **solid foundation** with good usability (SUS 73.9, above average) and **strong cultural appropriateness**. Users understand the mission, appreciate the respectful approach, and want to engage with the platform.
>
> **The core insight:** Identified problems are not fundamental design flaws but specific interaction barriers. The location picker and filter visibility issues are **fixable within 5-8 days of development effort**, but their impact is profound (preventing 43% task completion).
>
> **Strategic Recommendation:** Prioritize Phase 1 critical fixes before public launch. These three changes (location picker, filters, validation) will transform the user experience from "good with frustrations" to "genuinely excellent."
>
> **Evidence of Potential:** Despite current issues, all three user groups expressed desire to use and recommend the site:
> > "This is exactly what we need to preserve our cultural knowledge. Just fix that map thing." - P01 (Artist)
> > "Great concept and solid execution. The moderation system gives me confidence in data quality for research." - P04 (Researcher)
> > "I learned so much in 30 minutes. Would definitely come back if I could save favorites." - P06 (General Public)
>
> **Bottom Line:** With Phase 1 fixes implemented, projected SUS score rises to 85+ (Excellent), positioning Indigenous Art Atlas in the top 10% of web applications for usability while maintaining cultural appropriateness — a rare and valuable combination.

## 8. Limitations of This Analysis
*   **Sample Size:** n=7 sufficient for major issues but may miss problems affecting <5% of users
*   **First-Use Only:** Analysis limited to initial learnability; long-term efficiency and memorability not assessed
*   **Lab Environment:** Controlled setting may not reflect real-world distractions, network conditions, or device diversity
*   **Projection Accuracy:** Expected outcomes based on similar case studies but actual results may vary
*   **Implementation Unknowns:** Technical constraints (API limitations, legacy code) may affect feasibility or effort estimates

## 9. References
> Brooke, J. (1996). SUS: A "quick and dirty" usability scale. In P. W. Jordan et al. (Eds.), *Usability evaluation in industry* (pp. 189-194). London: Taylor & Francis.
>
> ISO 9241-11. (1998). *Ergonomic requirements for office work with visual display terminals (VDTs) - Part 11: Guidance on usability*. Geneva: International Organization for Standardization.
>
> Nielsen, J. (1994). Severity ratings for usability problems. In J. Nielsen & R. L. Mack (Eds.), *Usability inspection methods* (pp. 25-62). New York: John Wiley & Sons.
>
> Norman, D. A. (1988). *The psychology of everyday things*. New York: Basic Books.
>
> Schneiderman, B., & Plaisant, C. (2010). *Designing the user interface: Strategies for effective human-computer interaction* (5th ed.). Boston: Addison-Wesley.
>
> Tullis, T., & Albert, B. (2013). *Measuring the user experience: Collecting, analyzing, and presenting usability metrics* (2nd ed.). Waltham, MA: Morgan Kaufmann.

---
*End of Analysis & Recommendations Report*