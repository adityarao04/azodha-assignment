import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isOnboardingCompleted = useAppSelector(
    (state) => state.onboarding.isCompleted
  );

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            isOnboardingCompleted ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/onboarding" replace />
            )
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/onboarding"
        element={
          isAuthenticated ? (
            isOnboardingCompleted ? (
              <Navigate to="/home" replace />
            ) : (
              <Onboarding />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/home"
        element={
          isAuthenticated && isOnboardingCompleted ? (
            <Home />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

