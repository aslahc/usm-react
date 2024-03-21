import React, { useState } from "react";

import axios from "../axios/axios";
import { setData } from "../store/UsersData";
import axiosInstance from "../axios/axios";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

const baseURL = axiosInstance.defaults.baseURL;

function Searchbar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const handleChange = async (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    try {
      const response = await axios.get(
        `${baseURL}/admin/search?q=${inputValue}`
      );
      dispatch(setData(response.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <form className="flex w-full max-w-sm border-b-2 border-gray-300 pb-2">
        <input
          className="appearance-none w-full py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Searchbar;
