import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

// BlogCard Component
const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <img 
        src={blog.imageUrl || '/api/placeholder/800/400'} 
        alt={blog.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h2>
        <p className="text-gray-600 mb-4">{blog.content.substring(0, 100) + '...'}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="/api/placeholder/40/40" 
              alt="Author" 
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">Author Name</p>
              <p className="text-xs text-gray-500">{new Date(blog.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          <Link 
            to={`/blog/${blog.blog_id}`}  // Link to the full blog detail page
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            Read More <BookOpen className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
