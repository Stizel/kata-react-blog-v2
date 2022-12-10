import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";

const newArticleSlice = createSlice({
  name: "new-article",
  initialState: {
    tags: []
  },
  reducers: {
    createTags(state,action){
      state.tags = action.payload
    },
    addTag(state) {
      state.tags.push({id: uuidv4(), label: ''});
    },
    deleteTag(state, action) {
      state.tags = state.tags.filter(tag => {
        return tag.id !== action.payload;
      });
    },
    editTag(state, action) {
      const {tags} = state
      state.tags = tags.map(tag => tag.id === action.payload.id ? action.payload : tag);
    }
  }
});

export default newArticleSlice.reducer;
export const {
  addTag,
  deleteTag,
  editTag,
  createTags
} = newArticleSlice.actions;



