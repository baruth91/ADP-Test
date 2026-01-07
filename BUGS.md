# Bug Report & Technical Observations

This document details the issues and behaviors identified during the manual and automated testing of the OrangeHRM platform.

## 1. Unexpected Language Change
* **Issue**: The page language occasionally switches automatically without user intervention.
* **Observation**: During script execution, some elements intermittently appeared in a different language, potentially affecting locator consistency (especially for ARIA roles).

## 2. Performance Issues and System Latency
* **Issue**: High latency during page transitions and form submissions (Save/Edit).
* **Impact**: Frequent "Timeouts" during automation.
* **Recommendation**: Implement performance optimizations such as lazy loading, database indexing for recruitment records, and assets compression to improve the Time to Interactive (TTI).

## 3. Candidate Edit Workflow (UX Observation)
* **Issue**: The edit button (pencil icon) is not always directly accessible in the candidates list for certain roles or screen resolutions.
* **Observation**: To perform an update, the user must first click the "View" (eye icon) button. Inside the profile, all fields are read-only until a specific "Edit" toggle switch is manually activated.
* **Note**: While this might be a design choice for data protection, it adds complexity to the user journey and was handled in the Page Object to ensure test stability.