import React, { useState } from "react";
import LoginCard from "../UI/Card";
import axios from "axios";
import { useSignIn } from "react-auth-kit";

import { Link, useNavigate } from "react-router-dom";

import { setUser, userLoggedIn } from "../store/userDataSlice";
import { useDispatch } from "react-redux";
function Login() {
  const signIn = useSignIn();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};

    if (email.trim() === "" || !emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (password.trim() === "") {
      newErrors.password = "Please enter a valid password.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  axios.defaults.withCredentials = true;
  const handleLogin = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };
    console.log("gingi to axios");
    console.log(data);

    axios
      .post("http://localhost:8080/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.success) {
          console.log("going to gome");
          // signIn({
          //   token: res.data.token,
          //   expiresIn: 3800,
          //   tokenType: "Bearer",
          //   authState: { email: data.email },
          // });
          localStorage.setItem("token", res.data.token);

          dispatch(setUser([res.data.data]));
          dispatch(userLoggedIn(true));
          if (res.data.isAdmin) {
            navigate("/admin");
          } else {
            console.log("id");
            navigate(`/${res.data.data._id}`);
          }
        } else {
          navigate("/login");
        } // Log successful response
        // You might want to handle navigation here
      })
      .catch((error) => {
        console.log("Login error:", error); // Log error response
        // Handle login errors here
      });
  };

  return (
    <LoginCard>
      <h2 className="text-center text-2xl font-semibold font-sans text-blue-300">
        Login
      </h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            className="block text-blue-300 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-blue-300 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
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
            Login
          </button>
        </div>
        <br></br>
        <p>
          Not a member?{" "}
          <Link to="/signup" className="text-blue-300">
            Signup
          </Link>
        </p>
      </form>
    </LoginCard>
  );
}

export default Login;
