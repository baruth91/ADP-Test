import { test, Page, expect } from '@playwright/test';

export class RecruitmentPage {
    constructor(private page: Page) {}

    /**
     * Navigates to the Recruitment main module
     */
    async goToRecruitment() {
        await this.page.getByRole('link', { name: 'Recruitment' }).click();
    }

    /**
     * Fills the candidate registration form
     */
    async addCandidate(firstName: string, lastName: string, email: string) {
        await test.step('Fill candidate registration form', async () => {
            await this.page.getByRole('button', { name: 'Add' }).click();
            await this.page.getByPlaceholder('First Name').fill(firstName);
            await this.page.getByPlaceholder('Last Name').fill(lastName);

            // Mandatory field: Vacancy Selection
            await this.page.locator('.oxd-select-text').click();
            await this.page.getByRole('option').nth(1).click();

            await this.page.locator('form input[placeholder="Type here"]').first().fill(email);
            await this.page.getByRole('button', { name: 'Save' }).click();
        });
    }

    /**
     * Filters, views, and edits a candidate profile
     */
    async searchAndEditCandidate(firstName: string) {
        await test.step('Search for candidate in the list', async () => {
            await this.page.getByRole('link', { name: 'Candidates' }).click();
            const nameInput = this.page.getByPlaceholder('Type for hints...');
            await nameInput.fill(firstName);
            
            // Select from autocomplete list to avoid validation errors
            await this.page.getByRole('option', { name: firstName }).first().click();
            await this.page.getByRole('button', { name: 'Search' }).click();
        });

        await test.step('Open candidate profile and enable edit mode', async () => {
            const viewButton = this.page.locator('.oxd-table-cell-actions >> i.bi-eye-fill').first();
            await viewButton.scrollIntoViewIfNeeded();
            await viewButton.click();

            // Toggle the edit switch to enable form fields
            await this.page.locator('.oxd-switch-wrapper').click();
        });

        await test.step('Update first name and save changes', async () => {
            const firstNameInput = this.page.getByPlaceholder('First Name');
            await firstNameInput.clear();
            await firstNameInput.fill(`${firstName}Updated`);
            await this.page.getByRole('button', { name: 'Save' }).click();
        });
    }

    /**
     * Retrieves the recruitment status text
     */
    async getApplicationStatus() {
        const statusLocator = this.page.locator('.orangehrm-recruitment-status');
        await statusLocator.waitFor({ state: 'visible' });
        return await statusLocator.innerText();
    }
}