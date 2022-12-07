import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem('user'))
      ? JSON.parse(localStorage.getItem('user')) : {
        image: '',
        bio: '',
        token: '',
        username: '',
        email: '',
        password: ''
      },
    errors: null,
    home: false,
  },
  reducers: {
    logOut(state) {
      state.user = {
        image: '',
        bio: '',
        token: '',
        username: '',
        email: '',
        password: ''
      };
    },
    setUser(state, action) {
      const {user} = action.payload;
      state.user = {...state.user, ...user};
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    goHome(state, action) {
      state.home = action.payload;
    },
  }
});

export default userSlice.reducer;
export const {setUser, setErrors, logOut, goHome} = userSlice.actions;