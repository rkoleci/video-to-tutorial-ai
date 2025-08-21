import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/protected-route';
import { AuthCallbackPage } from './routes/auth-callback-route';
import Logout from './routes/logout';
import MainLayout from './common/main-layout';
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';

const HomePage = () => (
  <h1 className="text-lg font-thin underline">Hello world!</h1>
);
const LoginPage = () => <div className="bg-red">Login page</div>;
const DashboardPage = () => <div className="p-8">Welcome to Dashboard</div>;
const ProfilePage = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold">Profile Page</h1>
    <p>This is a protected route.</p>
  </div>
);

function App() {
  const { setIsAuthed } = useAuth()

  useEffect(() => {
    setIsAuthed()
  }, [])
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout><DashboardPage /></MainLayout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/logout" element={<Logout />} />

        <Route element={<MainLayout />}>
          <Route
            path="/home"
            element={
                <DashboardPage />
            }
          />
          <Route
            path="/tutorials"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900">404</h1>
                <p className="text-gray-600 mt-2">Page not found</p>
                <a
                  href="/"
                  className="text-blue-500 hover:text-blue-700 mt-4 inline-block"
                >
                  Go home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
