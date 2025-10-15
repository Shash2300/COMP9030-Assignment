# Usability Test Plan
## Indigenous Art Atlas - COMP9030 Cycle 4

---

## 1. What We're Testing and Why

This usability test aims to find out how well the Indigenous Art Atlas actually works for real people. We want to see if users can easily navigate the site, find what they're looking for, and submit their own art entries without getting frustrated or confused.

### Main Things We Want to Learn

**Can people find their way around?**
We need to see if users can move between different sections like the homepage, map, and submission forms without getting lost. Navigation should feel natural and intuitive.

**Does the map work well for discovering art?**
The interactive map is a core feature, so we want to know if people can actually use it to find indigenous art in specific regions and filter results effectively.

**Is submitting an art entry straightforward?**
We'll watch users go through the entire process of creating an account, logging in, and submitting an art entry. This will show us where they get stuck or confused.

**Do people understand the cultural sensitivity features?**
Since we're dealing with indigenous cultural information, it's important that users understand why we have location sensitivity options (exact, general, or hidden) and what they mean.

**Does the admin moderation work?**
For users with admin access, we need to test if they can easily review and approve or reject submissions.

### Other Important Things

Beyond the main features, we also want to notice:
- Any parts of the interface that confuse people
- Whether the words and labels we use make sense
- If the site looks good and feels responsive
- Features people expected to find but couldn't
- How well error messages and validation work

---

## 2. Who We're Testing With

The Indigenous Art Atlas is designed for three different types of people, so we need to test with all three groups to get a complete picture:

### Indigenous Artists (3 people)
These are folks who want to share their artwork or cultural knowledge on the platform. They might be anywhere from their mid-20s to retirement age, and they don't necessarily need to be tech-savvy. We'll recruit them through local indigenous community centers and art groups.

What they care about: Being able to easily share their art and stories while maintaining control over sensitive cultural information.

### Academic Researchers (2 people)
These are university researchers or people working in cultural heritage who want to study and document indigenous art. They're usually pretty comfortable with technology and are looking for ways to search, filter, and gather information.

What they care about: Finding specific types of art, filtering by region or time period, and accessing detailed cultural information.

### General Public / Art Enthusiasts (2 people)
These are everyday people who are interested in learning about indigenous art. They might be art students, museum visitors, or just curious individuals. They have average computer skills and want to explore without feeling overwhelmed.

What they care about: Discovering interesting art, learning about different cultures, and having an enjoyable browsing experience.

### Testing 7 People Total

This gives us enough variety to spot patterns. If five out of seven people struggle with the same thing, we know it's a real problem, not just one person's confusion.

### Who Can Participate
- Over 18 years old
- Can use a web browser comfortably
- Haven't seen the Indigenous Art Atlas before
- Willing to be honest about what works and what doesn't

### Who We Can't Test
- Anyone on the project team or their friends (they already know too much)
- Professional UX designers (they look at things differently than regular users)
- People who just tested a similar app recently (might confuse the experiences)

---

## 3. What We'll Ask People to Do

We'll give participants realistic scenarios and watch how they handle them. Each task is something a real user might actually want to do on the site.

### Task 1: First Impressions (2-3 minutes)
**The Scenario**: "You've heard about a new website that showcases Indigenous Australian art. You want to check it out and see what it's all about."

We'll just let them explore the homepage naturally and see what catches their attention. After a couple of minutes, we'll ask them what they think the site does.

**What success looks like**:
- They get the general idea of what the site is for
- They can find the main menu or navigation
- They seem to understand the different features available

---

### Task 2: Finding Specific Art (3-5 minutes)
**The Scenario**: "You're interested in rock art from the Northern Territory. See if you can find some examples on the site."

This tests whether the map and filters actually work the way people expect. We'll watch how they try to narrow down the results.

**What success looks like**:
- They figure out where the map is
- They can use the filters to show only rock art
- They click on something to see more details
- They don't take forever or give up

---

### Task 3: Creating an Account (2-3 minutes)
**The Scenario**: "You have your own knowledge about indigenous art that you'd like to share on this site. First, you'll need to create an account."

Registration is often where people drop off, so we need to see if ours is straightforward or frustrating.

**What success looks like**:
- They find the sign-up page without hunting for it
- They understand what information is required and why
- They get what the different user roles (artist vs researcher) mean
- Registration actually works without errors

---

### Task 4: Logging In (1-2 minutes)
**The Scenario**: "Now that you have an account, go ahead and log in."

This should be quick and easy. If it's not, something's wrong.

**What success looks like**:
- They find where to log in
- The login process works smoothly
- They can tell they're logged in (something on the page shows this)

---

### Task 5: Submitting Art Information (5-7 minutes)
**The Scenario**: "You know about a bark painting from Arnhem Land. Let's try adding it to the atlas. Here are the details to enter:
- Title: Bark Painting from Arnhem Land
- Type: Bark Painting
- Period: Historical
- Location: Arnhem Land, NT (approximate area)
- Description: Traditional bark painting depicting ancestral stories
- Indigenous Group: Yolŋu
- Location Sensitivity: General (not the exact spot)"

This is the most complex task, so we're paying close attention to where people hesitate or make mistakes.

**What success looks like**:
- They find the submission form
- They understand what each field is asking for
- The map location picker makes sense to them
- They get why we have location sensitivity options
- The form catches any mistakes they make
- They get some kind of confirmation that it worked

---

### Task 6: Checking on Their Submission (1-2 minutes)
**The Scenario**: "You've submitted your entry. Now check to see if it's been approved yet or if it's still waiting for review."

**What success looks like**:
- They know where to look for their own submissions
- They can see the status (pending, approved, or rejected)

---

### Task 7: Admin Review (Admin Users Only) (3-4 minutes)
**The Scenario**: "You're a moderator for the site. There's a pending submission that needs review. Go ahead and approve or reject it with a quick note."

**What success looks like**:
- They can find the admin area
- They can review the submission details
- The approve/reject process is clear
- They get confirmation that their action went through

---

### Task 8: Advanced Filtering (2-3 minutes)
**The Scenario**: "You're looking for contemporary sculptures that have already been approved. Try finding those."

**What success looks like**:
- They find the filter options
- They can apply multiple filters at once
- The results actually update to match what they filtered

---

### Task 9: Logging Out (1 minute)
**The Scenario**: "You're done for now. Go ahead and log out."

This should be super simple, but you'd be surprised how often logout buttons are hidden or unclear.

**What success looks like**:
- They find the logout button
- Logging out works
- They can tell they're logged out now

---

## 4. How We'll Measure Success

### The Numbers Side

**Can people actually complete the tasks?**
We'll track how many tasks each person finishes successfully without us having to step in and help. If less than 80% of tasks get completed, we've got problems.

**How long does it take?**
We'll time each task. If someone's spending 10 minutes trying to log in, that's a clear sign something's not right. Here's what we're aiming for:
  - First impressions: 3 minutes max
  - Finding art on the map: 5 minutes max
  - Creating account: 3 minutes max
  - Logging in: 2 minutes max
  - Submitting art entry: 7 minutes max
  - Checking submission status: 2 minutes max
  - Admin review: 4 minutes max
  - Using filters: 3 minutes max
  - Logging out: 1 minute max

**How many mistakes happen?**
We'll count things like clicking the wrong button, getting form errors, or going down the wrong path. If people are making more than a couple of mistakes per task, the interface probably isn't clear enough.

**How many clicks does it take?**
Sometimes people get where they need to go, but it takes way more clicks than it should. We'll compare the path they actually took versus the simplest way to do it.

### The Human Experience Side

**How did it feel?**
After each task, we'll simply ask: "How easy was that?" on a scale of 1-5 (1 = very difficult, 5 = very easy). We're hoping for mostly 4s and 5s. If people are saying 2 or 3, we need to know why.

**Overall usability score**
At the end, participants will answer 10 standard questions that give us a usability score from 0-100. Things like:
- Would you use this regularly?
- Did it feel too complicated?
- Was it easy to use?
- Did everything work together well?
- Would you need tech support to use it?

The average website scores around 68. We want to beat that.

**Do people get the cultural sensitivity stuff?**
This is important. We'll specifically ask: "Did you understand why we have the location sensitivity options (Exact, General, Hidden)?"

If 80% of people don't get it, we need to explain it better. These options exist to protect sacred sites, so it's crucial that users understand them.

---

## 5. How We'll Run the Test Sessions

### Getting Ready (15 minutes before each person arrives)

Make sure everything's set up:
- Computer with a clean browser (Chrome, Firefox, or Safari)
- Screen recording software ready to go (with participant's permission)
- Audio recording for when they think aloud
- All the forms printed out and ready
- The website has some sample art entries in it already
- Fresh browser with no old data

### The Actual Test Session (about an hour per person)

**Step 1: Welcome and Getting Comfortable (5 minutes)**
We'll start by making the participant feel at ease. Explain that we're testing the website, not them, so there are no wrong answers. If they get confused or stuck, that's exactly what we need to know. We'll ask them to think out loud as they work so we can understand their thought process.

Get them to sign the consent form and make sure they're okay with being recorded.

**Step 2: Quick Background Questions (3-5 minutes)**
Before they start, we'll ask a few quick questions:
- What's their age range?
- How comfortable are they with computers?
- How much do they know about indigenous art?
- Have they used similar websites before?

This helps us understand their perspective when we analyze the results later.

**Step 3: The Tasks (30-40 minutes)**
This is the main part. For each task:
- Give them the scenario card
- Start the timer
- Watch them work and take notes (where do they hesitate? what do they click? what do they say?)
- Only help if they're completely stuck
- Stop the timer when they finish or give up
- Ask: "How easy was that?" (1-5)
- Quick chat about what was confusing

We're watching for where they struggle, what they say out loud, and how long things take.

**Step 4: Final Questions (5-10 minutes)**
Once they've finished all the tasks, we'll have them fill out the usability questionnaire with 10 standard questions. Then we'll ask some open-ended questions about what they liked, what frustrated them, and what's missing.

**Step 5: Wrap Up (2-3 minutes)**
Thank them for their time, answer any questions they have, and explain how we'll use their feedback to improve the site.

### After They Leave (15 minutes)
Immediately save all the recordings, finish up the notes while everything's still fresh, and calculate the basic stats. If we spotted any critical problems, we'll note them down right away.

---

## 6. Questionnaire and Interview Script

### Pre-Test Questionnaire

**Demographic Information**
1. Age range: ☐ 18-24  ☐ 25-34  ☐ 35-44  ☐ 45-54  ☐ 55-64  ☐ 65+
2. Gender (optional): _______________
3. Occupation: _______________

**Technical Background**
4. How would you rate your overall computer proficiency?
   - ☐ 1 - Beginner (minimal experience)
   - ☐ 2 - Below Average
   - ☐ 3 - Average
   - ☐ 4 - Above Average
   - ☐ 5 - Expert (very experienced)

5. How often do you use web applications?
   - ☐ Daily
   - ☐ Several times per week
   - ☐ Weekly
   - ☐ Monthly
   - ☐ Rarely

**Domain Knowledge**
6. How familiar are you with Australian Indigenous art and culture?
   - ☐ 1 - Not familiar at all
   - ☐ 2 - Slightly familiar
   - ☐ 3 - Moderately familiar
   - ☐ 4 - Very familiar
   - ☐ 5 - Expert (work/study in this area)

7. Have you used similar art atlas, mapping, or cultural heritage applications before?
   - ☐ Yes (please specify): _______________
   - ☐ No

**Expectations**
8. What would you expect from a website called "Indigenous Art Atlas"?
   _________________________________________________________________

---

### Post-Task Interview Questions

After each significant task, ask:
1. "What was your first thought when you saw this page/feature?"
2. "Was anything unclear or confusing?"
3. "What would you change about this feature?"

---

### Post-Test Questionnaire

#### System Usability Scale (SUS)
For each statement, rate your agreement on a scale of 1-5:
(1 = Strongly Disagree, 5 = Strongly Agree)

1. I think that I would like to use this system frequently. [1] [2] [3] [4] [5]
2. I found the system unnecessarily complex. [1] [2] [3] [4] [5]
3. I thought the system was easy to use. [1] [2] [3] [4] [5]
4. I think that I would need the support of a technical person to be able to use this system. [1] [2] [3] [4] [5]
5. I found the various functions in this system were well integrated. [1] [2] [3] [4] [5]
6. I thought there was too much inconsistency in this system. [1] [2] [3] [4] [5]
7. I would imagine that most people would learn to use this system very quickly. [1] [2] [3] [4] [5]
8. I found the system very cumbersome to use. [1] [2] [3] [4] [5]
9. I felt very confident using the system. [1] [2] [3] [4] [5]
10. I needed to learn a lot of things before I could get going with this system. [1] [2] [3] [4] [5]

#### Open-Ended Questions

**Overall Experience**
11. What did you like most about the Indigenous Art Atlas?
    _________________________________________________________________
    _________________________________________________________________

12. What frustrated you the most while using the application?
    _________________________________________________________________
    _________________________________________________________________

13. Was there anything missing that you expected to find?
    _________________________________________________________________
    _________________________________________________________________

**Cultural Sensitivity**
14. Did you understand the purpose of the "Location Sensitivity" options (Exact, General, Hidden)?
    - ☐ Yes, completely
    - ☐ Somewhat
    - ☐ Not really
    - ☐ Not at all

15. Do you feel the application respectfully handles indigenous cultural information?
    - ☐ Yes, definitely
    - ☐ Mostly yes
    - ☐ Unsure
    - ☐ No
    - Please explain: _________________________________________________

**Visual Design**
16. How would you rate the visual design and appearance of the site?
    - ☐ 1 - Very Poor
    - ☐ 2 - Poor
    - ☐ 3 - Acceptable
    - ☐ 4 - Good
    - ☐ 5 - Excellent

**Specific Features**
17. How easy was it to use the interactive map feature?
    [1 - Very Difficult] [2] [3] [4] [5 - Very Easy]

18. How clear was the art entry submission form?
    [1 - Very Unclear] [2] [3] [4] [5 - Very Clear]

19. How effective were the search and filter options?
    [1 - Not Effective] [2] [3] [4] [5 - Very Effective]

**Improvements**
20. If you could change one thing about this application, what would it be?
    _________________________________________________________________
    _________________________________________________________________

21. Would you recommend this site to others interested in Indigenous art?
    - ☐ Definitely yes
    - ☐ Probably yes
    - ☐ Unsure
    - ☐ Probably not
    - ☐ Definitely not
    - Why or why not? _______________________________________________

22. Any additional comments or suggestions?
    _________________________________________________________________
    _________________________________________________________________
    _________________________________________________________________

---

## 7. Potential Challenges and Mitigation Strategies

### Challenge 1: Participant Recruitment
**Risk**: Difficulty finding indigenous artists willing to participate
**Mitigation**:
- Partner with local indigenous community organizations
- Offer appropriate compensation/acknowledgment
- Ensure cultural sensitivity in recruitment materials
- Allow remote testing options if travel is a barrier

### Challenge 2: Technical Issues During Testing
**Risk**: Application bugs or server downtime during test sessions
**Mitigation**:
- Thoroughly test application before each session
- Have backup test environment ready
- Prepare alternative tasks if certain features fail
- Reschedule participant if critical features are unavailable

### Challenge 3: Participant Hesitation with Think-Aloud Protocol
**Risk**: Participants may be quiet or uncomfortable verbalizing thoughts
**Mitigation**:
- Demonstrate think-aloud with example task
- Gently prompt with "What are you thinking?" if silent for >30 seconds
- Create comfortable, non-judgmental environment
- Emphasize that all feedback is valuable

### Challenge 4: Cultural Sensitivity Concerns
**Risk**: Test scenarios may not appropriately respect cultural protocols
**Mitigation**:
- Consult with indigenous advisors when designing test tasks
- Use only public, non-sacred information in test scenarios
- Brief participants about respectful information handling
- Allow participants to decline tasks they find inappropriate

### Challenge 5: Time Constraints
**Risk**: Sessions running longer than anticipated
**Mitigation**:
- Build 15-minute buffer into schedule
- Prioritize critical tasks if time is limited
- Have shortened version of questionnaire prepared
- Offer option to complete post-test survey online later

---

## 8. Data Collection and Recording

### Observation Methods

#### Direct Observation Notes
Facilitator will record:
- Task completion status (success/fail/abandoned)
- Time on task (using stopwatch)
- Number and type of errors
- Navigation path taken
- Hesitation points (>5 seconds without action)
- Verbal comments and questions
- Facial expressions indicating confusion/frustration/delight

#### Screen and Audio Recording
- Screen capture software (OBS Studio or equivalent)
- Audio recording of think-aloud protocol
- Recordings will be labeled: `P[number]_[UserType]_[Date].mp4`
- Example: `P01_Artist_2024-10-20.mp4`

#### Photography (with consent)
- Photos of observation notes and completed questionnaires
- No identifying photos of participants (to maintain anonymity)

### Data Organization

#### File Structure
```
cycle4/
├── test-results/
│   ├── participant-01/
│   │   ├── P01_recording.mp4
│   │   ├── P01_observation-notes.pdf
│   │   ├── P01_pre-test-questionnaire.pdf
│   │   ├── P01_post-test-questionnaire.pdf
│   │   └── P01_task-data.csv
│   ├── participant-02/
│   └── ...
├── data-summary/
│   ├── task-completion-rates.csv
│   ├── time-on-task.csv
│   ├── error-counts.csv
│   └── sus-scores.csv
└── analysis-report/
```

#### Data Spreadsheet (Master)
Create consolidated spreadsheet with columns:
- Participant ID
- User Type (Artist/Researcher/General)
- Age Range
- Technical Proficiency
- Task Number
- Task Name
- Completion Status (Success/Fail/Assisted)
- Time (seconds)
- Error Count
- Satisfaction Rating (1-5)
- SUS Score
- Key Observations

---

## 9. Ethical Considerations

### Informed Consent
- All participants will sign consent form before testing
- Explain how data will be used (academic assessment only)
- Clarify that participation is voluntary and can be withdrawn at any time
- Obtain explicit permission for video/audio recording

### Anonymity and Privacy
- Participant data will be anonymized (assigned P01, P02, etc.)
- No personally identifiable information in reports
- Recordings stored securely and deleted after analysis
- Raw data access limited to project team only

### Cultural Sensitivity
- Acknowledge indigenous cultural protocols in testing materials
- Use only publicly available, non-sacred information in test scenarios
- Allow participants to decline tasks involving cultural content
- Seek guidance from indigenous advisors on appropriate test design

### Data Security
- All data stored on password-protected devices
- No data shared with third parties
- Data retained only as long as required for assessment
- Follow Flinders University data management policies

---

## 10. Timeline and Schedule

### Week 11 (Current Week)
- **Day 1-2**: Finalize test plan and get feedback
- **Day 3-4**: Create test materials (task cards, questionnaires, consent forms)
- **Day 5-7**: Recruit participants and schedule sessions

### Week 12 (Testing Week)
- **Monday-Friday**: Conduct 7 usability test sessions (1-2 per day)
- **Each Day**: Complete observation notes and data entry immediately after each session

### Week 13 (Analysis and Submission)
- **Day 1-2**: Compile all test results data
- **Day 3-4**: Analyze findings and identify patterns
- **Day 5-6**: Write usability analysis and recommendations report
- **Day 7**: Prepare oral presentation materials
- **Monday 2pm**: Submit all deliverables

---

## 11. Success Criteria for the Test Plan

This usability test will be considered successful if:

1. **Sufficient Data Collection**: Complete testing with all 7 participants across three user groups
2. **Rich Qualitative Insights**: Gather detailed feedback on usability issues through think-aloud protocol
3. **Quantitative Benchmarks**: Collect complete metrics data (completion rates, time, errors, SUS) for all tasks
4. **Actionable Findings**: Identify specific, prioritized usability issues that can inform design improvements
5. **Cultural Validation**: Confirm that cultural sensitivity features are understood and appropriate
6. **User Group Comparison**: Analyze differences in usability across artist, researcher, and general user groups

---

## Appendix A: Task Scenario Cards (For Printing)

### Task 1 Card
```
TASK 1: Homepage Exploration

You've heard about a new website that showcases
Indigenous Australian art. You want to explore what
the site offers.

1. Navigate to the homepage
2. Explore the main sections available
3. Describe what you think the website's purpose is

Think aloud as you explore!
```

### Task 2 Card
```
TASK 2: Art Discovery via Map

You're interested in finding rock art in the
Northern Territory region.

1. Use the interactive map to locate art entries
   in the Northern Territory
2. Apply filters to show only "Rock Art" entries
3. Select one art entry and view its detailed information

Think aloud as you work!
```

### Task 3 Card
```
TASK 3: User Registration

You'd like to contribute your own knowledge about
indigenous art to the atlas. First, you need to
create an account.

1. Create a new user account on the website
2. Choose the "Artist" role
3. Complete the registration process

Think aloud as you proceed!
```

[Additional task cards follow same format...]

---

## Appendix B: Observation Notes Template

**Participant**: P____
**User Type**: ☐ Artist  ☐ Researcher  ☐ General
**Date**: __________
**Time**: __________
**Facilitator**: __________

### Task 1: Homepage Exploration
- **Start Time**: _______  **End Time**: _______  **Duration**: _______
- **Completion**: ☐ Success  ☐ Fail  ☐ Assisted
- **Errors**: _______
- **Satisfaction (1-5)**: _______
- **Observations**:
  _________________________________________________________________
  _________________________________________________________________

[Repeat for all tasks...]

### General Observations
- **Overall Confidence Level**: ☐ Very Low  ☐ Low  ☐ Medium  ☐ High  ☐ Very High
- **Most Difficult Task**: _______
- **Most Successful Task**: _______
- **Critical Issues Noted**:
  _________________________________________________________________
- **Positive Highlights**:
  _________________________________________________________________

---

## Appendix C: Consent Form Template

### Usability Testing Consent Form
**Indigenous Art Atlas - COMP9030 Project**

I agree to participate in a usability test for the Indigenous Art Atlas web application. I understand that:

- The session will last approximately 60 minutes
- My interactions with the website will be observed and recorded (screen and audio)
- The purpose is to evaluate the website's usability for academic assessment
- My participation is voluntary and I may withdraw at any time
- My data will be anonymized and kept confidential
- Recordings will be used for analysis only and deleted after project completion
- No personally identifiable information will be included in reports

**Participant Name**: _____________________________
**Signature**: ____________________  **Date**: __________

**Researcher Name**: _____________________________
**Signature**: ____________________  **Date**: __________

---

**End of Usability Test Plan**
