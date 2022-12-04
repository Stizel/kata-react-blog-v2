import React from 'react';
import header from './header.module.scss';
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {toggleLogin} from "../../store/status-slice";
import {Link} from "react-router-dom";

const link = classNames(header['link']);
const signUp = classNames(link, header.signUp);
const createArticle = classNames(link, header["create-article"]);
const logOut = classNames(link, header['log-out']);


const Header = () => {

  const dispatch = useDispatch();

  const login = useSelector(state => state.status.login);


  const headerAuthorization = (
    <ul className={header.authorization}>
      <li>
        <Link className={link} onClick={() => dispatch(toggleLogin())} to="/sign-in">
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
      <Link to='/create-article' className={createArticle}>Create article</Link>
      <Link to='/profile' className={header.user}>
        <span className={header["user__name"]}>John Doe</span>
        <img className={header["user__avatar"]} src="/avatar.png" alt="avatar"/>
      </Link>
      <Link to='/' className={logOut} onClick={() => dispatch(toggleLogin())}>Log Out</Link>
    </div>
  );

  return (
    <div className={header.main}>
      <Link to="/articles" className={header.label}>Realworld Blog</Link>
      {login ? headerMenu : headerAuthorization}
    </div>
  );
};

export default Header;