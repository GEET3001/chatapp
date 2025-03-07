import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext.jsx';

export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  function validateForm() {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const url = isLoginOrRegister === 'register' ? 'register' : 'login';
      const { data } = await axios.post(url, { username, password });
      setLoggedInUsername(username);
      setId(data.id);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setErrors({ submit: error.response?.data || 'An error occurred' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit} aria-label="Login or Register Form">
        <input
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          type="text"
          placeholder="username"
          className="block w-full rounded-sm p-2 mb-2 border"
          aria-label="Username"
          required
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        <div className="relative">
          <input
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            type={showPassword ? 'text' : 'password'}
            placeholder="password"
            className="block w-full rounded-sm p-2 mb-2 border"
            aria-label="Password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-500"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        <button
          className="bg-blue-500 text-white block w-full rounded-sm p-2"
          disabled={isLoading}
          aria-label={isLoading ? 'Loading' : isLoginOrRegister === 'register' ? 'Register' : 'Login'}
        >
          {isLoading ? 'Loading...' : isLoginOrRegister === 'register' ? 'Register' : 'Login'}
        </button>
        {errors.submit && <p className="text-red-500 text-sm mt-2">{errors.submit}</p>}
        <div className="text-center mt-2">
          {isLoginOrRegister === 'register' && (
            <div>
              Already a member?
              <button
                className="ml-1 text-blue-500"
                onClick={() => setIsLoginOrRegister('login')}
                aria-label="Switch to Login"
              >
                Login here
              </button>
            </div>
          )}
          {isLoginOrRegister === 'login' && (
            <div>
              Don't have an account?
              <button
                className="ml-1 text-blue-500"
                onClick={() => setIsLoginOrRegister('register')}
                aria-label="Switch to Register"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}