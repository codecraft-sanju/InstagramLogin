import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      alert("Login Successful!");
      console.log(response.data);
    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md p-8 rounded w-96 text-center">
      
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
          alt="Instagram"
          className="mx-auto mb-4 w-16"
        />

        <h2 className="mb-5 font-bold text-2xl">Log in to Instagram</h2>

        <input
          type="text"
          placeholder="Username"
          className="mb-3 p-2 border rounded w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-3 p-2 border rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 p-2 rounded w-full font-bold text-white"
        >
          Log in
        </button>

        <div className="mt-4 text-gray-500 text-sm">OR</div>

        
        <button className="bg-gray-200 hover:bg-gray-300 mt-3 p-2 rounded w-full font-bold text-gray-700">
          Continue with Google
        </button>

        <div className="mt-5 text-sm">
          Don't have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
