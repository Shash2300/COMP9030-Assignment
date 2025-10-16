# Indigenous Art Atlas - COMP9030 Project

The Indigenous Art Atlas is a community-driven platform dedicated to documenting, preserving, and celebrating Indigenous art across Australia. It provides an interactive map and a browsable collection of art entries, allowing users to discover art and its cultural context. The platform is built with a strong emphasis on cultural sensitivity, enabling the protection of sacred sites through multi-tiered location privacy options.

## Key Features

*   **Interactive Map:** Discover art entries geographically using a Leaflet.js map.
*   **Browse & Filter:** Search and filter the art collection by art type, period, location, or keywords.
*   **User Authentication:** Secure user registration and login system with roles for Artists and General Users.
*   **Art Submission:** A multi-step form allows authenticated users to submit new art entries with detailed information, images, and location data.
*   **User Dashboard:** Users can view the status of their submissions (Pending, Approved, Rejected).
*   **Cultural Sensitivity:** Submissions include options for location sensitivity (Exact, General, Hidden) to protect sacred or private sites.

## Technology Stack

*   **Frontend:** HTML5, CSS3, JavaScript (ES6)
*   **Mapping:** Leaflet.js
*   **Backend:** PHP
*   **Database:** MySQL
*   **Development Environment:** Configured for VS Code Dev Containers / GitHub Codespaces.

---

# COMP9030 Project Assessment

It is your responsibility to read through this content. Explanations of the process and your expectations will be covered during tutorial or practical sessions in the first two weeks of semester. If you need clarification, you must seek guidance early. Approaching the teaching staff with confusion about the *process* just before the due date is not appropriate and will indicate a lack of contribution to the project.

This repository contains all the required information for the COMP9030 major project assignments. This repository will be used for the following assessments:
| Part | Repo Location | Weighting (Group/Individual)| Due Date |
| --- | :--- | :---: | :--- |
| Cycle 1 - UX Design | [c1-c4/cycle1/](c1-c4/cycle1/cycle1.md) | 10% (5%/5%) | Week 5 |
| Cycle 2 - Frontend Prototype | [src/cycle2/](src/cycle2/cycle2.md) | 15% (10%/5%) | Week 8 |
| Cycle 3 - Full-stack Prototype | [src/cycle3/](src/cycle3/cycle3.md) | 20% (10%/10%) | Week 10 |
| Cycle 4 - Usability Evaluation | [c1-c4/cycle4/](c1-c4/cycle4/cycle4.md) | 15% (10%/5%) | Week 13 |

The use of this repository is intended to emulate real world development processes. You will be required to effectively use git commands to add your work and review your peer's work for inclusion in the group project.
> [!CAUTION]
> As soon as you are uncertain, you should seek help from the teaching staff to understand your role and the requirements for the contribution process.

## Setting up the Project Environment

This project requires a web server with PHP and a MySQL database.

1.  **Web Server:** Use a local server environment like XAMPP, MAMP, or the provided Codespaces Dev Container. **The web server's document root should point to the `/src` directory** of this project.
2.  **Database:**
    *   Create a new MySQL database named `indigenous_art_atlas`.
    *   Import the schema and sample data by running the `/src/cycle3/sql/schema-updated.sql` file in your MySQL client.
3.  **Configuration:**
    *   Open `/src/cycle3/config/dbconn.php`.
    *   If you are not using the default MySQL root user with no password, update the `DB_USER` and `DB_PASS` constants with your database credentials.
4.  **Running the Application:**
    *   Once the server is running, navigate to `http://localhost/cycle2/index.html` in your web browser.

## Contents of the Project Repo

The project repo is the location where all of your content for the assignment will be store. You will use git to maintain version control of your development. The project repo contains the following directories:
- **.AI_Images**: *!! no actions needed in this directory !!*. The directory stores images for use in the assignment specs
- **.devcontainer**: *!! no actions needed in this directory !!*. The directory is for the setup of the Codespaces devcontainer. Any modification of this directory and the files within could cause complications in setting up your cloud-based environment.
- **.github**: pull request roster and pull request template
- **c1-c4**: location for final assignment work for UX design and usability evaluation.
    - **cycle1**: Contains the UX design report, user flows, and wireframes.
    - **cycle4**: Contains the usability test plan, results, and analysis report.
- **project-docs**: location for project management documents (drafts, meeting notes, etc.).
- **src**: The application source code. This is the directory the web server should point to.
    - **cycle2**: Contains the frontend prototype (HTML, CSS, JS files).
    - **cycle3**: Contains the backend API (PHP files) and database schema.
        - `api/`: API endpoints for handling requests (e.g., login, register, create/get entries).
        - `config/`: Contains the database connection configuration (`dbconn.php`).
        - `includes/`: Core backend logic for authentication (`auth.php`) and database operations (`art_crud.php`).
        - `sql/`: Contains the database schema files.
    - **inc**: Legacy directory for database connection includes.
    - **sql-exports**: Contains full database dumps, such as `indigenous_art_atlas.sql`.

## Adding content to the project

You will need to effectively contribute to your group and ensure submissions have passed suitable PR reviews before merging into the main submission.

For any inclusion in the project repo, you **MUST** follow the steps below:
1. Ensure your version of the `main` branch is up to date
1. Create a new branch for your addition
1. Edit your addition to the group project
1. Commit and push your branch
1. Submit a pull request
1. Another group member will review your submission and merge your changes.

*Instructions for this process will be covered in the first practical session of the topic.*

This process will show level of contribution, timeliness of contribution, and timeliness of review before merge. Based on these metrics your individual mark for the group mark will be determined.

If the logs show that your work has pull requests assigned at the last minute, your mark will be affected. If the logs show that your review of pull requests is last minute, your mark will be affected. If the logs show that your contribution quality, commit messages, and pull request summaries and reviews are too brief or superficial, your marks will be affected.

Based on the contribution logs there will not be a need for peer evaluation of the project. Logs will be used to quantitatively assess your contribution, while commit and pull request statements will be used to qualitatively support your contribution. Marks will be generated from this analysis.

Once you have completed the required phase of the project, one group member should create a log of the activity on the repo, download a zip of the repo and submit that to the FLO submission box before the due date.

### To export a log and download a zip of your code

1. Make sure you are in the `main` branch
1. Open your Terminal in VS Code (or CodeSpaces)
1. Execute the following command:<br /> `git log --pretty=format:'%h,%an,%ar,%s' > dir1/dir2/aName-log.csv`, <br />
    where dir1/dir2 is the path to your current phase, and aName is the name of the current phase, e.g., `c1/cycle1/c1-log.csv`. This will create a new file `c1-log.csv` in your project repository
1. Commit and push the change to the main branch
1. Go to github.com
2. Select the Code button in your repo
3. Click on the Local tab
4. Click on Download ZIP

## Project and individual marks

This group component will make up *at least half* of the marks for each submission. You will be assigned an individual mark from the group component based on the quantity, quality, and timeliness of contributions identified in the git activity log (commits and PR reviews). The remaining marks will be assigned on an individual basis through an in-class quiz covering the learning requirements for that specific assessment. This process will ensure that your contribution to the group is assessed (quality of the work submitted moderated by logs from the git repo), as well as your individual understanding and application of the concepts covered, through the quizzes.

> [!IMPORTANT]
> There will be no extensions allowed for the quiz session.

You must attend in person. You must have appropriate identification (student card or photo id) available during the quiz session. The quiz will contain questions that directly relate to the content your group completed for each submission.

You are expected to review the due dates for group submission and the corresponding in-class quiz times. No additional notifications, announcements, or reminders will be provided.