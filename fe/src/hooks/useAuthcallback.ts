import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const processCallback = async () => {
        try {
          // Get token from URL params
          const token = searchParams.get('token');
          
          if (!token) {
            throw new Error('No authentication token received');
          }
  
          // Store token in localStorage
          localStorage.setItem('authToken', token);
          
          // Small delay for better UX
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 1000);
  
        } catch (error) {
          console.error('Auth callback error:', error);
          setError(error instanceof Error ? error.message : 'Authentication failed');
          
          // Clean up any stored data on error
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          
          // Redirect to login after showing error
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 3000);
        } finally {
          setIsProcessing(false);
        }
      };
  
      processCallback();
    }, [searchParams, navigate]);
  
    return { isProcessing, error };
  };