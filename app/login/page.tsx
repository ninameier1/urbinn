import { signIn } from '@/auth'
import Button from '@/components/Button'

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
    <div className="py-40 mb-12 flex items-center justify-center px-4">
      <div className="w-[35vw] bg-primary border border-gray-200 rounded-2xl p-10">
        
        <h1 className="mb-8 text-4xl text-center tracking-widest text-white font-medium uppercase">
          Urban Innovation
        </h1>

        <form action={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-white mb-1.5" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@windesheim.nl"
              required
              className="w-full h-[32px] bg-white rounded-sm text-base px-2"
            />
          </div>

          <div>
            <label className="block text-sm text-white mb-1.5" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full h-[32px] bg-white rounded-sm text-2xl px-2"
            />
          </div>

          <Button variant="secondary" type="submit">
            Log in
          </Button>
        </form>
        
      </div>
    </div>
  )
}