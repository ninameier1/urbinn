import { signIn } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default function LoginPage() {
  async function handleLogin(formData: FormData) {
    'use server'
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/cms',
    })
  }

  return (
    <form action={handleLogin}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Log in</button>
    </form>
  )
}