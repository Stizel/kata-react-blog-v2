import {combineReducers, configureStore} from "@reduxjs/toolkit";
import articlesSlice from "./article-slice";
import statusSlice from "./status-slice";
import userSlice from "./user-slice";

const rootReducer = combineReducers({
  user:userSlice,
  articles:articlesSlice,
  status:statusSlice,
})

export const store = configureStore({
  reducer:rootReducer
})