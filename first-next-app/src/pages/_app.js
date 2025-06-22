import { AuthProvider } from '../app/context/AuthContext';

export default function App({ Component, pageProps }) {
    
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
