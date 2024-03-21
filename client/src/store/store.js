import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./userDataSlice";
import UsersData from "./UsersData";


const  store = configureStore({
    reducer:{
       userData : userDataSlice,
    users:UsersData ,
    }
})

export default store
