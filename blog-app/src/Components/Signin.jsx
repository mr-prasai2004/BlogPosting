import { useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Import axios for making HTTP requests

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // To show error messages
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
    
            if (response.data.token) {
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("token", response.data.token);  // Use "token" here for consistency
    
                navigate("/dashboard");
            }
        } catch (error) {
            setErrorMessage("Invalid credentials or server error.");
            console.error("Login error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    {errorMessage && (
                        <p className="text-red-500 text-center">{errorMessage}</p>
                    )}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                        Sign In
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
