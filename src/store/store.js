import {combineReducers, configureStore} from "@reduxjs/toolkit";
import articlesSlice from "./article-slice";
import statusSlice from "./status-slice";

const rootReducer = combineReducers({
  articles:articlesSlice,
  status:statusSlice,
})

export const store = configureStore({
  reducer:rootReducer
})