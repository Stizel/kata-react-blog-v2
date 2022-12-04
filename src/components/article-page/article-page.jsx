import React, {useEffect} from 'react';
import articlePageStyl from './article-page.module.scss';
import {useParams} from "react-router-dom";
import {fetchArticle} from "../../services/articles-service";
import {useDispatch, useSelector} from "react-redux";
import ArticleCard from "../article-card/article-card";
import {setLocation, setStatus} from "../../store/status-slice";



const ArticlePage = () => {
  const {slug} = useParams();
  const dispatch = useDispatch()


  const {article} = useSelector(state => state.articles)
console.log(article)
  useEffect(() => {
    dispatch(setLocation('article-page'));
    dispatch(setStatus('loading'));
    dispatch(fetchArticle(slug))
  }, [dispatch,slug]);


const articleExist = Object.keys(article).length !==0
  return (
    <div className={articlePageStyl.main}>
      {articleExist && <ArticleCard article={article}/>}
    </div>
  );
};

export default ArticlePage;