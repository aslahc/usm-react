import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import { setData } from "../store/UsersData";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios/axios";
import axiosInstance from "../axios/axios";
import { useParams, useNavigate } from "react-router-dom";

const baseURL = axiosInstance.defaults.baseURL;

function AdminEditUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const fetchData = async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      } else {
        const response = await axios.get(`${baseURL}/admin/fetchUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response:", response.data);
        dispatch(setData(response.data.data));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);
  const navigate = useNavigate();

  const userData = useSelector((state) =>
    state.users.data.find((data) => data._id === id)
  );
  const [username, setUsername] = useState(userData.username);
  const [phoneNumber, setPhoneNUmber] = useState(userData.phone_number);
  const [email, setEmail] = useState(userData.email);
  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = "Please enter a valid email.";
    }
    if (!emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!phonePattern.test(phoneNumber)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formHandler = (event) => {
    event.preventDefault();
    if (!handleValidation()) {
      return;
    }
    const data = {
      id: id,
      username: username,
      phonenumber: phoneNumber,
      email: email,
    };
    axios
      .put("/admin/edit_user", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        navigate("/admin");
      })
      .catch((error) => {});
  };
  return (
    <Card>
      <h3 className="text-center text-2xl font-semibold font-sans text-blue-300">
        Edit user
      </h3>
      <form onSubmit={formHandler}>
        <div>
          <label className="block text-blue-300 text-sm font-bold mb-2">
            username
          </label>
          <input
            type="text"
            defaultValue={userData && userData.username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          {errors.username && (
            <p className="text-red-500 text-xs italic">{errors.username}</p>
          )}
        </div>
        <div>
          <label className="block text-blue-300 text-sm font-bold mb-2">
            phone number
          </label>
          <input
            type="text"
            defaultValue={userData && userData.phone_number}
            onChange={(e) => {
              setPhoneNUmber(e.target.value);
            }}
          ></input>
          {errors.phone && (
            <p className="text-red-500 text-xs italic">{errors.phone}</p>
          )}
        </div>
        <div>
          <label className="block text-blue-300 text-sm font-bold mb-2">
            email
          </label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            defaultValue={userData && userData.email}
          ></input>
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>
        <br></br>
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          update
        </button>
      </form>
    </Card>
  );
}

export default AdminEditUser;
