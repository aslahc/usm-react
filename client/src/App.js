import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";

import "./App.css";
import "./index.css";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import { RequireAuth } from "react-auth-kit";
import EditUser from "./components/EditUser";
import AdminHome from "./components/AdminHome";
import AdminEditUser from "./components/AdminEditUser";
import AdminAddUser from "./components/AdminAddUser";

function App() {
  return (
    <AuthProvider>
      <Router className="App">
        <Routes>
          <Route exact path="/:id" element={<Home />} />
          <Route
            path="/edit_profile/:id"
            element={
              <RequireAuth loginPath="/login">
                <EditUser />
              </RequireAuth>
            }
          />
          <Route path="/admin/edit_user/:id" element={<AdminEditUser />} />
          <Route path="/admin/add/:id" element={<AdminAddUser />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<AdminHome />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
