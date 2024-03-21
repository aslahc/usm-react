import React, { useState, useEffect } from "react";
import SignupCard from "../UI/Card";
import { useDispatch, useSelector } from "react-redux";

import { Navigate, useNavigate, useParams } from "react-router-dom";
import { setData } from "../store/UsersData";

import axios from "axios";
import axiosInstance from "../axios/axios";
const baseURL = axiosInstance.defaults.baseURL;

function EditUser() {
  const [image, setImage] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
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

  const userData = useSelector((state) =>
    state.users.data.find((data) => data._id === id)
  );
  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone_number);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);
  console.log(userData);
  const handleValidation = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Please enter a username.";
    }
    if (!email.trim() || !emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!phonePattern.test(phone)) {
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
    console.log(image);
    const formData = new FormData();
    formData.append("id", id);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("phone_number", phone);
    formData.append("image", image);

    axios
      .put(`${baseURL}/edit_profile/${id}`, formData)
      .then((response) => {
        console.log("User updated successfully:");
        navigate(`/${id}`);
        // Optionally, you can dispatch an action to update the user data in Redux store
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };
  console.log("ti", image);
  const showImage = image ? (
    <img
      alt="Posts"
      width="200px"
      height="200px"
      src={image ? URL.createObjectURL(image) : ""}
    ></img>
  ) : (
    <img
      alt="Posts"
      width="200px"
      height="200px"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK0AAACUCAMAAADWBFkUAAAAMFBMVEWzs7P///+urq7W1tb7+/vp6enGxsb09PS5ubna2trt7e2/v7/m5ubPz8/i4uLKysrz9xPiAAADI0lEQVR4nO2b25aDIAxFJVK5efn/vx1r2+nFzgihcnA1+6HPe1EIIYlNIwiCIAiCIKyx1s6/hNaIglpjjO/dEI4gTKO6YLwLVLswteqOaS3a53+o0w+6So9d1TvCGvWEPnUV65JX6tXXVupLq7VdcDX6kh36d7JK+ak2XbLje9VlO/RVhTMK/Z+qFzq04i/UOL0hq9RYSTCjcNp0nTnVoTtsL+yCCXhdcnGuVegmyFagmyKL1qUhSXa+KIB5GdnIA3anBy5uVOh6BrYXnpLvWDRItrGr/DCGAbS4HUdW9RjZdeodhcYkOMSSVaqF2AamrUfIJt25j0CiAm0l4H8SELZ/v2w2mA5l2wIiLt92FFuxXXBiu5stIgvLsC0v+z1reyzb8rJHyxN4TweFqY7ybSEZ47Fsx22vamzpULYdOyQoV7p0RyG5XvdA6ZICP9gumKKrS1OWbOELgn/CrhRNcfm1hCtFHzvZtkXTMHZV6UbRkJt7ysrGhKbJCbfnpm9RMrdC6QzX5siWr+DmRNzyDzNeQ2fhVP4VyWqWXUB0T9lvB0RhiX3QSsfaK8y9gBq3Yh00WBOddf/iBhQYaS6qJ72Qmi5A+pA3UidVNHiiMS0tR/RHHgkpj1+Nns1OCrqIJuSLbnzQPaFdm4QxBY2oLb4S/YzAZDMr4qbCfB2y9Ha2fbUP0Jo3KGLUCn0vPBCxdQu/yf9j2xY5bPkKbSU3lZywBdoMuVXZbocw/J37S0wPoppvoaIuM1PDtXsmLmk0aM0rkQk5csD9BsW/Hjx8M1BIqCmgP86wiUVn4GeoFFxyR9IPmO/iyKa7njkBfO3Eb/RqV+64zSsThtzmnnFDsLT7ItO8WX1e//wm7Hs37WscRp3XKHtBm3HYYVtQY0Pbf9T0rtwPnf3cGhPZafT7qF6F/dh9xpdo8J/9/98LmzbXdz7/Lb8vliw85uzh85fl+y/qE+wv7KnhXVZ5GGb9KXd0hu3L2A4Zw2nZpM/nMr7P/E5bnf4+htoea23FVmzFVmzFVmzFVmy/1LbcS3dN+izx5FoY6SVpApIsKwiCIAjCHvwAbvwtuYN1z7kAAAAASUVORK5CYII="
    ></img>
  );

  return (
    <SignupCard>
      <h3 className="text-center text-2xl font-semibold font-sans text-blue-300">
        Edit User
      </h3>

      <form onSubmit={formHandler} enctype="multipart/form-data">
        <div>
          <label className="block text-blue-300 text-sm font-bold mb-2">
            Username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            defaultValue={userData.username}
            type="text"
          />
          <p className="text-red-500 text-xs italic">{errors.username}</p>
        </div>
        <div>
          <label className="block text-blue-300 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            defaultValue={userData.phone_number}
            type="text"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs italic">{errors.phone}</p>
          )}
        </div>
        <div>
          <label className="block text-blue-300 text-sm font-bold mb-2">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={userData.email}
            type="email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>
        <div>
          <br></br>
          {showImage}
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          ></input>
        </div>
        <div>
          <br />
        </div>
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Update
        </button>
      </form>
    </SignupCard>
  );
}

export default EditUser;
