import { expect, test } from "./baseFixtures.js";

test.beforeEach(async ({ page }) => {
	await page.goto('login?abbrevName=automation_10');
	await page.getByPlaceholder('name@email.com').fill(process.env.LEARNER_USERNAME || "");
	await page.fill('[name="password"]', process.env.PASSWORD || "");
	await page.getByRole('button', { name: 'Log in' }).click();
	await page.waitForURL('learning');
});

test('is on the dashboard', async ({ page }) => {
	await page.waitForURL('learning/RRJERCMJD');
	await page.waitForSelector('h1');
	const h1Element = page.locator('h1');
	const h1Text = await h1Element.innerText();
	expect(h1Text).toBe('Chemistry');
});

test('can navigate to a course', async ({ page }) => {
	//assert that the course is displayed
	await page.goto('learning/2XSHRUSHM');
	await page.waitForSelector('h1');
	const h1Element = page.locator('h1');
	const h1Text = await h1Element.innerText();
	expect(h1Text).toBe('Math - Course 1 - IRQ');
});

test('can go to a course, then navigate to a lesson', async ({ page }) => {
	await page.goto('learning/2XSHRUSHM');
	await page
		.getByRole('tabpanel', { name: 'All Modules' })
		.getByText('Multiplication', { exact: true })
		.click();
	await page.waitForURL(
		'learning/assignment/EM8JMRN2S/tour',
	);
	const h1Element = page.locator('h1');
	const h1Text = await h1Element.innerText();
	expect(h1Text).toBe('Module: a new module');
});
