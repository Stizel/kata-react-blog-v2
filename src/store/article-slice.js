import {createSlice, current} from "@reduxjs/toolkit";

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
    setLiked (state,action){
      console.log("setLiked")
      console.log(current(state),action)
      state.articlesList = state.articlesList.map(art=>{
          return art.slug === action.payload.slug ? action.payload :art
      })
      state.article = action.payload
    }

  }
});

export default articlesSlice.reducer;
export const {
  addArticles,
  addArticlesCount,
  setPage,
  setLimit,
  setArticle,
  setLiked
} = articlesSlice.actions;



