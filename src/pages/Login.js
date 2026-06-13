import { Button, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      if (res.data.user.role === "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/checkinout");
      }

    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold mb-2 text-black">
          Sign In
        </h1>

        <p className="text-gray-600 mb-6">
          Login to your EonixTrack account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-2 font-medium text-black">
              Email
            </label>

            <TextInput
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-black">
              Password
            </label>

            <TextInput
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>

        </form>

        <p className="mt-4 text-center text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}