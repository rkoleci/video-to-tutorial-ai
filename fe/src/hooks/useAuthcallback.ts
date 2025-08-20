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
          
          // Optional: Verify the token with your backend
          try {
            const response = await fetch('http://localhost:3000/auth/me', { // TODO zustand
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
  
            if (!response.ok) {
              throw new Error('Token verification failed');
            }
  
            const userData = await response.json();
            console.log('Authenticated user:', userData);
  
            // Optional: Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(userData.user));
            
          } catch (verifyError) {
            console.warn('Token verification failed, but token saved:', verifyError);
            // Still proceed as token might be valid but backend unreachable
          }
  
          // Success - redirect to dashboard or intended page
          const intendedRoute = localStorage.getItem('intendedRoute') || '/dashboard';
          localStorage.removeItem('intendedRoute'); // Clean up
          
          // Small delay for better UX
          setTimeout(() => {
            navigate(intendedRoute, { replace: true });
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