'use client';

import { useState } from 'react';
import { login } from '@/src/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>,) {
    event.preventDefault();

    setMessage('');
    setError('');

    const { response, data } = await login(email, password);

    if (!response.ok) {
        setError(data.message ?? 'Login failed');
        return;
    }

    sessionStorage.setItem('token', data.data.token);
    setMessage('Login successful');
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded border p-3"
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded border p-3"
          />

          <button
            type="submit"
            className="w-full rounded bg-black p-3 text-white"
          >
            Login
          </button>
          {error && <p className="mb-4 text-red-600">{error}</p>}

          {message && <p className="mb-4 text-green-600">{message}</p>}
        </form>
      </div>
    </main>
  );
}