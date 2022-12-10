import {createSlice} from "@reduxjs/toolkit";

const articlesSlice = createSlice({
  name: "article",
  initialState: {
    articlesList: [],
    article: {},
    articlesCount: 0,
    page: 1,
    limit: 5,
  },
  reducers: {
    addArticles(state, action) {
      state.articlesList = action.payload;
    },
    addArticlesCount(state, action) {
      state.articlesCount = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
    setArticle(state, action) {
      state.article = action.payload;
    },

  }
});

export default articlesSlice.reducer;
export const {
  addArticles,
  addArticlesCount,
  setPage,
  setLimit,
  setArticle,
} = articlesSlice.actions;



