import React, { useState } from "react";
import SignUpCard from "../UI/Card";

import axios from "../axios/axios";
import { Link, useNavigate } from "react-router-dom";
function AdminAddUser() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;
    const newErrors = {};

    if (!userName.trim()) {
      newErrors.userName = "Username is required";
    }
    if (!phoneNumber.trim() || !phonePattern.test(phoneNumber)) {
      newErrors.phoneNumber = "Valid phone number is required";
    }
    if (!email.trim() || !emailPattern.test(email)) {
      newErrors.email = "Valid email address is required";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const formHandler = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = {
      username: userName,
      phonenumber: phoneNumber,
      email: email,
      password: password,
    };

    axios
      .post("/admin/add", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data.message);
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SignUpCard>
      <div>
        <form onSubmit={formHandler}>
          <div className="mb-4">
            <label
              className="block text-blue-300 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={userName}
              placeholder="Username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            {errors.userName && (
              <p className="text-red-500 text-xs italic">{errors.userName}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block  text-blue-300 text-sm font-bold mb-2"
              htmlFor="number"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="number"
              type="text"
              placeholder="Phone Number"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs italic">
                {errors.phoneNumber}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-blue-300  text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-1 px- text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-blue-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-1 px- text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              add user
            </button>
          </div>
        </form>
      </div>
    </SignUpCard>
  );
}

export default AdminAddUser;
