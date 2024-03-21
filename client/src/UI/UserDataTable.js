import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../axios/axios";
import { setData } from "../store/UsersData";
import axiosInstance from "../axios/axios";
import { useNavigate } from "react-router-dom";

const baseURL = axiosInstance.defaults.baseURL;

function UserDataTable() {
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

  useEffect(() => {
    fetchData(dispatch);
  }, [dispatch]);

  const users = useSelector((state) => state.users.data);
  const userEditHandler = async (id) => {
    navigate(`/admin/edit_user/${id}`);
  };
  const userAddHandler = async (id) => {
    navigate(`/admin/add/${id}`);
  };
  const userDeleteHandler = async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/admin/delete_user/${id}`);

      if (response.status === 200) {
        console.log("deleted succes");
        fetchData(dispatch);
      } else {
        console.log("deleted error");
      }
    } catch (error) {
      console.log(error.message, "error");
    }
  };
  const logout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/login");
  };
  console.log("this is users data", users);
  const tableData = users.length ? (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((row) => (
            <tr key={row._id}>
              <td className="border px-4 py-2">{row.username}</td>
              <td className="border px-4 py-2">{row.email}</td>
              <td className="border px-4 py-2">{row.phone_number}</td>

              <td className="border px-4 py-2">
                <button
                  onClick={() => {
                    userAddHandler(row._id);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  add user
                </button>
                <span className="m-1"></span>
                <button
                  onClick={() => {
                    userEditHandler(row._id);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Edit
                </button>
                <span></span>

                <button
                  onClick={() => {
                    userDeleteHandler(row._id);
                  }}
                  className="bg-red-500 m-4 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div>
      <h1 className="text-red-500 font-sans align-middle ">loading......</h1>
    </div>
  );

  return (
    <div>
      <div>
        <button
          onClick={logout}
          className="block    bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div>{tableData}</div>
    </div>
  );
}

export default UserDataTable;
