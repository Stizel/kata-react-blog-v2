import React, {useEffect} from 'react';
import newArticle from "./new-article.module.scss";
import classNames from "classnames";
import Tag from "../tag/tag";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {editArticle, fetchArticle, postNewArticle} from "../../services/articles-service";
import {useNavigate, useParams} from "react-router-dom";
import {setErrors} from "../../store/user-slice";
import {addTag, createTags} from "../../store/new-article-slice";
import {v4 as uuidv4} from "uuid";


const areaStyle = classNames(newArticle.input, newArticle.textarea);
const sendBtn = classNames(newArticle.btn, newArticle.send);

const NewArticle = () => {
  const {slug} = useParams();
  const dispatch = useDispatch();

  const {article} = useSelector(state => state.articles);
  const {tags} = useSelector(state => state.newArticle);
  const {token} = useSelector(state => state.user.user);


  console.log(tags);
  const tagz = tags.map((tag, idx) => {
    console.log(tag);
    return (
      <li key={tag.id} className={newArticle.tagWrapper}>
        <Tag idx={idx} id={tag.id} value={tag.label} tagsLength={tags.length}/>
      </li>
    );
  });

  const navigate = useNavigate();


  const {register, formState: {errors}, handleSubmit} = useForm();

  const sendTags = tags.map(tag => tag.label).filter(tag => tag !== '');

  const onSubmit = data => {
    slug ? dispatch(editArticle(data, sendTags, token, slug)) :
      dispatch(postNewArticle(data, sendTags, token));
  };

  const home = useSelector(state => state.user.home);

  useEffect(() => {
    dispatch(setErrors(null));
    if (!token) navigate('/');
    if (home) navigate('/');
    if (slug && Object.keys(article).length > 0) {
      let newTags = [];
      article.tags.forEach((tag) => {
        newTags.push({
          id: uuidv4(),
          label: tag
        });
      });
      dispatch(createTags(newTags));

    } else {
      dispatch(addTag());
    }

  }, [home, dispatch, navigate,article,slug,token]);

  useEffect(() => {
    if (slug) dispatch(fetchArticle(slug));
  }, [dispatch,slug]);


  return (
    <div className={newArticle.main}>
      <form className={newArticle.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={newArticle.title}>{slug ? 'Edit article' : 'Create new article'}</h1>
        <ul className={newArticle.inputsList}>
          <li className={newArticle.inputsItem}>
            <label htmlFor="title" className={newArticle.label}>Title</label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              className={newArticle.input}
              defaultValue={slug && article.title}
              {...register("title",
                {
                  required: "Title can't be empty.",
                })}
            />
            {errors.title &&
              <p className={newArticle.error}>{errors.title.message}</p>}
          </li>

          <li className={newArticle.inputsItem}>
            <label htmlFor="description" className={newArticle.label}>Short description</label>
            <input
              id="description"
              type="text"
              placeholder="Short description"
              className={newArticle.input}
              defaultValue={slug && article.description}
              {...register("description",
                {
                  required: "Description can't be empty.",
                })}
            />
            {errors.description &&
              <p className={newArticle.error}>{errors.description.message}</p>}

          </li>

          <li className={newArticle.inputsItem}>
            <label htmlFor="text" className={newArticle.label}>Text</label>
            <textarea
              id="text"
              placeholder="Text"
              className={areaStyle}
              defaultValue={slug && article.text}
              {...register("body",
                {
                  required: "Text can't be empty.",
                })}
            />
            {errors.body &&
              <p className={newArticle.error}>{errors.body.message}</p>}
          </li>

          <li className={newArticle.inputsItem}>
            <label htmlFor="tags" className={newArticle.label}>Tags</label>
            <ul className={newArticle.tagsList}>
              {tagz}
            </ul>
          </li>

        </ul>

        <button type="submit" className={sendBtn}>Send</button>

      </form>
    </div>
  );
};

export default NewArticle;