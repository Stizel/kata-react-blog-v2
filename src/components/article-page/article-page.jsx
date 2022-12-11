import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchArticle } from '../../services/articles-service'
import Article from '../article/article'
import { setLocation, setStatus } from '../../store/status-slice'

import articlePageStyl from './article-page.module.scss'

function ArticlePage() {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const { token } = useSelector((state) => state.user.user)

  const { articles } = useSelector((state) => state.articles)
  const article = articles.find((item) => item.slug === slug)

  useEffect(() => {
    dispatch(setLocation('article-page'))
    dispatch(setStatus('loading'))
    dispatch(fetchArticle(slug, token))
  }, [dispatch, slug])

  const articleExist = article && Object.keys(article).length !== 0

  return <div className={articlePageStyl.main}>{articleExist && <Article article={article} />}</div>
}

export default ArticlePage
