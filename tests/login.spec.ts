import { expect, test } from '@playwright/test';

test('login', async ({ page }) => {
	await page.goto('http://localhost:3000/main/login');
	const h1Element = page.locator('h1');
	const h1Text = await h1Element.innerText();

	expect(h1Text).toBe('Welcome to Amplifire');
});
