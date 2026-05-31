import { test, expect } from '@playwright/test'

test.describe('municipality CRUD', () => {
  test.describe.configure({ mode: 'serial' })

  const timestamp = Date.now()
  const name = `Emmeloord-${timestamp}`
  const updatedName = `Emmeloord-${timestamp}-updated`
  const kernelement = `Veiligheid-${timestamp}`

  // TC-002
  test('can create a municipality', async ({ page }) => {
    await page.goto('/cms/municipalities/new')
    await page.getByRole('textbox', { name: 'Naam gemeente *' }).fill(name)

    await page.getByRole('button', { name: '+ Kernelement toevoegen' }).click()
    await page.getByRole('textbox', { name: 'bijv. Veiligheid' }).waitFor()
    await page.getByRole('textbox', { name: 'bijv. Veiligheid' }).fill(kernelement)

    await page.getByRole('button', { name: '+ Mechanisme toevoegen' }).click()
    await page.getByRole('textbox', { name: 'Vul in...' }).nth(0).waitFor()
    await page.getByRole('textbox', { name: 'Vul in...' }).nth(0).fill('Lantaarnpalen')

    await page.getByRole('button', { name: '+ Factor toevoegen' }).click()
    await page.getByRole('textbox', { name: 'Vul in...' }).nth(1).waitFor()
    await page.getByRole('textbox', { name: 'Vul in...' }).nth(1).fill('Verlichting')

    await page.getByRole('button', { name: '+ Factor toevoegen' }).click()
    await page.getByRole('button', { name: '− Min' }).nth(1).click()
    await page.getByRole('textbox', { name: 'Vul in...' }).nth(2).waitFor()
    await page.getByRole('textbox', { name: 'Vul in...' }).nth(2).fill('In de winter is het donker')

    await page.getByRole('button', { name: 'Gemeente aanmaken' }).click()
    await expect(page).not.toHaveURL(/new/, { timeout: 10000 })
    await expect(page.getByRole('heading', { name: name })).toBeVisible()
  })

  // TC-003
    test('can update a municipality', async ({ page }) => {
    await page.goto('/cms/municipalities')
    await page.getByRole('link', { name: name }).click()
    await page.getByRole('button', { name: 'Bewerken' }).click()

    await page.getByRole('textbox').first().fill(updatedName)
    await page.getByRole('button', { name: 'Opslaan' }).click()
    await expect(page.getByText('Opgeslagen!')).toBeVisible()
    })

    // TC-004
  test('can delete a municipality', async ({ page }) => {
    await page.goto('/cms/municipalities')
    await page.getByRole('link', { name: updatedName }).click()
    await page.getByRole('button', { name: 'Bewerken' }).click()

    page.once('dialog', dialog => dialog.accept())
    await page.getByRole('button', { name: 'Verwijder gemeente' }).click()

    await expect(page).toHaveURL(/\/cms\/municipalities$/)
    await expect(page.getByRole('main').locator('span').filter({ hasText: updatedName })).not.toBeVisible()
  })
})