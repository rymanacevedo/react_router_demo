import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:3000/main/login?abbrevName=automation_6');
	await page.getByPlaceholder('name@email.com').fill('learner1');
	await page.fill('[name="password"]', 'Welcome!');
	await page.getByRole('button', { name: 'Log in' }).click();
	await page.waitForURL('http://localhost:3000/main/learning');
});

test('can navigate to  timedassesment that is completed and retake it', async ({
	page,
}) => {
	await page.goto('http://localhost:3000/main/learning/V7Q3RMLLU');
	await page.waitForSelector('[role=list]');
	await page.locator('li').nth(0).click();
	await page.getByRole('button', { name: 'Retake Practice Test' }).click();
	await page.waitForSelector('h1');
	await expect(
		page.getByText('Practice Test: TA Module MultiQuestion'),
	).toBeVisible();
});

test('can navigate to the review and submit page', async ({ page }) => {
	await page.goto('http://localhost:3000/main/learning/AHWCREU2G');
	await page.waitForSelector('[role=list]');
	await page.locator('li').nth(1).click();
	await page.waitForURL(
		'http://localhost:3000/main/learning/timedAssessment/f2c0cef1-e4eb-44ae-9dd9-ce3899724194/147824',
	);
	await page.getByRole('button', { name: 'Finish practice test' }).click();
	await page.waitForURL(
		'http://localhost:3000/main/learning/timedAssessment/f2c0cef1-e4eb-44ae-9dd9-ce3899724194/submission',
	);
	await expect(page.getByText('Review & Submit')).toBeVisible();
});

test('can navigate to each question on next question click', async ({
	page,
}) => {
	await page.goto(
		'http://localhost:3000/main/learning/timedAssessment/f2c0cef1-e4eb-44ae-9dd9-ce3899724194/147824',
	);
	await page.getByRole('button', { name: 'Next question' }).click();
	await page.waitForURL(
		'http://localhost:3000/main/learning/timedAssessment/f2c0cef1-e4eb-44ae-9dd9-ce3899724194/147825',
	);
	expect(page.url()).toBe(
		'http://localhost:3000/main/learning/timedAssessment/f2c0cef1-e4eb-44ae-9dd9-ce3899724194/147825',
	);
	await page.getByRole('button', { name: 'Next question' }).click();
	await page.waitForURL(
		'http://localhost:3000/main/learning/timedAssessment/f2c0cef1-e4eb-44ae-9dd9-ce3899724194/147826',
	);
	expect(page.url()).toBe(
		'http://localhost:3000/main/learning/timedAssessment/f2c0cef1-e4eb-44ae-9dd9-ce3899724194/147826',
	);
	await page.getByRole('button', { name: 'Next question' }).click();
	await expect(page.getByText('Review & Submit')).toBeVisible();
});
