import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetailPage = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const fetchBlog = async () => {
      console.log("Fetching blog:", blogId);
  
      try {
        const response = await fetch(`http://localhost:3000/api/blogs/${blogId}`);
        const data = await response.json();
  
        console.log("API Response:", data); // Add this to log the full response
  
        if (data.success) {
          console.log("Blog data received:", data.data); // Log blog data to check its structure
          setBlog(data.data);  // Update state with the blog data
        } else {
          setError("Blog not found");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to fetch blog");
      }
    };
  
    fetchBlog();
  }, [blogId]);
  


  if (error) {
    return <div>Error: {error}</div>;  // Show error if any
  }

  if (!blog) {
  return <div>Loading...</div>;
}

return (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold text-gray-800 mb-6">{blog.title}</h1>
    <img 
      src={blog.imageUrl || '/api/placeholder/800/400'} 
      alt={blog.title} 
      className="w-full h-96 object-cover mb-6"
    />
    <div className="text-lg text-gray-800" dangerouslySetInnerHTML={{ __html: blog.content }} />
  </div>
);
};

export default BlogDetailPage;
