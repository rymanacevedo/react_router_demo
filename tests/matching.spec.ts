import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:3000/main/login?abbrevName=automation_10');
	await page.getByPlaceholder('name@email.com').fill('learner1');
	await page.fill('[name="password"]', 'Welcome!');
	await page.getByRole('button', { name: 'Log in' }).click();
});

test('can select matching course', async ({ page }) => {
	await page.getByRole('button', { name: /change course/i }).click();
	await page.waitForSelector('role=menu');
	await page.locator('button:has-text("Matching Course")').click();
	await page.waitForURL('http://localhost:3000/main/learning/5G5XRE4TJ');
	await page
		.getByRole('listitem')
		.filter({ hasText: 'matching module' })
		.click();

	await page.locator('u:has-text("Skip the tour")').click();
	await page.waitForURL('http://localhost:3000/main/learning/5G5XRE4TJ');
	await page
		.getByRole('listitem')
		.filter({ hasText: 'matching module' })
		.click();
	await page.waitForURL(
		'http://localhost:3000/main/learning/assignment/NPTQM229G',
	);
	const dragHeader = await page.getByRole('heading', {
		name: /drag and match/i,
	});

	const dragText = await dragHeader.innerText();
	expect(dragText).toBe('Drag and Match');
});
