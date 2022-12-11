import React from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'

import newArticle from '../new-article/new-article.module.scss'
import { addTag, deleteTag, editTag } from '../../store/tags-slice'

const tagStyle = classNames(newArticle.input, newArticle.tag)
const deleteBtn = classNames(newArticle.btn, newArticle.delete)
const addBtn = classNames(newArticle.btn, newArticle.add)

function Tag({ id, idx, tagsLength, value }) {
  const lastOne = idx === tagsLength - 1

  const dispatch = useDispatch()

  const onDelete = () => {
    dispatch(deleteTag(id))
  }

  const onAdd = () => {
    dispatch(addTag())
  }
  const onLabelChange = (val) => {
    if (val !== undefined) {
      dispatch(
        editTag({
          id,
          label: val.trim(),
        })
      )
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Tag"
        defaultValue={value}
        className={tagStyle}
        onChange={(e) => onLabelChange(e.target.value)}
      />
      <button type="button" className={deleteBtn} onClick={onDelete}>
        Delete
      </button>
      {lastOne && (
        <button type="button" className={addBtn} onClick={onAdd}>
          Add Tag
        </button>
      )}
    </>
  )
}

export default Tag
