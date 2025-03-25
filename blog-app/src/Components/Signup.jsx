import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios"; // Install axios if you haven't already: npm install axios

const SignUp = () => {
  const [name, setName] = useState(""); // Ensure this is defined
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error handling
  const navigate = useNavigate();

  const [username, setUsername] = useState("");  // Change 'name' to 'username'

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      username: name, // Ensure this is the correct field
      email,
      password
    };
  
    try {
      const response = await axios.post("http://localhost:3000/api/users/signup", formData);
      console.log("Signup successful:", response.data);
      // Handle success, e.g., redirect to login
    } catch (error) {
      console.error("Signup error:", error);
      // Display error to user (e.g., set error state)
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} // Ensure this uses setName
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your name" 
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your email" 
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your password" 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account? <a href="/signin" className="text-blue-500">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
