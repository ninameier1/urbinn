import { test, expect } from '@playwright/test'

test.describe('partner CRUD', () => {
  test.describe.configure({ mode: 'serial' })

  const timestamp = Date.now()
  const name = `Partner-${timestamp}`
  const updatedName = `Partner-${timestamp}-updated`
  const website = `testpartner.com`
  const description = `Beschrijving-${timestamp}`
  const info = `Info-${timestamp}`
  const role = `Rol-${timestamp}`

// TC-011
  test('can create a partner', async ({ page }) => {
    await page.goto('/cms/partners/new')
    await page.locator('input[name="name"]').fill(name)
    await page.locator('input[name="website"]').fill(website)

    await page.locator('textarea[name="description"]').fill(description)
    await page.locator('textarea[name="partnerInfo"]').fill(info)
    await page.locator('textarea[name="researchRole"]').fill(role)

    await page.getByRole('button', { name: 'Partner aanmaken' }).click()

    await expect(page).not.toHaveURL(/new/, { timeout: 10000 })
    await expect(page.getByRole('heading', { name: name })).toBeVisible()
  })

// TC-012
  test('can update a partner name', async ({ page }) => {
    await page.goto('/cms/partners')
    await page.getByRole('link').filter({ hasText: name }).click()

    await page.getByRole('button', { name: 'Bewerken' }).click()

    await page.getByRole('textbox').first().fill(updatedName)
    await page.getByRole('button', { name: 'Opslaan' }).click()

    await expect(page.getByText('Opgeslagen!')).toBeVisible()
    await page.reload()
    await expect( page.getByRole('heading', { name: updatedName })).toBeVisible()
  })

// TC-013
  test('can delete a partner', async ({ page }) => {
    await page.goto('/cms/partners')
    await page.getByRole('link').filter({ hasText: updatedName }).click()

    await page.getByRole('button', { name: 'Bewerken' }).click()

    page.once('dialog', dialog => dialog.accept())
    await page.getByRole('button', { name: 'Verwijder' }).click()

    await expect(page).toHaveURL(/\/cms\/partners$/)
    await expect(page.getByRole('main')).toContainText('Partners')
    await expect(page.getByRole('main').locator('span').filter({ hasText: updatedName })).not.toBeVisible()
    await expect(page.getByRole('link').filter({ hasText: updatedName })).toHaveCount(0)
  })
})
