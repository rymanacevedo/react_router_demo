import {test} from '@playwright/test';

test.beforeEach(async ({ page }) => {
   await page.goto('http://localhost:3000/main/login?abbrevName=automation_6');
   await page.getByPlaceholder('name@email.com').fill('learner1');
   await page.fill('[name="password"]', 'Welcome!');
   await page.getByRole('button', { name: 'Log in' }).click();
   await page.waitForURL('http://localhost:3000/main/learning');
});


test('can navigate to the review and submit page' , async ({ page }) => {
   await page.goto('http://localhost:3000/main/learning/AHWCREU2G');
   await page.waitForSelector('role=list');
   await page.locator('li').nth(1).click();
   await page.waitForSelector('role=button');
   await page.getByRole('button', { name: 'Finish practice test' }).click();
// assert we are on the submit page
});