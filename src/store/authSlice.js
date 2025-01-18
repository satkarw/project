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
    },
})

export const {setIfLoggedIn,setUserObj} = authSlice.actions;
export default authSlice.reducer;
