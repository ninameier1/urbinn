import { test, expect } from '@playwright/test'

test.describe('publication CRUD', () => {
  test.describe.configure({ mode: 'serial' })

  const timestamp = Date.now()
  const name = `Publicatie-${timestamp}`
  const updatedName = `Publicatie-${timestamp}-updated`
  const author = `Auteur-${timestamp}`
  const description = `Beschrijving-${timestamp}`

// TC-008
  test('TC-008: can create a publication', async ({ page }) => {
    await page.goto('/cms/publications/new')
    await page.getByRole('textbox', { name: 'Titel' }).fill(name)
    await page.getByRole('textbox', { name: 'Auteur(s)' }).fill(author)
    await page.getByRole('textbox', { name: 'Publicatiedatum' }).fill(`2025-04-26`)
    await page.locator('textarea[name="description"]').fill(description)


    await page.getByRole('button', { name: 'Publicatie aanmaken' }).click()

    await expect(page).not.toHaveURL(/new/, { timeout: 10000 })
    await expect(page.getByRole('heading', { name: name })).toBeVisible()
  })

// TC-009
  test('TC-009: can update a publication name', async ({ page }) => {
    await page.goto('/cms/publications')
    await page.getByRole('link').filter({ hasText: name }).click()

    await page.getByRole('button', { name: 'Bewerken' }).click()

    await page.getByRole('textbox').first().fill(updatedName)
    await page.getByRole('button', { name: 'Opslaan' }).click()

    await expect(page.getByText('Opgeslagen!')).toBeVisible()
    await page.reload()
    await expect( page.getByRole('heading', { name: updatedName })).toBeVisible()
  })

// TC-010
  test('TC-010: can delete a publication', async ({ page }) => {
    await page.goto('/cms/publications')
    await page.getByRole('link').filter({ hasText: updatedName }).click()

    await page.getByRole('button', { name: 'Bewerken' }).click()

    page.once('dialog', dialog => dialog.accept())
    await page.getByRole('button', { name: 'Verwijder publicatie' }).click()

    await expect(page).toHaveURL(/\/cms\/publications$/)
    await expect(page.getByRole('main')).toContainText('Publicaties')
    await expect(page.getByRole('main').locator('span').filter({ hasText: updatedName })).not.toBeVisible()
    await expect(page.getByRole('link').filter({ hasText: updatedName })).toHaveCount(0)
  })
})