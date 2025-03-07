import { lazy, Suspense, useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext.jsx';
import axios from 'axios';

const RegisterAndLoginForm = lazy(() => import('./RegisterAndLoginForm.jsx'));
const Chat = lazy(() => import('./Chat'));

export default function Routes() {
  const { username, setId, setUsername } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/profile');
        setUsername(response.data.username);
        setId(response.data.id);
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setId, setUsername]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {username ? <Chat /> : <RegisterAndLoginForm />}
    </Suspense>
  );
}