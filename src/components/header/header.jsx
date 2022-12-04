import React from 'react';
import header from './header.module.scss';
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {toggleLogin} from "../../store/status-slice";
import {Link} from "react-router-dom";

const btn = classNames(header['btn']);
const signUp = classNames(btn, header.signUp);
const createArticle = classNames(btn, header["create-article"]);
const logOut = classNames(btn, header['log-out']);


const Header = () => {

  const dispatch = useDispatch();

  const login = useSelector(state => state.status.login);


  const headerAuthorization = (
    <ul className={header.authorization}>
      <li>
        <button className={btn} type="button" onClick={() => dispatch(toggleLogin())}>Sign In</button>
      </li>
      <li>
        <button className={signUp} type="button">Sign Up</button>
      </li>
    </ul>
  );

  const headerMenu = (
    <div className={header.menu}>
      <button type="button" className={createArticle}>Create article</button>
      <div className={header.user}>
        <span className={header["user__name"]}>John Doe</span>
        <img className={header["user__avatar"]} src="/avatar.png" alt='avatar'/>
      </div>
      <button type="button" className={logOut} onClick={() => dispatch(toggleLogin())}>Log Out</button>
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