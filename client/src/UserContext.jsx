import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedId = localStorage.getItem('id');

    if (storedUsername && storedId) {
      setUsername(storedUsername);
      setId(storedId);
      setIsLoading(false);
    } else {
      axios.get('/profile')
        .then((response) => {
          setId(response.data.userId);
          setUsername(response.data.username);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('id', response.data.userId);
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const logout = async () => {
    try {
      await axios.post('/logout');
      setId(null);
      setUsername(null);
      localStorage.removeItem('username');
      localStorage.removeItem('id');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId, isLoading, logout }}>
      {children}
    </UserContext.Provider>
  );
}