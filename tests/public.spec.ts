import { test, expect } from '@playwright/test'

test.describe('public website', () => {
  test('TC-014: public municipality overview shows municipalities', async ({ page }) => {
    await page.goto('/gemeenten')
    await expect(page.getByText('Testgemeente')).toBeVisible()
  })

  test('TC-015: public municipality dashboard shows core elements', async ({ page }) => {
    await page.goto('/gemeenten/testgemeente')
    await expect(page.getByText('Veiligheid')).toBeVisible()
  })
})