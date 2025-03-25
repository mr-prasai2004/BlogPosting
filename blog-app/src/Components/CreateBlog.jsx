import React, { useState } from 'react';
import axios from 'axios';
import { Save, Image, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateBlogPage = () => {
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState({
    title: '',
    content: '',
    tags: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogPost(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      const token = localStorage.getItem('token'); // ✅ Get token from storage
  
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }
  
      const response = await axios.post('http://localhost:3000/api/blogs/create', blogPost, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // ✅ Ensure token is sent
        }
      });
  
      if (response.data.success) {
        alert('Blog post created successfully!');
        navigate('/dashboard'); // ✅ Redirect after success
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Failed to create blog post');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center text-gray-700 hover:text-blue-500">
            <ArrowLeft className="mr-2" /> Back to Home
          </a>
          
          <button 
            onClick={handleSubmit}
            disabled={isLoading}
            className={`
              ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} 
              text-white px-4 py-2 rounded-lg flex items-center
            `}
          >
            <Save className="mr-2" /> 
            {isLoading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </header>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              {error}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 mb-2 text-lg">Blog Title</label>
            <input 
              type="text" 
              name="title"
              value={blogPost.title}
              onChange={handleChange}
              placeholder="Enter a title for your blog post"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 text-lg">Content</label>
              <button 
                type="button"
                className="flex items-center text-gray-600 hover:text-blue-500"
                disabled={isLoading}
              >
                <Image className="mr-1" size={18} /> Add Cover Image
              </button>
            </div>
            <textarea 
              name="content"
              value={blogPost.content}
              onChange={handleChange}
              placeholder="Write your blog post content here..."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-96"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Tags</label>
            <input 
              type="text" 
              name="tags"
              value={blogPost.tags}
              onChange={handleChange}
              placeholder="Add tags separated by commas (e.g. React, Web Development, Tutorial)"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPage;