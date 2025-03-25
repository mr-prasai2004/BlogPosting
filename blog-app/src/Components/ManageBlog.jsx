import React, { useState, useEffect } from "react";
import axios from "axios";

const token = localStorage.getItem('token');
const ManageBlog = () => {
  const [blogs, setBlogs] = useState([]); // Ensure blogs is always an array
  const [editingBlog, setEditingBlog] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      console.log("Making API request...");
      const response = await axios.get("http://localhost:3000/api/blogs");
  
      console.log("Full API Response:", response);
      console.log("Response Data:", response.data);
  
      // Extract correct array
      const blogsArray = response.data.data; 
  
      console.log("Processed blogs:", blogsArray); // Log final blogs array
      setBlogs(Array.isArray(blogsArray) ? blogsArray : []);
    } catch (error) {
      console.error("API Request Failed:", error);
    }
  };
  
  

  const handleDelete = async (blogId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Make sure the token is sent with the request
        },
      });
  
      // Handle successful deletion (e.g., update state)
      console.log('Blog deleted:', response.data);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleEdit = (blog) => {
    console.log("Editing blog:", blog);  // Log the blog object
    setEditingBlog(blog);
    setUpdatedTitle(blog.title);
    setUpdatedContent(blog.content);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/blogs/${editingBlog.blog_id}`,
        {
          title: updatedTitle,
          content: updatedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in headers
          },
        }
      );
      // Handle successful update (e.g., update state)
      console.log('Blog updated:', response.data);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Blogs</h2>

      {blogs?.length > 0 ? (
  blogs.map((blog, index) => (
    <div key={blog.id || index} className="border p-4 mb-4">
      <h3 className="text-xl font-semibold">{blog.title}</h3>
      <p>{blog.content}</p>
      <button onClick={() => handleEdit(blog)} className="bg-blue-500 text-white px-4 py-2 mr-2">Edit</button>
      <button onClick={() => handleDelete(blog.blog_id)} className="bg-red-500 text-white px-4 py-2">Delete</button>
    </div>
  ))
) : (
  <p>No blogs available.</p>
)}

      {editingBlog && (
        <div className="mt-4 p-4 border">
          <h3 className="text-lg font-semibold">Edit Blog</h3>
          <input 
            type="text" 
            value={updatedTitle} 
            onChange={(e) => setUpdatedTitle(e.target.value)} 
            className="border p-2 w-full mb-2"
          />
          <textarea 
            value={updatedContent} 
            onChange={(e) => setUpdatedContent(e.target.value)} 
            className="border p-2 w-full mb-2"
          ></textarea>
          <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2">Update</button>
        </div>
      )}
    </div>
  );
};

export default ManageBlog;
