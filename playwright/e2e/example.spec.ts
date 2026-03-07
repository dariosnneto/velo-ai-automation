import { test, expect } from '@playwright/test'


test('web app should be running', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  await expect(page).toHaveTitle(/Velô by Papito/)
})

