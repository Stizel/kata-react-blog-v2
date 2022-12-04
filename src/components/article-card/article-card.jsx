import React, {useState} from 'react';
import articleCard from "./article-card.module.scss";
import ReactMarkdown from "react-markdown";
import {Spin} from "antd";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {strCut} from "../../services/articles-service";
import classNames from "classnames";


const ArticleCard = ({article}) => {

  const {location} = useSelector(state => state.status);

  let cardStyle = classNames(location === 'articles-list'
    ? articleCard.preview
    : classNames(articleCard.preview, articleCard.singleCard));

  let titleStyle = classNames(location === 'articles-list'
    ? articleCard.title
    : classNames(articleCard.title, articleCard.titleFull));

  const [avatar, setAvatar] = useState(article.avatarPath);
  const [loading, setLoading] = useState(true);

  const articlePath = `/articles/${article.slug}`;


  const printTags = (article) => {
    return article.tags.map(tag => {
      const tagStr = String(tag);
      if (tagStr.length > 20) return null;
      const cutedTag = strCut(tagStr, 20);
      if (tagStr.length !== 0)
        return (
          <li key={uuidv4()} className={articleCard.tag}>{cutedTag}</li>
        );
    });
  };


  return (<div className={articleCard.cardWrapper}>
      <div className={cardStyle}>
        <section className={articleCard.content}>
          <div className={articleCard.titleWrapper}>
            <Link to={articlePath} className={titleStyle}>{article.title}</Link>
            <span className={articleCard.likes}>
              {article.likes}
            </span>
          </div>
          <ul className={articleCard.tags}>{printTags(article)}</ul>
          <p className={articleCard.description}>{article.description}</p>
        </section>
        <section className={articleCard.info}>
          <div className={articleCard.infoWrapper}>
            <span className={articleCard.author}>{article.username}</span>
            <span className={articleCard.date}>{article.updateDate}</span>
          </div>

          {loading && <Spin
            style={{position: "absolute", right: "30px", top: '20px'}}
          />}
          <img
            alt ="avatar"
            src={avatar}
            className={articleCard.avatar}
            onLoad={() => {
              setLoading(false);
            }}
            onError={() =>
              setAvatar('/no-avatar.png')
            }
          />

        </section>
      </div>
      {location === 'article-page' && <ReactMarkdown children={article.text} className={articleCard.pageText}/>}
    </div>
  );
};

export default ArticleCard;