import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { useAuth } from '../hooks/useAuth';
import { loginWithGooglePopup, logout } from '../services/auth';

export default function Login() {
  const { user, loading } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLoginPopup = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);

    try {
      await loginWithGooglePopup();
    } catch (e) {
      console.error(e);
      alert('팝업 로그인 실패');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (loading) return <div>loading...</div>;

  return (
    <div className="relative z-10 container mx-auto max-w-7xl px-4 pt-24 pb-32 sm:px-6 sm:pt-32 sm:pb-40 lg:px-8 lg:pt-40 lg:pb-48">
      <h1 className="mb-12">Firebase Google Login</h1>

      {!user ? (
        <button
          className={twMerge(
            'rounded-lg px-6 py-2.5 font-medium transition-all',
            'cursor-pointer bg-green-600 text-white shadow-lg shadow-green-600/25 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60',
          )}
          onClick={handleLoginPopup}
          disabled={isLoggingIn}
          type="button"
        >
          Google로 로그인
        </button>
      ) : (
        <>
          <div style={{ marginBottom: 12 }}>
            <img
              src={user.photoURL ?? ''}
              alt=""
              width={40}
              height={40}
              style={{
                borderRadius: 999,
                verticalAlign: 'middle',
                marginRight: 8,
              }}
            />
            <b>{user.displayName}</b> ({user.email})
          </div>

          <button onClick={handleLogout}>로그아웃</button>
        </>
      )}
    </div>
  );
}
