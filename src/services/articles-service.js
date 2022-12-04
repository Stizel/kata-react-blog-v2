import axios from "axios";
import {addArticles, addArticlesCount, setArticle} from "../store/article-slice";
import {setStatus} from "../store/status-slice";
import React from "react";
import {format} from "date-fns";


const baseUrl = 'https://blog.kata.academy';
const tagQuery = '';
const tag = tagQuery ? `&tag=${tagQuery}` : '';
const authorQuery = '';
const author = authorQuery ? `&author=${authorQuery}` : '';
const favQuery = '';
const favorited = favQuery ? `&favorited=${favQuery}` : '';

const getArticleItems = (articles) => articles.map((article) => {
  return {
    slug: article.slug,
    headerTitle: strCut(article.title, 40),
    title: article.title,
    likes: article.favoritesCount,
    tags: article.tagList,
    description: article.description,
    username: article.author.username,
    updatedDate: format(new Date(article.updatedAt), "MMMM d, yyyy"),
    avatarPath: article.author.image,
  };
});

const getArticleItem = (article) => {
  return {
    slug: article.slug,
    title: article.title,
    headerTitle: strCut(article.title, 40),
    likes: article.favoritesCount,
    tags: article.tagList,
    text: article.body,
    description: article.description,
    username: article.author.username,
    updatedDate: format(new Date(article.updatedAt), "MMMM d, yyyy"),
    avatarPath: article.author.image,
  };
};


export const fetchArticles = (page, limit) => async (dispatch) => {
  axios(`${baseUrl}/api/articles?${tag}${author}${favorited}&limit=${limit}&offset=${(page - 1) * limit}`)
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
  axios(`${baseUrl}/api/articles/${slug}`)
    .then((res) => res.data)
    .then((data) => {
      console.log(data.article)
      dispatch(setArticle(getArticleItem(data.article)));
      dispatch(setStatus('ok'));
    });
};


export const strCut = (str = "", length) => {
  let arr = str.split(' ');
  if (arr[0].length > 30) {
    const shortWord = str.substring(0, 60);
    return `${shortWord}...`;
  }
  if (str.length < length) {
    return str;
  }

  const newStr = str.substring(0, length);
  const lastSpace = newStr.lastIndexOf(' ');
  let shortDesc = newStr.slice(0, lastSpace);
  if (/[.,:]/.test(shortDesc.split(' ').pop())) {
    shortDesc = shortDesc.slice(0, -1);
  }
  return `${shortDesc}...`;
};

