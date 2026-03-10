import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./features/auth/pages/Login";
import Navbar from "./shared/components/Navbar";
import Signup from "./features/auth/pages/Signup";
import HomePage from "./features/movies/pages/HomePage";
import AllMoviesPage from "./features/movies/pages/AllMoviesPage";
import TvShows from "./features/movies/pages/TvShows";
import Favorites from "./features/favorite/Pages/Favorites.jsx";
import AdminPanel from "./features/admin/pages/adminPanel.jsx";
import SingleDetailPage from "./features/movies/pages/SingleDetailPage.jsx";
import { AuthProvider, useAuth } from "./features/auth/hooks/useAuth";

// route wrappers
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="p-4">Loading...</div>;
  if (!user)
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-4">Loading...</div>;
  if (user) return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <div className="bg-black text-white w-full min-h-screen  items-center flex flex-col">
        <Toaster position="top-right" />
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <AllMoviesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tvshows"
            element={
              <ProtectedRoute>
                <TvShows />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watch/:type/:id"
            element={
              <ProtectedRoute>
                <SingleDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminpanel"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          {/* catch all redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
