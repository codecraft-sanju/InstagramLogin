import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate(); 

  
  const handleLogin = () => {
    if (password === "instagram123") {
      setAuthenticated(true);
      fetchUsers();
    } else {
      alert("Wrong Password! Access Denied");
      navigate("/"); 
    }
  };

  
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/users", {
        headers: { "admin-password": password },
      });
      setUsers(response.data.users);
    } catch (error) {
      alert("Failed to fetch users!");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 min-h-screen">
      <h1 className="mb-4 font-bold text-3xl">Admin Panel</h1>

      {!authenticated ? (
        <div className="bg-white shadow-md p-6 rounded w-96 text-center">
          <h2 className="mb-4 text-xl">Enter Admin Password</h2>
          <input
            type="password"
            placeholder="Admin Password"
            className="mb-3 p-2 border rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-600 p-2 rounded w-full font-bold text-white"
          >
            Login as Admin
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-md p-6 rounded w-full max-w-2xl">
          <h2 className="mb-4 text-xl">Users List</h2>
          <table className="border border-gray-300 w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Username</th>
                <th className="p-2 border">Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id}>
                  <td className="p-2 border text-center">{user.id}</td>
                  <td className="p-2 border">{user.username}</td>
                  <td className="p-2 border">{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
