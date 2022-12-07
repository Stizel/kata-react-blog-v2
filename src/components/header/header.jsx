import React, {useEffect} from 'react';
import header from './header.module.scss';
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {logOut} from "../../store/user-slice";
import {getUser} from "../../services/user-service";

const link = classNames(header['link']);
const signUp = classNames(link, header.signUp);
const createArticle = classNames(link, header["create-article"]);
const logOutBtn = classNames(link, header['log-out']);


const Header = () => {

  const dispatch = useDispatch();
  const token = useSelector(state => state.user.user.token);
  const user = useSelector(state => state.user.user);
  const avatar = user.image ? user.image : '/avatar.png';

  const onLogOut = () => {
    localStorage.removeItem('user');
    dispatch(logOut());
  };

  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [token, dispatch]);


  const headerAuthorization = (
    <ul className={header.authorization}>
      <li>
        <Link className={link} to="/sign-in">
          Sign In
        </Link>
      </li>
      <li>
        <Link className={signUp} to="/sign-up">
          Sign Up
        </Link>
      </li>
    </ul>
  );

  const headerMenu = (
    <div className={header.menu}>
      <Link to="/create-article" className={createArticle}>Create article</Link>
      <Link to="/profile" className={header.user}>
        <span className={header["user__name"]}>{user.username}</span>
        <img className={header["user__avatar"]} src={avatar} alt="avatar"/>
      </Link>
      <Link to="/" className={logOutBtn} onClick={() => onLogOut()}>Log Out</Link>
    </div>
  );

  return (
    <div className={header.main}>
      <Link to="/articles" className={header.label}>Realworld Blog</Link>
      {token ? headerMenu : headerAuthorization}
    </div>
  );
};

export default Header;