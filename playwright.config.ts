import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Aumenta o tempo limite global do teste para 60 segundos devido à lentidão do OrangeHRM */
  timeout: 60000,
  
  expect: {
    /* Tempo máximo para cada asserção (ex: expect(...).toBeVisible()) */
    timeout: 10000,
  },

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'], ['list']],
  
  /* Shared settings for all the projects below. */
  use: {
    /* Base URL simplifies your page.goto() calls */
    baseURL: 'https://opensource-demo.orangehrmlive.com',

    /* Tempo máximo para cada ação (clique, digitar) */
    actionTimeout: 15000,
    
    /* Tempo máximo para navegação de páginas */
    navigationTimeout: 30000,

    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',

    /* Take screenshot on every failure */
    screenshot: 'only-on-failure',

    /* Record video only when a test fails */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});