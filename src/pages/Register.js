import { TextInput, Select } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Student",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      console.log(res.data);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold mb-2">
          Create Your Account
        </h1>

        <p className="text-gray-500 mb-6">
          Join EonixTrack and start tracking your progress.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-2 font-medium text-black">
              Username
            </label>

            <TextInput
              id="name"
              type="text"
              placeholder="Enter your username"
              required
              onChange={handleChange}
            />
          </div>

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

          <div>
            <label className="block mb-2 font-medium text-black">
              Confirm Password
            </label>

            <TextInput
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-black">
              Role
            </label>

            <Select
              id="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
            </Select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#007979] text-white py-2 rounded-lg hover:bg-[#006666]"
          >
            Register
          </button>

        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}