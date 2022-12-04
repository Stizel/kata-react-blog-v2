import React from 'react';
import signUp from './sign-up.module.scss';
import {Link} from "react-router-dom";
import {toggleLogin} from "../../store/status-slice";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import classNames from 'classnames';

const SignUp = () => {

  const dispatch = useDispatch();

  const {register, formState: {errors}, handleSubmit} = useForm();
  const onSubmit = data => console.log(data);

  let emailInput = classNames(signUp.input);
  if (errors.email) emailInput = classNames(signUp.input, signUp.inputError);
  let passwordInput = classNames(signUp.input);
  if (errors.password) passwordInput = classNames(signUp.input, signUp.inputError);


  return (
    <div className={signUp.page}>
      <form className={signUp.form} onSubmit={handleSubmit(onSubmit)}>

        <h1 className={signUp.title}>Create new account</h1>

        <ul className={signUp.inputsList}>
          <li className={signUp.inputsItem}>
            <label htmlFor="name" className={signUp.label}>Username </label>
            <input className={signUp.input}  type="text" id="name" placeholder="Username" autoFocus/>
          </li>
          <li className={signUp.inputsItem}>
            <label htmlFor="email" className={signUp.label}>Email address </label>
            <input className={emailInput} {...register("email", {
              required: true, pattern: /^\S+@\S+\.\S+$/
            })} type="email" id="email" placeholder="Email address" />
          {errors.email ? <p className={signUp.error}>Email adress is not correct</p> : null}
          </li>
          <li className={signUp.inputsItem}>
            <label htmlFor="password" className={signUp.label}>Password </label>
            <input className={signUp.input} type="password" id="password" placeholder="Password"
                   />
          </li>
          <li className={signUp.inputsItem}>
            <label htmlFor="repeat" className={signUp.label}>Repeat Password </label>
            <input className={signUp.input} type="password" id="repeat" placeholder="Password" />
          </li>
        </ul>
        <div className={signUp.agreement}>
          <input className={signUp.checkbox} type="checkbox" name="agreement" id="agreement" />
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