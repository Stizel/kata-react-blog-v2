import {combineReducers, configureStore} from "@reduxjs/toolkit";
import articlesSlice from "./article-slice";
import statusSlice from "./status-slice";
import userSlice from "./user-slice";
import newArticleSlice from "./new-article-slice";

const rootReducer = combineReducers({
  user:userSlice,
  articles:articlesSlice,
  status:statusSlice,
  newArticle:newArticleSlice,
})

export const store = configureStore({
  reducer:rootReducer
})