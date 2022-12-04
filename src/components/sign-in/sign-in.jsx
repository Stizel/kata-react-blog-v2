import React from 'react';
import signIn from './sign-in.module.scss';
import {Link} from "react-router-dom";

const SignIn = () => {

  return (
    <div className={signIn.page}>
      <form className={signIn.form}>

        <h1 className={signIn.title}>Sign In</h1>

        <ul className={signIn.inputsList}>
          <li className={signIn.inputsItem}>
            <label htmlFor="email" className={signIn.label}>Email address </label>
            <input className={signIn.input} type="email" name="Email" id="email" placeholder="Email address" required/>
          </li>
          <li className={signIn.inputsItem}>
            <label htmlFor="password" className={signIn.label}>Password </label>
            <input className={signIn.input} type="password" name="password" id="password" placeholder="Password"
                   required/>
          </li>
        </ul>

        <button type="submit" className={signIn.submit}>Create</button>

        <span className={signIn.signInLabel}>Don't have an account? <Link className={signIn.signUp} to="/sign-up">Sign Up.</Link></span>

      </form>
    </div>
  );
};

export default SignIn;