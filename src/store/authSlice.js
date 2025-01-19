import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ifLoggedIn:false,
    userObj:null,
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setIfLoggedIn:(state,action)=>{
            state.ifLoggedIn=action.payload;
        },
        setUserObj:(state,action)=>{
            state.userObj = action.payload;
        },
        setNotificationData:(state,action)=>{
            state.notificationData = action.payload;
        },
        
        
        
    },
})

export const {setIfLoggedIn,setUserObj,setNotificationData} = authSlice.actions;
export default authSlice.reducer;
