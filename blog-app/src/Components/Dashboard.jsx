import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link and navigate from react-router-dom
import { Pen, Layout, User } from 'lucide-react'; // Import your icons
import Edit from "./ManageBlog";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login page if not authenticated
    }
  }, [navigate]);

  const stats = [
    { title: 'Total Posts', value: 42, icon: <Pen className="text-blue-500" /> },
    { title: 'Views', value: '12.5K', icon: <Layout className="text-green-500" /> },
    { title: 'Followers', value: 1240, icon: <User className="text-purple-500" /> }
  ];
  const handleLogout = () => {
    // Remove authentication data from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userToken");

    // Redirect to the login page
    navigate("/signin");
};

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                Logout
            </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="mr-4 text-3xl">{stat.icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
          Add Post
        </Link>
        <Link to="/ManageBlog" className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600">
          Edit Post
        </Link>
        <button
          onClick={() => alert("Post deleted!")}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
