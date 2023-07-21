import {test} from "@playwright/test";

test.beforeEach(async ({ page }) => {
   await page.goto('http://localhost:3000/main/login?abbrevName=automation_6');
   await page.getByPlaceholder('name@email.com').fill('learner1');
   await page.fill('[name="password"]', 'Welcome!');
   await page.getByRole('button', { name: 'Log in' }).click();
});

test.afterEach(async ({ page }) => {
   await page.goto('http://localhost:3000/main/logout');
});


test('is on the dashboard', async ({ page }) => {
   await page.waitForURL('http://localhost:3000/main/learning');
});
