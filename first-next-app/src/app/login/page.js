'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const nextApiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${nextApiUrl}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });
    const data = await res.json();
    console.log('LoginData::', data);
    if (data.status == 'error') {
      alert('Invalid user or password, please try again');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="col-lg-4 border rounded-2">
      <form onSubmit={handleLogin} className='loginForm rounded border border-primary'>
        <label className="form-label">Admin Login</label>
        <div className="from-group form-row">
          <input type="email" className="form-control mt-4 mb-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        </div>

        {/* End of Username */}

        <div className="from-group form-row">
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        </div>
        {/* End of password */}
        <button type="submit" className='btn btn-primary'>Login</button>
        <a href="/users" className='btn btn-warning ms-3'>User Registration</a>
      </form>
    </div>
  );
}
