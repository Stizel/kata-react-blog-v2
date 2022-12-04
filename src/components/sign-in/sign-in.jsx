import React from 'react';
import signIn from './sign-in.module.scss';
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import classNames  from 'classnames';

const SignIn = () => {

  const {register, formState: {errors}, handleSubmit} = useForm();
  const onSubmit = data => console.log(data);

  let emailInput = classNames(signIn.input)
  if (errors.email) emailInput = classNames(signIn.input,signIn.inputError)
  let passwordInput = classNames(signIn.input)
  if (errors.password) passwordInput = classNames(signIn.input,signIn.inputError)

  return (
    <div className={signIn.page}>
      <form className={signIn.form} onSubmit={handleSubmit(onSubmit)}>

        <h1 className={signIn.title}>Sign In</h1>

        <ul className={signIn.inputsList}>
          <li className={signIn.inputsItem}>
            <label htmlFor="email" className={signIn.label}>Email address </label>
            <input className={emailInput}  {...register("email", {
              required: true, pattern: /^\S+@\S+\.\S+$/
            })} type="email" id="email" placeholder="Email address"/>
            {errors.email ? <p className={signIn.error}>Email adress is not correct</p> : null}
          </li>
          <li className={signIn.inputsItem}>
            <label htmlFor="password" className={signIn.label}>Password </label>
            <input className={passwordInput} {...register("password",{required:true})} id="password" type="password"  placeholder="Password"/>
            {errors.password ? <p className={signIn.error}>Password can't be empty</p> : null}
          </li>
        </ul>

        <button type="submit" className={signIn.submit}>Create</button>

        <span className={signIn.signInLabel}>Don't have an account? <Link className={signIn.signUp} to="/sign-up">Sign Up.</Link></span>

      </form>
    </div>
  );
};

export default SignIn;