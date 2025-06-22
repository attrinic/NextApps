'use client';

import { useAuth } from '../context/AuthContext';
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginPage() {

  const searchParams = useSearchParams();
  
  const [isAdminLogin, setIsAdminLogin] = useState(null);
  const {email, password, setEmail, setPassword, handleLogin} = useAuth();

  useEffect(() => {
    setIsAdminLogin(searchParams.get('admin'));
  });

  return (
    <div className="col-lg-4 border rounded-2">
      <form onSubmit={handleLogin} className='loginForm rounded border border-primary'>
        {isAdminLogin && <label className="form-label">Admin Login</label>}
        {!isAdminLogin && <label className="form-label">User Login</label>}
        {isAdminLogin ? <input type="hidden" name="userType" value={isAdminLogin} /> : <input type="hidden" name="userType" value="0" /> } 
        <div className="from-group form-row">
          <input type="email" className="form-control mt-4 mb-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        </div>

        {/* End of Username */}

        <div className="from-group form-row">
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        </div>
        {/* End of password */}
        <div className="float-left">
          <button type="submit" className='btn btn-primary'>Login</button>
          {!isAdminLogin && <a href="/users" className='btn btn-warning ms-3'>User Registration</a>}
        </div>
      </form>
    </div>
  );
}
