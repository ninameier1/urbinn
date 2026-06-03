import { test, expect } from '@playwright/test'


// TC-001
test('TC-001: unauthenticated user is redirected to login', async ({ browser }) => {
  const context = await browser.newContext({ storageState: undefined })
  const page = await context.newPage()

  await page.goto('/cms')
  await expect(page).toHaveURL(/login/)

  await context.close()
})

// test if we are simulated as logged in 
test('TC-001: authenticated user can access CMS', async ({ page }) => {
  await page.goto('/cms')
  await expect(page).toHaveURL(/cms/)
  await expect(
    page.getByText(/Welkom/)
  ).toBeVisible()
})