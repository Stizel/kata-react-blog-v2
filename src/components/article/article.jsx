import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Spin } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames'

import { deleteArticle, fetchArticle, fetchArticles, setLike } from '../../services/articles-service'

import articleCard from './article.module.scss'

function Article({ article }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { slug } = useParams()

  const { location } = useSelector((state) => state.status)
  const { user } = useSelector((state) => state.user)
  const { username, token } = user

  const cardStyle =
    location === 'articles-list' ? articleCard.preview : classNames(articleCard.preview, articleCard.singleCard)

  const [modal, setModal] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const [loading, setLoading] = useState(true)
  const title = article.title.length < 1 ? 'NO TITLED ARTICLE' : article.title
  const articlePath = `/articles/${article.slug}`
  const { page, limit } = useSelector((state) => state.articles)

  useEffect(() => {
    setAvatar(article.avatarPath)
  }, [article.avatarPath])

  const printTags = (post) =>
    post.tags.map((tag) => {
      const tagStr = String(tag)
      if (tagStr.length > 20 || tagStr.length < 1) return null
      return (
        <li key={uuidv4()} className={articleCard.tag}>
          {tagStr}
        </li>
      )
    })

  const onLike = () => {
    if (token) {
      // eslint-disable-next-line no-unused-expressions
      dispatch(setLike(token, article.slug, article.liked))
      // eslint-disable-next-line no-unused-expressions
      location === 'article-page'
        ? dispatch(fetchArticle(article.slug, token))
        : dispatch(fetchArticles(page, limit, token))
    }
  }

  const onDelete = () => {
    dispatch(deleteArticle(token, slug))
    navigate('/')
  }
  const likeStyl = classNames(
    articleCard.blackLike,
    token && articleCard.activeLike,
    article.liked && articleCard.redLike
  )

  const editLink = `/articles/${slug}/edit`
  const deleteBtn = classNames(articleCard.btn, articleCard.delete)
  const editBtn = classNames(articleCard.btn, articleCard.edit)
  const yesBtn = classNames(articleCard.btn, articleCard.yes)
  const noBtn = classNames(articleCard.btn, articleCard.no)

  return (
    <div className={articleCard.cardWrapper}>
      <div className={cardStyle}>
        <section className={articleCard.content}>
          <div className={articleCard.titleWrapper}>
            <Link to={articlePath} className={articleCard.title}>
              {title}
            </Link>
            {/* eslint-disable-next-line react/button-has-type */}
            <button onClick={() => onLike()} className={likeStyl}>
              {article.likes}
            </button>
          </div>
          <ul className={articleCard.tags}>{printTags(article)}</ul>
          <p className={articleCard.description}>{article.description}</p>
        </section>
        <section className={articleCard.info}>
          <div className={articleCard.authInfo}>
            <div className={articleCard.infoWrapper}>
              <span className={articleCard.author}>{article.username}</span>
              <span className={articleCard.date}>{article.updatedDate}</span>
            </div>
            {loading && <Spin style={{ position: 'absolute', right: '30px', top: '20px' }} />}
            <img
              alt="avatar"
              src={avatar}
              className={articleCard.avatar}
              onLoad={() => {
                setLoading(false)
              }}
              onError={() => setAvatar('/no-avatar.png')}
            />
          </div>
          {location === 'article-page' && article.username === username && (
            <ul className={articleCard.control}>
              <li>
                <button className={deleteBtn} type="button" onClick={() => setModal(true)}>
                  Delete
                </button>
              </li>
              <li>
                <button type="button" className={editBtn} onClick={() => navigate(editLink)}>
                  Edit
                </button>
              </li>
            </ul>
          )}
        </section>
      </div>
      {/* eslint-disable-next-line react/no-children-prop */}
      {location === 'article-page' && <ReactMarkdown children={article.text} className={articleCard.pageText} />}

      {modal && (
        <div className={articleCard.modal}>
          <span className={articleCard.modalLabel}>Are you sure to delete this article?</span>
          <div className={articleCard.modalBtns}>
            <button type="button" className={noBtn} onClick={() => setModal(false)}>
              No
            </button>
            <button type="button" className={yesBtn} onClick={() => onDelete()}>
              Yes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Article