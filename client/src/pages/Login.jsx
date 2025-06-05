// pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Welcome Back
        </h1>

        <p className="text-sm text-gray-500 mb-4">
          Please log in using your email and password. You can also use Google
          to log in quickly.
        </p>

        <form onSubmit={login} className="space-y-4">
          <input
            type="email"
            className="w-full p-3 border rounded-lg"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-3 border rounded-lg"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Or continue with:</p>
          <a
            href="http://localhost:4000/auth/google"
            className="mt-2 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Google Login
          </a>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
}
