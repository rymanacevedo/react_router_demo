import { expect, test } from "./baseFixtures.js";

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
		await page.waitForSelector('h1');
		const h1Element = page.locator('h1');
		const h1Text = await h1Element.innerText();
		expect(h1Text).toBe('TA Simple Course');
		await page
			.getByRole('tabpanel', { name: 'All Modules' })
			.getByText('TA Simple Module', { exact: true })
			.click();

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
