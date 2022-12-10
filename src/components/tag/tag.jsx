import React from 'react';

import classNames from "classnames";
import newArticle from "../new-article/new-article.module.scss";
import {useDispatch} from "react-redux";
import {addTag, deleteTag, editTag} from "../../store/new-article-slice";
import {v4 as uuidv4} from "uuid";

const tagStyle = classNames(newArticle.input, newArticle.tag);
const deleteBtn = classNames(newArticle.btn, newArticle.delete);
const addBtn = classNames(newArticle.btn, newArticle.add);


const Tag = ({id, idx, tagsLength,value}) => {

const lastOne = idx === tagsLength - 1

const dispatch = useDispatch()

  console.log(value)

  const onDelete = () => {
    dispatch(deleteTag(id))
  };

  const onAdd = () => {
    dispatch(addTag({id: uuidv4(), label: ''}))
  };
  const onLabelChange = (value) => {
    if (value!==undefined){
    dispatch(editTag({
      id,
      label:value.trim()
    }))
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder='Tag'
        defaultValue={value}
        className={tagStyle}
onChange={(e)=>onLabelChange(e.target.value)}
      />
      <button
        type="button"
        className={deleteBtn}
        onClick={onDelete}
      >
        Delete
      </button>
      {lastOne &&
        <button
          type="button"
          className={addBtn}
          onClick={onAdd}
        >
          Add Tag</button>}
    </>
  );
};

export default Tag;