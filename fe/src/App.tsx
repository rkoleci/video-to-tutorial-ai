import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/protected-route';
import { AuthCallbackPage } from './routes/auth-callback-route';
import AppContainer from './common/app-container';

const HomePage = () => {
  return <><h1 className="text-lg font-thin underline">
    Hello world!
  </h1></>
}
const LoginPage = () => { return <></> }
const DashboardPage = () => { return <></> }

function App() {

  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Add more protected routes here */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div className="p-8">
                  <h1 className="text-2xl font-bold">Profile Page</h1>
                  <p>This is a protected route.</p>
                </div>
              </ProtectedRoute>
            }
          />

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900">404</h1>
                  <p className="text-gray-600 mt-2">Page not found</p>
                  <a href="/" className="text-blue-500 hover:text-blue-700 mt-4 inline-block">
                    Go home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  )
}

export default App
