import { Page, expect } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    /**
     * Navigates to the OrangeHRM login page
     */
    async goto() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    /**
     * Performs login and waits for dashboard redirection
     * @param user Username string
     * @param pass Password string
     */
    async login(user: string, pass: string) {
        await this.page.getByPlaceholder('Username').fill(user);
        await this.page.getByPlaceholder('Password').fill(pass);
        await this.page.getByRole('button', { name: 'Login' }).click();

        // Wait for URL to contain 'dashboard' using networkidle to ensure stability on slow environments
        await this.page.waitForURL('**/dashboard/**', { waitUntil: 'networkidle' });
    }
}