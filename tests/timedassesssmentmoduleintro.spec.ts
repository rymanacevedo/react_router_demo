import { test, expect } from '@playwright/test';

test.describe('TimedAssessmentModuleIntro', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(
			'http://localhost:3000/main/login?abbrevName=automation_10',
		);
		await page.getByPlaceholder('name@email.com').fill('learner1');
		await page.fill('[name="password"]', 'Welcome!');
		await page.getByRole('button', { name: 'Log in' }).click();
		await page.waitForURL('http://localhost:3000/main/learning');
	});

	test('Navigate to Practice Test course and show module to start practice test', async ({
		page,
	}) => {
		// Click 'Change Course' button
		const changeCourseButton = await page.waitForSelector(
			'text="Change Course"',
		);
		await changeCourseButton.click();

		// After the button is clicked and the dropdown is opened, click on 'PracticeTest'
		const practiceTestOption = await page.waitForSelector(
			'text="PracticeWithIntro"',
		);

		await practiceTestOption.click();

		await page.waitForSelector('h1');
		const h1Element = page.locator('h1');
		const h1Text = await h1Element.innerText();
		expect(h1Text).toBe('PracticeWithIntro');

		const paragraph = await page.waitForSelector('p:has-text("Display name")');
		await paragraph.click();

		await page.waitForURL(
			'http://localhost:3000/main/learning/timedAssessment/moduleIntro/A9WXMKZRJ',
		);
		expect(page.url()).toBe(
			'http://localhost:3000/main/learning/timedAssessment/moduleIntro/A9WXMKZRJ',
		);

		const button = await page.waitForSelector(
			'button:has-text("Start practice test")',
		);

		expect(button).not.toBeNull();
	});

	test('Go straight into practice test if there is no intro', async ({
		page,
	}) => {
		const changeCourseButton = await page.waitForSelector(
			'text="Change Course"',
		);
		await changeCourseButton.click();

		const practiceTestOption = await page.waitForSelector(
			'text="NoIntroPracticeTest"',
		);

		await practiceTestOption.click();

		await page.waitForSelector('h1');
		const h1Element = page.locator('h1');
		const h1Text = await h1Element.innerText();
		expect(h1Text).toBe('NoIntroPracticeTest');

		const paragraph = await page.waitForSelector(
			'p:has-text("NoIntroPracticeTest")',
		);
		await paragraph.click();

		const button = page.locator('button:has-text("Start practice test")');
		expect(await button.isVisible()).toBe(false);
	});
});
