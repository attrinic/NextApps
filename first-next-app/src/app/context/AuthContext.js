'use client'

import { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const nextApiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  /**
   * 
   * @param {user login} e 
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    // Get user type from form data
    const formData = new FormData(e.target);
    let userType = formData.get('userType');

    const res = await fetch(`${nextApiUrl}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, userType}),
      credentials: 'include'
    });

    const data = await res.json();
    console.log('LoginDatainProvider::', data);

    if (data.status == 'error') {
      //setUser(data);
      alert('Invalid user or password, please try again');
    } else {
      setUser(data);
      router.push('/');
    }
  };

  /**
   * Fetch user details
   */
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${nextApiUrl}/users/me`, { withCredentials: true });
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  /**
   * To fetch user details once
   */
  useEffect(() => {
    fetchUser();
  }, []);

  /**
   * User logout
   */
  const logout = async () => {
    await axios.post(`${nextApiUrl}/users/logout`, {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, email, password, setEmail, setPassword, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
