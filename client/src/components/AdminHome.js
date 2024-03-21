import React from "react";
import Searchbar from "../UI/Searchbar";
import UserDataTable from "../UI/UserDataTable";
function AdminHome() {
  return (
    <div>
      <Searchbar />
      <br></br>
      <UserDataTable />
    </div>
  );
}

export default AdminHome;
