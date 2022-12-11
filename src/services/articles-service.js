import axios from 'axios'
import { format } from 'date-fns'

import { addArticle, addArticles, addArticlesCount, setLiked } from '../store/articles-slice'
import { setStatus } from '../store/status-slice'
import { goHome } from '../store/user-slice'

const baseUrl = 'https://blog.kata.academy/api'

const getArticleItem = (article) => ({
  slug: article.slug,
  title: article.title,
  likes: article.favoritesCount,
  tags: article.tagList,
  text: article.body,
  liked: article.favorited,
  description: article.description,
  username: article.author.username,
  updatedDate: format(new Date(article.updatedAt), 'MMMM d, yyyy'),
  avatarPath: article.author.image,
})

const getArticleItems = (articles) => articles.map((article) => getArticleItem(article))

const getHeaders = (token) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
})

export const fetchArticles =
  (page, limit, token = '') =>
  async (dispatch) =>
    axios(`${baseUrl}/articles?&limit=${limit}&offset=${(page - 1) * limit}`, { headers: getHeaders(token) })
      .then((res) => {
        dispatch(addArticles(getArticleItems(res.data.articles)))
        dispatch(addArticlesCount(res.data.articlesCount))
        dispatch(setStatus('ok'))
      })
      .catch((err) => {
        switch (err.code) {
          case 'ERR_BAD_REQUEST':
            dispatch(setStatus('404'))
            break
          default:
            dispatch(setStatus('error'))
            break
        }
      })

export const fetchArticle =
  (slug, token = '') =>
  async (dispatch) =>
    axios(`${baseUrl}/articles/${slug}`, { headers: getHeaders(token) }).then((res) => {
      dispatch(addArticle(getArticleItem(res.data.article)))
      dispatch(setStatus('ok'))
    })

export const postNewArticle = (data, tags, token) => async (dispatch) => {
  const article = JSON.stringify({ article: { ...data, tagList: tags } })
  return axios({
    url: `${baseUrl}/articles`,
    method: 'post',
    headers: getHeaders(token),
    data: article,
  })
    .then(() => {
      dispatch(setStatus('ok'))
      dispatch(goHome(true))
    })
    .catch(() => {
      dispatch(setStatus('error'))
    })
}

export const editArticle = (data, tags, token, slug) => async (dispatch) => {
  const article = JSON.stringify({ article: { ...data, tagList: tags } })
  return axios({
    url: `${baseUrl}/articles/${slug}`,
    method: 'put',
    headers: getHeaders(token),
    data: article,
  })
    .then((res) => res.data)
    .then(() => {
      dispatch(setStatus('ok'))
      dispatch(goHome(true))
    })
    .catch(() => {
      dispatch(setStatus('error'))
    })
}

export const deleteArticle = (token, slug) => async (dispatch) =>
  axios({
    url: `${baseUrl}/articles/${slug}`,
    method: 'delete',
    headers: getHeaders(token),
  })
    .then((res) => res.data)
    .then(() => {
      dispatch(setStatus('ok'))
      dispatch(goHome(true))
    })
    .catch(() => {
      dispatch(setStatus('error'))
    })

export const setLike = (token, slug, liked) => async (dispatch) =>
  axios({
    url: `${baseUrl}/articles/${slug}/favorite`,
    method: liked ? 'delete' : 'post',
    headers: getHeaders(token),
  })
    .then((res) => {
      dispatch(setStatus('ok'))
      dispatch(setLiked(getArticleItem(res.data.article)))
    })
    .catch(() => {
      dispatch(setStatus('error'))
    })
