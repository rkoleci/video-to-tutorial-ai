import { useAuthCallback } from "../hooks/useAuthcallback";

export const AuthCallbackPage: React.FC = () => {
    const { isProcessing, error } = useAuthCallback();
  
    if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-red-500">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                Authentication Failed
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {error}
              </p>
              <p className="mt-4 text-xs text-gray-500">
                Redirecting to login page...
              </p>
            </div>
          </div>
        </div>
      );
    }
  
    if (isProcessing) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="mx-auto h-12 w-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                Completing Sign In
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Please wait while we authenticate you...
              </p>
              <div className="mt-4">
                <div className="bg-gray-200 rounded-full h-2 w-full">
                  <div className="bg-blue-500 h-2 rounded-full animate-pulse w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    // This state shouldn't be reached, but just in case
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Processing...</h2>
        </div>
      </div>
    );
  };