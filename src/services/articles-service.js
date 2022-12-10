import axios from "axios";
import {addArticles, addArticlesCount, setArticle} from "../store/article-slice";
import {setStatus} from "../store/status-slice";
import {format} from "date-fns";
import {goHome} from "../store/user-slice";


const baseUrl = 'https://blog.kata.academy/api';
const tagQuery = '';
const tag = tagQuery ? `&tag=${tagQuery}` : '';
const authorQuery = '';
const author = authorQuery ? `&author=${authorQuery}` : '';
const favQuery = '';
const favorited = favQuery ? `&favorited=${favQuery}` : '';

const getArticleItems = (articles) =>
  articles.map((article) =>
    getArticleItem(article));

const getArticleItem = (article) => {
  console.log(article)
  return {
    slug: article.slug,
    title: article.title,
    headerTitle: strCut(article.title, 40),
    likes: article.favoritesCount,
    tags: article.tagList,
    text: article.body.trim(),
    description: article.description,
    username: article.author.username,
    updatedDate: format(new Date(article.updatedAt), "MMMM d, yyyy"),
    avatarPath: article.author.image,
  };
};


export const fetchArticles = (page, limit) => async (dispatch) => {
  axios(`${baseUrl}/articles?${tag}${author}${favorited}&limit=${limit}&offset=${(page - 1) * limit}`)
    .then((res) => res.data)
    .then((data) => {
      if (data.articles.length !== 0) {
        console.log("newArt>", getArticleItems(data.articles));
        dispatch(addArticles(getArticleItems(data.articles)));
        dispatch(addArticlesCount(data.articlesCount));
        dispatch(setStatus('ok'));
      } else {
        dispatch(setStatus('404'));
      }
    })
    .catch((err) => {
      console.log("err Code>", err.code, err);
      switch (err.code) {
        case "ERR_BAD_REQUEST":
          dispatch(setStatus('404'));
          break;
        case "ERR_NETWORK":
          dispatch(setStatus('error'));
          break;
        default:
          dispatch(setStatus('error'));
          break;
      }
    });
};


export const fetchArticle = (slug) => async (dispatch) => {
  axios(`${baseUrl}/articles/${slug}`)
    .then((res) => res.data)
    .then((data) => {
      console.log(data.article);
      dispatch(setArticle(getArticleItem(data.article)));
      dispatch(setStatus('ok'));
    });
};


export const strCut = (str = "", length) => {

  const newStr = str.substring(0, length);
  const lastSpace = newStr.lastIndexOf(' ');
  let shortDesc = newStr.slice(0, lastSpace);
  if (/[.,:]/.test(shortDesc.split(' ').pop())) {
    shortDesc = shortDesc.slice(0, -1);
  }
  return `${shortDesc}...`;
};


export const postNewArticle = (data, tags, token) => async (dispatch) => {

  const article = JSON.stringify({
    article: {
      ...data,
      tagList: tags
    }
  });

  axios({
    url: `${baseUrl}/articles`,
    method: "post",
    headers:
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    data: article
  })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      dispatch(setStatus('ok'));
      dispatch(goHome(true));
    })
    .catch((err) => {
      console.log("err Code>", err.code, err);
      switch (err.code) {
        case "ERR_BAD_REQUEST":
          dispatch(setStatus('404'));
          break;
        case "ERR_NETWORK":
          dispatch(setStatus('error'));
          break;
        case "ERR_BAD_RESPONSE":
          console.log(article)
          console.log(err.response.data)
          dispatch(setStatus('error'));
          break;
        default:
          dispatch(setStatus('error'));
          break;
      }
    });
};


export const editArticle = (data, tags, token,slug) => async (dispatch) => {

  const article = JSON.stringify({
    article: {
      ...data,
      tagList: tags
    }
  });

  axios({
    url: `${baseUrl}/articles/${slug}`,
    method: "put",
    headers:
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    data: article
  })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      dispatch(setStatus('ok'));
      dispatch(goHome(true));
    })
    .catch((err) => {
      console.log("err Code>", err.code, err);
      switch (err.code) {
        case "ERR_BAD_REQUEST":
          dispatch(setStatus('404'));
          break;
        case "ERR_NETWORK":
          dispatch(setStatus('error'));
          break;
        case "ERR_BAD_RESPONSE":
          console.log(article)
          console.log(err.response.data)
          dispatch(setStatus('error'));
          break;
        default:
          dispatch(setStatus('error'));
          break;
      }
    });
};

export const deleteArticle = (token,slug) => async (dispatch) => {
  axios({
    url: `${baseUrl}/articles/${slug}`,
    method: "delete",
    headers:
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
  })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      dispatch(setStatus('ok'));
      dispatch(goHome(true));
    })
    .catch((err) => {
      console.log("err Code>", err.code, err);
      switch (err.code) {
        case "ERR_BAD_REQUEST":
          dispatch(setStatus('404'));
          break;
        case "ERR_NETWORK":
          dispatch(setStatus('error'));
          break;
        case "ERR_BAD_RESPONSE":
          console.log(err.response.data)
          dispatch(setStatus('error'));
          break;
        default:
          dispatch(setStatus('error'));
          break;
      }
    });
};