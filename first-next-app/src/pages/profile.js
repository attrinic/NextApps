import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState(null);
  const nextApiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios.get(`${nextApiUrl}/users/me`, { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => alert('You are not logged in'));
  }, []);

  return user ? (
    <div>
      <h1>Welcome, {user.email}</h1>
    </div>
  ) : <p>Loading...</p>;
}
