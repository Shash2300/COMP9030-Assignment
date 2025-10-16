# Usability Test Plan

**Project:** Indigenous Art Atlas - COMP9030 Cycle 4

**Author:** Student ID

**Date:** October 14, 2025

## 1. Testing Objectives

> **Theoretical Framework:** This usability test follows Nielsen's usability principles (Nielsen, 1994) and ISO 9241-11 standards for effectiveness, efficiency, and satisfaction (ISO, 1998). We employ a user-centered design approach to evaluate the Indigenous Art Atlas.

This usability evaluation aims to assess the Indigenous Art Atlas web application across multiple dimensions of usability:

*   **Learnability:** Can first-time users accomplish basic tasks without prior training?
*   **Efficiency:** Once users learn the interface, how quickly can they perform tasks?
*   **Memorability:** Can users return after a period and remember how to use the system?
*   **Error Prevention:** How many errors do users make and can they recover from them?
*   **Satisfaction:** How pleasant is the interface to use?

### Specific Research Questions:

*   **Navigation:** Can users move between sections (home, map, browse, dashboard) without getting lost?
*   **Map Discovery:** Does the interactive map effectively support art discovery and geographic exploration?
*   **Submission Process:** Is creating an account and submitting art entries straightforward for non-technical users?
*   **Cultural Sensitivity:** Do users understand and appropriately use location sensitivity options (exact, general, hidden)?
*   **Admin Moderation:** Can administrators efficiently review and approve/reject submissions?

## 2. Participants

Following Nielsen's recommendation of 5-7 participants for identifying 85% of usability issues (Nielsen, 2000), we will recruit 7 participants across three user personas:

| User Type | Count | Profile | Recruitment Source |
| :--- | :--- | :--- | :--- |
| Indigenous Artists | 3 | Ages 25-65, varying tech skills, want to share artwork and cultural knowledge | Local indigenous community centers, art collectives |
| Academic Researchers | 2 | University researchers, comfortable with tech, need search/filter capabilities | Flinders University humanities department |
| General Public | 2 | Art enthusiasts, average computer skills, want to explore and learn | Community notice boards, social media |

**Total:** 7 participants (exceeds Nielsen's minimum of 5)

### Inclusion Criteria:

*   18 years or older
*   Basic web browser proficiency
*   No prior exposure to Indigenous Art Atlas
*   Willing to participate in think-aloud protocol
*   Available for 60-minute in-person session

### Exclusion Criteria:

*   Project team members or close associates
*   Professional UX designers (different mental models)
*   Participants who tested similar systems in past 30 days

## 3. Test Tasks

Tasks are designed to represent realistic user goals and align with Dumas & Redish's (1999) principles of scenario-based usability testing:

| # | Task | Time Limit | Success Criteria | Heuristic Tested |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Homepage Exploration | 3 min | User understands site purpose and finds main menu | Visibility of system status |
| 2 | Find Rock Art (Map & Filters) | 5 min | Uses map and filters to find specific art type in Northern Territory | User control, flexibility |
| 3 | Create Account | 3 min | Successfully registers with appropriate role selection | Error prevention, clear feedback |
| 4 | Login | 2 min | Logs in successfully and sees confirmation of logged-in state | System status visibility |
| 5 | Submit Art Entry | 7 min | Completes full submission with location, cultural info, and sensitivity settings | Error prevention, help documentation |
| 6 | Check Submission Status | 2 min | Finds own submissions dashboard and identifies approval status | Match system to real world |
| 7 | Admin Review (Admins only) | 4 min | Reviews pending submission and approves/rejects with feedback | Efficiency of use |
| 8 | Advanced Filtering | 3 min | Applies multiple filters (art type + period + status) successfully | Flexibility, efficiency |
| 9 | Logout | 1 min | Logs out and receives clear confirmation | User control and freedom |

## 4. Metrics

We employ both quantitative and qualitative measures following ISO 9241-11 usability framework (Effectiveness, Efficiency, Satisfaction):

### Quantitative Metrics (Effectiveness & Efficiency):

*   **Task Completion Rate:** Percentage of tasks completed successfully without facilitator intervention (Target: ≥80%)
*   **Time on Task:** Duration from task start to successful completion (benchmark against expected times)
*   **Error Count:** Number of incorrect actions, wrong paths, form validation errors per task
*   **Click Efficiency:** Actual clicks vs. optimal path clicks (lower ratio = better efficiency)
*   **System Usability Scale (SUS):** Standardized 10-item questionnaire yielding score 0-100 (Brooke, 1996)
    *   Target: ≥68 (industry average)
    *   Excellent: ≥80

### Qualitative Metrics (Satisfaction):

*   **Task Difficulty Rating:** 5-point Likert scale after each task (1=Very Difficult, 5=Very Easy)
*   **Think-Aloud Protocol:** Verbal expressions of confusion, delight, frustration, expectations
*   **Cultural Appropriateness:** Specific question: "Do you feel the application respectfully handles indigenous cultural information?"
*   **Open-Ended Feedback:** Likes, dislikes, missing features, suggestions for improvement

## 5. Test Procedure (60 minutes per participant)

> **Method:** Moderated usability testing with think-aloud protocol (Ericsson & Simon, 1984)

1.  **Welcome & Consent (5 min):**
    *   Explain study purpose and procedure
    *   Emphasize we're testing the system, not the participant
    *   Obtain informed consent for video/audio recording
    *   Review ethical considerations and right to withdraw
    *   Demonstrate think-aloud protocol with example task
2.  **Background Questionnaire (3-5 min):**
    *   Demographics: Age range, gender (optional)
    *   Technical proficiency: Self-rated computer skills (1-5 scale)
    *   Domain knowledge: Familiarity with indigenous art and culture (1-5 scale)
    *   Prior experience: Similar applications used previously
    *   Expectations: What they expect from an "Indigenous Art Atlas"
3.  **Task Performance (30-40 min):**
    *   Present task scenario cards one at a time
    *   Start timer when participant begins task
    *   Observe and record: navigation path, errors, hesitations, verbal comments
    *   Minimal intervention (only if completely stuck for >2 minutes)
    *   Stop timer upon task completion or abandonment
    *   Brief post-task interview: difficulty rating, confusion points, suggestions
4.  **Post-Test Questionnaire (5-10 min):**
    *   System Usability Scale (SUS) - 10 standard questions
    *   Open-ended questions about overall experience
    *   Cultural sensitivity and appropriateness questions
    *   Feature-specific ratings (map, filters, submission form)
    *   Recommendation likelihood and reasons
5.  **Debrief (2-3 min):**
    *   Thank participant for valuable feedback
    *   Answer any questions about the study or application
    *   Explain how findings will improve the system
    *   Provide contact information for follow-up questions

## 6. Data Collection

### Recording Methods:

*   **Screen Recording:** Morae or OBS Studio capturing all interactions
*   **Audio Recording:** Participant's think-aloud verbalizations
*   **Facilitator Observation Notes:** Structured form capturing:
    *   Task completion status (success/partial/fail)
    *   Time stamps and duration
    *   Error types and frequency
    *   Navigation path taken
    *   Hesitation points (>5 seconds inactive)
    *   Emotional indicators (facial expressions, tone)
    *   Direct quotes and key observations
*   **Questionnaires:** Pre-test, post-task, and post-test surveys

### Data Organization:

*   Individual participant folders: P01_Artist through P07_General
*   Consolidated spreadsheet with all quantitative metrics
*   Thematic analysis of qualitative feedback
*   Video files labeled with participant ID and date

## 7. Ethical Considerations

> **Ethics Framework:** This study adheres to Flinders University Human Research Ethics Committee guidelines and follows principles outlined in the National Statement on Ethical Conduct in Human Research (2007).

*   **Informed Consent:** All participants sign consent form explaining purpose, procedures, risks, and benefits before testing begins
*   **Voluntary Participation:** Participants can withdraw at any time without penalty
*   **Anonymity & Confidentiality:**
    *   Participants assigned anonymous IDs (P01, P02, etc.)
    *   No personally identifiable information in reports or publications
    *   Data stored securely on password-protected devices
    *   Recordings deleted after analysis completion (within 6 months)
*   **Cultural Sensitivity:**
    *   Consultation with indigenous advisors on test scenario appropriateness
    *   Use only publicly available, non-sacred information in test materials
    *   Participants may decline tasks involving culturally inappropriate content
    *   Acknowledgment of indigenous cultural protocols in all materials
*   **Data Security:** Raw data access limited to research team, retention period defined, secure disposal procedures

## 8. Timeline

| Week | Dates | Activities |
| :--- | :--- | :--- |
| Week 11 | Oct 14-20 | Finalize test plan, create materials (task cards, consent forms, questionnaires), recruit 7 participants, pilot test with 1 user |
| Week 12 | Oct 21-27 | Conduct all 7 usability test sessions (1-2 per day), complete observation notes and data entry after each session |
| Week 13 | Oct 28-Nov 3 | Compile results data, analyze findings, identify patterns, write analysis report, prepare presentation materials, submit Monday, Nov 4 at 2pm |

## 9. Limitations and Mitigation Strategies

### Anticipated Limitations:

| Limitation | Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| Small sample size (n=7) | May not capture all edge cases | Diversify participant types; focus on critical tasks; supplement with heuristic evaluation |
| Lab environment ≠ natural context | Reduced ecological validity | Use realistic scenarios; allow exploration; minimize artificial constraints |
| Think-aloud may alter behavior | Slower task times, different strategies | Practice protocol beforehand; note differences; use retrospective probing for difficult tasks |
| Facilitator presence (Hawthorne effect) | Participants may try harder or behave differently | Emphasize we're testing system not them; create comfortable atmosphere; minimize interventions |
| Recruitment bias | May not represent full user diversity | Define clear inclusion criteria; recruit from multiple sources; document participant characteristics |

## 10. Success Criteria

This usability test will be considered successful if we achieve:

*   ✓ Complete testing with all 7 participants across three user groups (3 artists, 2 researchers, 2 general)
*   ✓ Rich qualitative insights through think-aloud protocol (minimum 5 actionable findings per participant)
*   ✓ Complete quantitative data for all tasks (completion rate, time, errors, satisfaction, SUS scores)
*   ✓ Identification of 3-5 prioritized usability issues with severity levels
*   ✓ Validation that ≥80% of users understand cultural sensitivity features appropriately
*   ✓ User group comparison analysis revealing different needs across personas
*   ✓ Actionable recommendations with expected impact and implementation effort

## 11. References

> Brooke, J. (1996). SUS: A "quick and dirty" usability scale. In P. W. Jordan, B. Thomas, B. A. Weerdmeester, & I. L. McClelland (Eds.), *Usability evaluation in industry* (pp. 189-194). London: Taylor & Francis.
>
> Dumas, J. S., & Redish, J. C. (1999). *A practical guide to usability testing*. Exeter, UK: Intellect Books.
>
> Ericsson, K. A., & Simon, H. A. (1984). *Protocol analysis: Verbal reports as data*. Cambridge, MA: MIT Press.
>
> ISO 9241-11. (1998). *Ergonomic requirements for office work with visual display terminals (VDTs) - Part 11: Guidance on usability*. International Organization for Standardization.
>
> National Health and Medical Research Council (NHMRC). (2007). *National Statement on Ethical Conduct in Human Research*. Canberra: Australian Government.
>
> Nielsen, J. (1994). Heuristic evaluation. In J. Nielsen & R. L. Mack (Eds.), *Usability inspection methods* (pp. 25-62). New York: John Wiley & Sons.
>
> Nielsen, J. (2000). Why you only need to test with 5 users. *Nielsen Norman Group*. Retrieved from https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/

---
*End of Usability Test Plan*