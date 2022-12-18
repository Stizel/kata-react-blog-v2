import { createSlice } from '@reduxjs/toolkit'

const statusSlice = createSlice({
  name: 'status',
  initialState: {
    status: 'loading',
    location: 'articles-list',
    home: false,
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload
    },
    setLocation(state, action) {
      state.location = action.payload
    },
    goHome(state, action) {
      state.home = action.payload
    },
  },
})

export default statusSlice.reducer
export const { setStatus, setLocation, goHome } = statusSlice.actions
