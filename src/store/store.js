import { combineReducers, configureStore } from '@reduxjs/toolkit'

import articlesSlice from './articles-slice'
import statusSlice from './status-slice'
import userSlice from './user-slice'
import newArticleSlice from './tags-slice'

const rootReducer = combineReducers({
  user: userSlice,
  articles: articlesSlice,
  status: statusSlice,
  newArticle: newArticleSlice,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
