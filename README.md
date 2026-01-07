# ADP Brazil Labs - Technical Interview Assignment

This repository contains the solution for the QA Automation technical challenge for ADP Brazil Labs. The project automates critical recruitment workflows on the OrangeHRM platform using industry-standard best practices and the Playwright framework.

## Tech Stack

* **Framework:** Playwright
* **Language:** TypeScript
* **Design Pattern:** Page Object Model (POM)
* **Reporting:** Playwright HTML Reporter
* **CI/CD:** GitHub Actions (configured to run tests on every push)

## Automated Scenarios

1. **Test Case 1: Login Success** - Validates successful authentication and redirection to the Dashboard.
2. **Test Case 2: Recruitment - Create Candidate** - Automates the process of adding a new candidate, selecting a vacancy, and validating the "Application Initiated" status.
3. **Test Case 3: Recruitment - Edit Candidate** - Filters the candidate using autocomplete hints, navigates to the profile, enables edit mode via a toggle switch, and updates the information.

## How to Run the Project

### Prerequisites

* **Node.js** (v18 or higher)
* **npm** (comes with Node.js)

### Setup

1. **Clone the repository:**
git clone [https://github.com/](https://github.com/)[SEU_USUARIO_AQUI]/ADP-TEST.git
cd ADP-TEST
2. **Install dependencies:**
npm install
3. **Install Playwright Browsers:**
npx playwright install

### Execution

* **Run all tests (Headed mode):**
npx playwright test --headed
* **Run tests in UI Mode (interactive):**
npx playwright test --ui

## Viewing Test Results

After running the tests, Playwright automatically generates a detailed HTML report. To view the results, screenshots, and videos of the execution, run:

npx playwright show-report

### What is included in the report:

* **Test Steps**: Clear, human-readable logs of each action performed via test.step.
* **Screenshots**: Automatically captured on any test failure.
* **Videos**: Recordings of the test execution (retained on failure).
* **Trace Viewer**: Deep dive into the test execution for debugging and performance analysis.

## Bug Report & Observations

A dedicated document containing identified bugs, UI/UX observations, and performance analysis of the OrangeHRM platform (such as latency issues and input sanitization risks) can be found in the BUGS.md file.

---

**Developed by:** PHILLIP LANGMAN BARUTH

---