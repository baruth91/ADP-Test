import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RecruitmentPage } from '../pages/RecruitmentPage';

// Ensure tests run in order as they share a data dependency (created candidate)
test.describe.configure({ mode: 'serial' });

test.describe('ADP Technical Assignment - OrangeHRM Automation', () => {
  let loginPage: LoginPage;
  let recruitmentPage: RecruitmentPage;
  let uniqueFirstName: string;

  // Generate a random alphabetic name once for the entire test suite
  test.beforeAll(async () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    uniqueFirstName = Array.from({ length: 8 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  });

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    recruitmentPage = new RecruitmentPage(page);
    
    await test.step('Pre-condition: Login into the system', async () => {
        await loginPage.goto();
        await loginPage.login('Admin', 'admin123');
    });
  });

  test('Test Case 1: Login Validation', async ({ page }) => {
    await test.step('Validate user is redirected to Dashboard', async () => {
        await expect(page).toHaveURL(/dashboard/);
        await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    });
  });

  test('Test Case 2: Recruitment - Create Candidate', async () => {
    await recruitmentPage.goToRecruitment();
    await recruitmentPage.addCandidate(uniqueFirstName, 'Tester', 'test@adp.com');
    
    await test.step('Validate candidate was successfully created with initiated status', async () => {
        const statusText = await recruitmentPage.getApplicationStatus();
        expect(statusText).toContain('Status: Application Initiated');
    });
  });

  test('Test Case 3: Recruitment - Edit Candidate', async ({ page }) => {
    await recruitmentPage.goToRecruitment();
    await recruitmentPage.searchAndEditCandidate(uniqueFirstName);
    
    await test.step('Validate successful update toast message', async () => {
        const toast = page.locator('.oxd-toast-content');
        await expect(toast).toBeVisible();
        await expect(toast).toContainText('Successfully Updated');
    });
  });
});