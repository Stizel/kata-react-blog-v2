import { createSlice } from '@reduxjs/toolkit'

const statusSlice = createSlice({
  name: 'status',
  initialState: {
    status: 'loading',
    location: 'articles-list',
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload
    },
    setLocation(state, action) {
      state.location = action.payload
    },
  },
})

export default statusSlice.reducer
export const { setStatus, setLocation } = statusSlice.actions
