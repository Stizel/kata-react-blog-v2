import React from 'react';
import signUp from './sign-up.module.scss';
import {Link} from "react-router-dom";
import {toggleLogin} from "../../store/status-slice";
import {useDispatch} from "react-redux";

const SignUp = () => {

  const dispatch = useDispatch()

  return (
    <div className={signUp.page}>
      <form className={signUp.form}>

        <h1 className={signUp.title}>Create new account</h1>

        <ul className={signUp.inputsList}>
          <li className={signUp.inputsItem}>
            <label htmlFor="name" className={signUp.label}>Username </label>
            <input className={signUp.input} type="text" name="name" id="name" placeholder="Username" required autoFocus/>
          </li>
          <li className={signUp.inputsItem}>
            <label htmlFor="email" className={signUp.label}>Email address </label>
            <input className={signUp.input} type="email" name="Email" id="email" placeholder="Email address" required/>
          </li>
          <li className={signUp.inputsItem}>
            <label htmlFor="password" className={signUp.label}>Password </label>
            <input className={signUp.input} type="password" name="password" id="password" placeholder="Password"
                   required/>
          </li>
          <li className={signUp.inputsItem}>
            <label htmlFor="repeat" className={signUp.label}>Repeat Password </label>
            <input className={signUp.input} type="password" name="repeat" id="repeat" placeholder="Password" required/>
          </li>
        </ul>
        <div className={signUp.agreement}>
          <input className={signUp.checkbox} type="checkbox" name="agreement" id="agreement" required/>
          <label htmlFor="agreement" className={signUp.checkLabel}>I agree
            to the processing of my personal information</label>
        </div>


        <button type="submit" className={signUp.submit}>Create</button>

        <span className={signUp.signInLabel}>Already have an account? <Link className={signUp.signIn} to="/sign-in"
                                                                            onClick={() => dispatch(toggleLogin())}>Sign In.</Link></span>

      </form>
    </div>
  );
};

export default SignUp;