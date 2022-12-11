import React, { useEffect } from 'react'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import Tag from '../tag/tag'
import { editArticle, fetchArticle, postNewArticle } from '../../services/articles-service'
import { setErrors } from '../../store/user-slice'
import { addTag, createTags } from '../../store/tags-slice'

import newArticle from './new-article.module.scss'

const areaStyle = classNames(newArticle.input, newArticle.textarea)
const sendBtn = classNames(newArticle.btn, newArticle.send)

function NewArticle() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { slug } = useParams()

  const { articles } = useSelector((state) => state.articles)
  const article = articles.find((item) => item.slug === slug)
  const { tags } = useSelector((state) => state.newArticle)
  const { token } = useSelector((state) => state.user.user)
  const home = useSelector((state) => state.user.home)

  const tagz = tags.map((tag, idx) => (
    <li key={tag.id} className={newArticle.tagWrapper}>
      <Tag idx={idx} id={tag.id} value={tag.label} tagsLength={tags.length} />
    </li>
  ))

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const sendTags = tags.map((tag) => tag.label).filter((tag) => tag !== '')

  const onSubmit = (data) => {
    // eslint-disable-next-line no-unused-expressions
    slug ? dispatch(editArticle(data, sendTags, token, slug)) : dispatch(postNewArticle(data, sendTags, token))
  }

  useEffect(() => {
    if (slug) dispatch(fetchArticle(slug))
  }, [dispatch, slug])

  useEffect(() => {
    dispatch(setErrors(null))
    if (!token) navigate('/')
    if (home) navigate('/')
  }, [home, dispatch, navigate, token])

  useEffect(() => {
    if (slug && article && Object.keys(article).length > 0) {
      const newTags = []
      article.tags.forEach((tag) => {
        newTags.push({
          id: uuidv4(),
          label: tag,
        })
      })
      dispatch(createTags(newTags))
    } else {
      dispatch(addTag())
    }
  }, [article, slug, dispatch])

  return (
    <div className={newArticle.main}>
      <form className={newArticle.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={newArticle.title}>{slug ? 'Edit article' : 'Create new article'}</h1>
        <ul className={newArticle.inputsList}>
          <li className={newArticle.inputsItem}>
            <label htmlFor="title" className={newArticle.label}>
              Title
              <input
                id="title"
                type="text"
                placeholder="Title"
                className={newArticle.input}
                defaultValue={slug && article && article.title}
                {...register('title', {
                  required: 'Title can`t be empty.',
                })}
              />
            </label>
            {errors.title && <p className={newArticle.error}>{errors.title.message}</p>}
          </li>

          <li className={newArticle.inputsItem}>
            <label htmlFor="description" className={newArticle.label}>
              Short description
              <input
                id="description"
                type="text"
                placeholder="Short description"
                className={newArticle.input}
                defaultValue={slug && article && article.description}
                {...register('description', {
                  required: 'Description can`t be empty.',
                })}
              />
            </label>
            {errors.description && <p className={newArticle.error}>{errors.description.message}</p>}
          </li>

          <li className={newArticle.inputsItem}>
            <label htmlFor="text" className={newArticle.label}>
              Text
              <textarea
                id="text"
                placeholder="Text"
                className={areaStyle}
                defaultValue={slug && article && article.text}
                {...register('body', {
                  required: 'Text can`t be empty.',
                })}
              />
            </label>
            {errors.body && <p className={newArticle.error}>{errors.body.message}</p>}
          </li>

          <li className={newArticle.inputsItem}>
            <label htmlFor="tags" className={newArticle.label}>
              Tags
              <ul className={newArticle.tagsList}>{tagz}</ul>
            </label>
          </li>
        </ul>
        <button type="submit" className={sendBtn}>
          Send
        </button>
      </form>
    </div>
  )
}

export default NewArticle
