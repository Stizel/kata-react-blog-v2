import React, {useEffect} from 'react';
import {Alert, Pagination, Spin} from "antd";
import {Offline, Online} from 'react-detect-offline';
import articlesStyl from './articles-list.module.scss';
import {useDispatch, useSelector} from "react-redux";


import {fetchArticles} from "../../services/articles-service";

import {setLimit, setPage} from "../../store/article-slice";
import {setLocation, setStatus} from "../../store/status-slice";
import ArticleCard from "../article-card/article-card";


const ArticlesList = () => {

  const dispatch = useDispatch();
  const {articlesList, articlesCount, page, limit} = useSelector(state => state.articles);
  const status = useSelector(state => state.status.status);

  useEffect(() => {
    dispatch(setLocation('articles-list'));
    dispatch(setStatus('loading'));
    dispatch(fetchArticles(page, limit));
  }, [page, limit]);


  const articles = articlesList.map(article => {
    return <li key={article.slug}><ArticleCard article={article}/></li>;
  });

  const showContent = (status) => {
    switch (status) {
      case 'loading':
        return <Spin size={"large"}/>;
      case '404':
        return (<Alert
          message="По Вашему запросу ничего не найдено"
          description="Попробуйте изменить запрос"
          type="warning"
          showIcon
        />);
      case 'error':
        return (<Alert
          message="Ошибка сервера"
          description="Попробуйте перезагрузить страницу"
          type="error"
          showIcon
        />);
      default:
        return articles;
    }
  };

  const content = showContent(status);


  const onPaginationChange = (page, limit) => {
    dispatch(setPage(page));
    dispatch(setLimit(limit));
  };

  return (<div className={articlesStyl.main}>
    <Offline>
      <Alert
        className={articlesStyl.error}
        message="У вас нет интернет соединения!"
        description="Пожалуйста проверьте ваш кабель"
        type="error"
        showIcon
      />
    </Offline>
    <Online>
      <ul className={articlesStyl.list}>{content}</ul>
      {status !== 'error' && <Pagination
        className={articlesStyl.pag}
        hideOnSinglePage
        current={page}
        pageSize={limit}
        pageSizeOptions={[5, 10, 20, 40, 100, 500]}
        total={articlesCount}
        onChange={(page, pageSize) => onPaginationChange(page, pageSize)}
      />}
    </Online>
  </div>);
};

export default ArticlesList;