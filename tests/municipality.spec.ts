import { test, expect } from '@playwright/test'

test.describe('municipality CRUD', () => {
  test.describe.configure({ mode: 'serial' })

  const timestamp = Date.now()
  const name = `Emmeloord-${timestamp}`
  const updatedName = `Emmeloord-${timestamp}-updated`

  const coreElement = `Veiligheid-${timestamp}`
  const updatedCoreElement = `${coreElement}-updated`

  const mechanism = `Straatverlichting-${timestamp}`
  const updatedMechanism = `${mechanism}-updated`

  const factor = `Lantaarnpalen-${timestamp}`
  const factormin = `Ledlampen-${timestamp}`
  const updatedFactor = `${factor}-updated`

// TC-002
  test('TC-002: can create a municipality', async ({ page }) => {
    await page.goto('/cms/municipalities/new')
    await page.getByRole('textbox', { name: 'Naam gemeente *' }).fill(name)

    await page.getByRole('button', { name: '+ Kernelement toevoegen' }).click()
    await page.getByRole('textbox', { name: 'bijv. Veiligheid' }).waitFor()
    await page.getByRole('textbox', { name: 'bijv. Veiligheid' }).fill(coreElement)

    await page.getByRole('button', { name: '+ Mechanisme toevoegen' }).click()
    await page.getByRole('textbox', { name: 'Vul in...' }).nth(0).waitFor()
    await page.getByRole('textbox', { name: 'Vul in...' }).nth(0).fill(mechanism)

    await page.getByRole('button', { name: '+ Factor toevoegen' }).click()
    await page.getByRole('textbox', { name: 'Vul in...' }).nth(1).waitFor()
    await page.getByRole('textbox', { name: 'Vul in...' }).nth(1).fill(factor)

    await page.getByRole('button', { name: '+ Factor toevoegen' }).click()
    await page.getByRole('button', { name: '− Min' }).nth(1).click()
    await page.getByRole('textbox', { name: 'Vul in...' }).nth(2).waitFor()
    await page.getByRole('textbox', { name: 'Vul in...' }).nth(2).fill(factormin)

    await page.getByRole('button', { name: 'Gemeente aanmaken' }).click()

    await expect(page).not.toHaveURL(/new/, { timeout: 10000 })
    await expect(page.getByRole('heading', { name: name })).toBeVisible()
  })

// TC-003
  test('TC-003: can update a municipality name', async ({ page }) => {
    await page.goto('/cms/municipalities')
    await page.getByRole('link').filter({ hasText: name }).click()

    await page.getByRole('button', { name: 'Bewerken' }).click()

    await page.getByRole('textbox').first().fill(updatedName)
    await page.getByRole('button', { name: 'Opslaan' }).click()
    await expect(page.getByText('Opgeslagen!')).toBeVisible()
    await page.reload()
    await expect( page.getByRole('heading', { name: updatedName })).toBeVisible()
  })

// TC-004
  test('TC-004: can update a municipality core element', async ({ page }) => {
    await page.goto('/cms/municipalities')
    await page.getByRole('link').filter({ hasText: updatedName }).click()

    await page.getByRole('button', { name: `▸ ${coreElement}` }).click()
    await page.getByTestId('core-element').filter({ hasText: coreElement }).getByRole('button', { name: 'Bewerken' }).click()

    await page.getByRole('textbox').click();
    await page.getByRole('textbox').first().fill(updatedCoreElement)

    await page.getByRole('button', { name: 'Opslaan' }).click()
    await expect(page.getByText('Opgeslagen!')).toBeVisible()
    await expect( page.getByRole('button', { name: `▾ ${updatedCoreElement}`})).toBeVisible()
  })

// TC-005
  test('TC-005: can update a municipality mechanism', async ({ page }) => {
    await page.goto('/cms/municipalities')
    await page.getByRole('link').filter({ hasText: updatedName }).click()


    await page.getByRole('button', { name: `▸ ${updatedCoreElement}`}).click()
    await page.getByRole('button', { name: `▸ ${mechanism}`}).click()
    await page.getByTestId('mechanism').filter({ hasText: mechanism }).getByRole('button', { name: 'Bewerken' }).click()


    await page.getByRole('textbox').click();
    await page.getByRole('textbox').first().fill(updatedMechanism)

    await page.getByRole('button', { name: 'Opslaan' }).click()
    await expect(page.getByText('Opgeslagen!')).toBeVisible()
    await expect( page.getByRole('button', { name: `▾ ${updatedMechanism}`})).toBeVisible()
  })

// TC-006
  test('TC-006: can update a municipality factor', async ({ page }) => {
    await page.goto('/cms/municipalities')
    await page.getByRole('link').filter({ hasText: updatedName }).click()


    await page.getByRole('button', { name: `▸ ${updatedCoreElement}`}).click()
    await page.getByRole('button', { name: `▸ ${factor}`}).click()
    await page.getByTestId('factor').filter({ hasText: factor }).getByRole('button', { name: 'Bewerken' }).click()

    await page.getByRole('textbox').click();
    await page.getByRole('textbox').first().fill(updatedFactor)
    await page.getByRole('combobox').selectOption('min');

    await page.getByRole('button', { name: 'Opslaan' }).click()
    await expect(page.getByText('Opgeslagen!')).toBeVisible()
    await expect( page.getByRole('button', { name: `▾ ${updatedFactor}`})).toBeVisible()
    await expect(page.getByText('Type: Min')).toBeVisible()
  })

// TC-007
  test('TC-007: can delete a municipality', async ({ page }) => {
    await page.goto('/cms/municipalities')
    await page.getByRole('link').filter({ hasText: updatedName }).click()
    await page.getByRole('button', { name: 'Bewerken' }).click()

    page.once('dialog', dialog => dialog.accept())
    await page.getByRole('button', { name: 'Verwijder gemeente' }).click()

    await expect(page).toHaveURL(/\/cms\/municipalities$/)
    await expect(page.getByRole('main')).toContainText('Gemeenten')
    await expect(page.getByRole('main').locator('span').filter({ hasText: updatedName })).not.toBeVisible()
    await expect(page.getByRole('link').filter({ hasText: updatedName })).toHaveCount(0)
  })
})