import React, { useEffect } from "react";
import { setData } from "../store/UsersData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios/axios";
import axiosInstance from "../axios/axios";

const baseURL = axiosInstance.defaults.baseURL;

// };
axios.defaults.withCredentials = true;

function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
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

  console.log("userData with selector", userData);

  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch, navigate]);
  const editUserHandler = (id) => {
    navigate(`/edit_profile/${id}`);
  };
  const logout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/login");
  };
  return (
    <div className="flex justify-center items-center h-screen bg-blue-300">
      <div className="bg-white p-9 width-200 w-96 rounded-lg shadow-lg">
        {!userData?.image ? (
          <img
            alt="Posts"
            className="w-32 h-32 rounded-full mx-auto"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK0AAACUCAMAAADWBFkUAAAAMFBMVEWzs7P///+urq7W1tb7+/vp6enGxsb09PS5ubna2trt7e2/v7/m5ubPz8/i4uLKysrz9xPiAAADI0lEQVR4nO2b25aDIAxFJVK5efn/vx1r2+nFzgihcnA1+6HPe1EIIYlNIwiCIAiCIKyx1s6/hNaIglpjjO/dEI4gTKO6YLwLVLswteqOaS3a53+o0w+6So9d1TvCGvWEPnUV65JX6tXXVupLq7VdcDX6kh36d7JK+ak2XbLje9VlO/RVhTMK/Z+qFzq04i/UOL0hq9RYSTCjcNp0nTnVoTtsL+yCCXhdcnGuVegmyFagmyKL1qUhSXa+KIB5GdnIA3anBy5uVOh6BrYXnpLvWDRItrGr/DCGAbS4HUdW9RjZdeodhcYkOMSSVaqF2AamrUfIJt25j0CiAm0l4H8SELZ/v2w2mA5l2wIiLt92FFuxXXBiu5stIgvLsC0v+z1reyzb8rJHyxN4TweFqY7ybSEZ47Fsx22vamzpULYdOyQoV7p0RyG5XvdA6ZICP9gumKKrS1OWbOELgn/CrhRNcfm1hCtFHzvZtkXTMHZV6UbRkJt7ysrGhKbJCbfnpm9RMrdC6QzX5siWr+DmRNzyDzNeQ2fhVP4VyWqWXUB0T9lvB0RhiX3QSsfaK8y9gBq3Yh00WBOddf/iBhQYaS6qJ72Qmi5A+pA3UidVNHiiMS0tR/RHHgkpj1+Nns1OCrqIJuSLbnzQPaFdm4QxBY2oLb4S/YzAZDMr4qbCfB2y9Ha2fbUP0Jo3KGLUCn0vPBCxdQu/yf9j2xY5bPkKbSU3lZywBdoMuVXZbocw/J37S0wPoppvoaIuM1PDtXsmLmk0aM0rkQk5csD9BsW/Hjx8M1BIqCmgP86wiUVn4GeoFFxyR9IPmO/iyKa7njkBfO3Eb/RqV+64zSsThtzmnnFDsLT7ItO8WX1e//wm7Hs37WscRp3XKHtBm3HYYVtQY0Pbf9T0rtwPnf3cGhPZafT7qF6F/dh9xpdo8J/9/98LmzbXdz7/Lb8vliw85uzh85fl+y/qE+wv7KnhXVZ5GGb9KXd0hu3L2A4Zw2nZpM/nMr7P/E5bnf4+htoea23FVmzFVmzFVmzFVmy/1LbcS3dN+izx5FoY6SVpApIsKwiCIAjCHvwAbvwtuYN1z7kAAAAASUVORK5CYII="
          />
        ) : (
          <img
            alt="Posts"
            className="w-32 h-32 rounded-full mx-auto"
            src={`http://localhost:8080/${userData.image}`}
          />
        )}

        <p className="text-center text-xl font-bold mt-4">
          {userData && userData.username}
        </p>
        <p className="text-center text-gray-600">
          {userData && userData.email}
        </p>
        <p className="text-center text-gray-600">
          {userData && userData.phone_number}
        </p>
        <button
          onClick={() => {
            editUserHandler(userData._id);
          }}
          className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Edit Profile
        </button>
      </div>
      <div className=" pt-96 mt-64 pl-22">
        <button
          onClick={logout}
          className="block    bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
