import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

// A simple placeholder Dashboard component
function Dashboard() {
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard! 🎉</h1>
            <p className="text-gray-600 mb-6">You have successfully authenticated with your Django backend.</p>
            <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
                Logout
            </button>
        </div>
    );
}

// Protected Route wrapper to prevent unauthenticated access
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('access_token');
    return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100 py-10">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected Route */}
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    />

                    {/* Default redirect to login */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </div>
        </Router>
    );
}