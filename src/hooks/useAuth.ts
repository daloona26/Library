import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { mockUsers } from '../mockData';

export function useAuth() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      dispatch(loginStart());
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation (in a real app, this would be a server call)
      if (password === 'password') {
        const user = mockUsers.find(u => u.username === username);
        
        if (user) {
          dispatch(loginSuccess(user));
          return true;
        }
      }
      
      throw new Error('Invalid username or password');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      dispatch(loginFailure(errorMessage));
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
 