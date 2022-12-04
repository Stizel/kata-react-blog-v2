import {createSlice} from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: {
    login: false,
    status:'loading',
    location:'articles',
  },
  reducers: {
    setStatus(state,action){
      state.status = action.payload;
    },
    toggleLogin(state) {
      state.login = !state.login;
    },
    setLocation(state,action) {
      state.location = action.payload;
    },
  }
});

export default statusSlice.reducer;
export const {toggleLogin,setStatus,setLocation} = statusSlice.actions;



