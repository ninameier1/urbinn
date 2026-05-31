import { test as setup } from '@playwright/test'

const sessionFile = 'tests/.auth/session.json'

setup('authenticate', async ({ page }) => {
  const response = await page.request.post('http://localhost:3000/api/test-session', {
    data: { email: 'test@test.com' },
  })

  const { sessionToken, expires } = await response.json()

  await page.context().addCookies([
    {
      name: 'authjs.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      expires: Math.floor(new Date(expires).getTime() / 1000),
      httpOnly: true,
      sameSite: 'Lax',
    },
  ])

  await page.context().storageState({ path: sessionFile })
})