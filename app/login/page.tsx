
'use client';

import { useState, type SubmitEvent } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/src/lib/api';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setIsSubmitting(true);

    try {
      const { response, data } = await login(email.trim(), password);

      if (!response.ok) {
        setError(data.message ?? 'Login failed.');
        return;
      }

      sessionStorage.setItem('token', data.data.token);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border p-8 shadow-sm">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Login
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded border p-3"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded border p-3"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-black p-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </main>
  );
}
