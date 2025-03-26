import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import HomePage from './HomePage';
import SignIn from './Components/Signin';
import SignUp from './Components/Signup';
import CreateBlogPage from './Components/CreateBlog';
import ManageBlog from './Components/ManageBlog';
import BlogDetailPage from './Components/BlogDetailPage';  
// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // Check if the user is authenticated

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

function App() {
  return (
    <Router>
      
      <Routes>
        {/* Public Routes */}
        <Route exact path="/" element={<HomePage />} />
        <Route path="/blog/:blogId" element={<BlogDetailPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ManageBlog" element={<ManageBlog />} />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create" 
          element={
            <ProtectedRoute>
              <CreateBlogPage />
            </ProtectedRoute>
          }
        />

        {/* 404 Not Found Route */}
        <Route 
          path="*" 
          element={
            <div className="flex items-center justify-center h-screen bg-gray-100">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-gray-600">Page Not Found</p>
                <a 
                  href="/" 
                  className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Go to Home
                </a>
              </div>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
