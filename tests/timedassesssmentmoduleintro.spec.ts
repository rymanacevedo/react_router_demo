import { test, expect } from '@playwright/test';

test.describe('TimedAssessmentModuleIntro', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:3000/main/login?abbrevName=automation_6');
		await page.getByPlaceholder('name@email.com').fill('inst');
		await page.fill('[name="password"]', 'Welcome!');
		await page.getByRole('button', { name: 'Log in' }).click();
		await page.waitForURL('http://localhost:3000/main/reporting');
	});

	test('Navigate to Practice Test course and show module to start practice test', async ({
		page,
	}) => {
		await page.goto('http://localhost:3000/main/learning/NY49R6PQW');
		await page.waitForSelector('[role=list]');

		// Click 'Change Course' button
		const changeCourseButton = await page.waitForSelector(
			'text="Change Course"',
		);
		await changeCourseButton.click();

		// After the button is clicked and the dropdown is opened, click on 'PracticeTest'
		const practiceTestOption = await page.waitForSelector(
			'text="TA Simple Course"',
		);

		await practiceTestOption.click();

		await page.waitForSelector('h1');
		const h1Element = page.locator('h1');
		const h1Text = await h1Element.innerText();
		expect(h1Text).toBe('TA Simple Course');
		await page.locator('li').nth(1).click();

		const button = await page.waitForSelector(
			'button:has-text("Start practice test")',
		);

		expect(button).not.toBeNull();
	});

	test('Go straight into practice test if there is no intro', async ({
		page,
	}) => {
		//TODO: add untimed practice test
		await page.goto(
			'http://localhost:3000/main/learning/timedAssessment/f764037d-863e-493e-a9ab-f7afe0d61a55/147824',
		);
		await page.waitForSelector('h1');
		await expect(page.getByText('Finish practice test')).toBeVisible();
	});
});
