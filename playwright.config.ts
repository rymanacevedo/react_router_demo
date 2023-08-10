import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";
dotenv.config();

const environment = process.env.TEST_ENV || 'local';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  outputDir: 'test-results',
  retries: process.env.CI ? 0 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: environment === 'stage' ? process.env.STAGE_URL : process.env.LOCAL_URL,
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
