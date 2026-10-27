import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/react';
import Loading from './Loading';

// Centralized route guard — redirects unauthenticated users to /login,
// remembering where they came from so Login can send them back.
function ProtectedRoute({ children }) {
    const location = useLocation();
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) {
        return <Loading message="Checking your session..." className="min-h-[60vh]" />;
    }

    if (!isSignedIn) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
}

export default ProtectedRoute;
