import React, { useState, useEffect } from "react";
import axios from "axios";

const token = localStorage.getItem('token');

const ManageBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/blogs");
      const blogsArray = response.data.data;
      setBlogs(Array.isArray(blogsArray) ? blogsArray : []);
    } catch (error) {
      console.error("API Request Failed:", error);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`http://localhost:3000/api/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setUpdatedTitle(blog.title);
    setUpdatedContent(blog.content);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/blogs/${editingBlog.blog_id}`,
        {
          title: updatedTitle,
          content: updatedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchBlogs();
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Manage Blogs</h2>

      <div className="space-y-8 w-full max-w-4xl">
      {blogs.length > 0 ? (
  blogs.map((blog) => (
    <div key={blog.id || blog.blog_id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{blog.title}</h3>
      <p className="text-gray-700 text-base mb-4">{blog.content}</p>
      <div className="flex justify-between space-x-4">
        <button
          onClick={() => handleEdit(blog)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(blog.blog_id)}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  ))
) : (
  <p className="text-center text-gray-500">No blogs available.</p>
)}

        {editingBlog && (
          <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Edit Blog</h3>
            <div className="mb-4">
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Blog Title"
              />
            </div>
            <div className="mb-6">
              <textarea
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Blog Content"
                rows="6"
              ></textarea>
            </div>
            <button
              onClick={handleUpdate}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
            >
              Update Blog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBlog;
