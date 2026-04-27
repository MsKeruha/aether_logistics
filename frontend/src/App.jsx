import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import OrderList from './pages/OrderList';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <main className="flex-grow container mx-auto px-4 py-8">
                    <Home />
                  </main>
                </>
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <main className="flex-grow container mx-auto px-4 py-8">
                    <OrderList />
                  </main>
                </>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <main className="flex-grow container mx-auto px-4 py-8">
                    <Settings />
                  </main>
                </>
              </ProtectedRoute>
            } />
          </Routes>
          <footer className="py-6 text-center text-slate-500 text-sm border-t border-slate-800">
            &copy; 2026 Aether Logistics BPM System. Всі права захищені.
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
