import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, BookOpen, PenTool } from 'lucide-react';

// BlogCard Component
const BlogCard = ({ title, excerpt, author, date, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <img 
        src={imageUrl || '/api/placeholder/800/400'} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="/api/placeholder/40/40" 
              alt={author} 
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">{author}</p>
              <p className="text-xs text-gray-500">{date}</p>
            </div>
          </div>
          <Link 
            to={`/blog/${title.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            Read More <BookOpen className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">BlogSpace</Link>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search blogs..." 
              className="pl-10 pr-4 py-2 border rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/create" className="text-gray-700 hover:text-blue-500 flex items-center">
              <PenTool className="mr-2" /> Write
            </Link>
            <Link to="/signin" className="text-gray-700 hover:text-blue-500 flex items-center">
              <User className="mr-2" /> Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

// HomePage Component
const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs from the backend on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/blogs'); // Adjust the URL if necessary
        const data = await response.json();
        if (data.success) {
          setBlogs(data.data);  // Update the state with the blogs data from the API
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Latest Blogs</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <BlogCard 
              key={blog.blog_id}
              title={blog.title}
              excerpt={blog.content.substring(0, 100) + '...'} // Excerpt from the content
              author="Author Name"  // You can replace this with the actual author data
              date={new Date(blog.created_at).toLocaleDateString()}  // Format the date
              imageUrl={blog.imageUrl || '/api/placeholder/800/400'}  // Provide default image if none
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
