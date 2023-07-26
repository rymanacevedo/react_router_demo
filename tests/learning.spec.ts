import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:3000/main/login?abbrevName=automation_10');
	await page.getByPlaceholder('name@email.com').fill('learner1');
	await page.fill('[name="password"]', 'Welcome!');
	await page.getByRole('button', { name: 'Log in' }).click();
	await page.waitForURL('http://localhost:3000/main/learning');
});

test('is on the dashboard', async ({ page }) => {
	await page.waitForURL('http://localhost:3000/main/learning/PJBRRNAKW');
	await page.waitForSelector('h1');
	const h1Element = page.locator('h1');
	const h1Text = await h1Element.innerText();
	expect(h1Text).toBe('EightQuestionCourse');
});

test('can navigate to a course', async ({ page }) => {
	//    assert that the course is displayed
	await page.goto('http://localhost:3000/main/learning/8R4DRDLYN');
	await page.waitForSelector('h1');
	const h1Element = page.locator('h1');
	const h1Text = await h1Element.innerText();
	expect(h1Text).toBe('Math - Course 1');
});

test('can go to a course, then navigate to a lesson', async ({ page }) => {
	await page.goto('http://localhost:3000/main/learning/2XSHRUSHM');
	await page.waitForSelector('role=list');
	await page.locator('li').nth(1).click();
	await page.waitForSelector('h1');
	const h1Element = page.locator('h1');
	const h1Text = await h1Element.innerText();
	expect(h1Text).toBe('Module: a new module');
});
