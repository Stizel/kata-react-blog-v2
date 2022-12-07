import React, {useEffect} from 'react';
import signIn from './sign-in.module.scss';
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {loginUser} from "../../services/user-service";
import {useDispatch, useSelector} from "react-redux";
import {setErrors} from "../../store/user-slice";
import signUp from "../sign-up/sign-up.module.scss";

const SignIn = () => {

  const {register, formState: {errors}, handleSubmit,setValue,watch} = useForm();

  const servErr = useSelector(state => state.user.errors)

  const dispatch = useDispatch()

  const onSubmit = data => {
        dispatch(loginUser(data));
  };

  const navigate = useNavigate()
  const home = useSelector(state => state.user.home)
  useEffect(()=>{
    dispatch(setErrors(null))
    if (home) navigate('/')
  },[home,dispatch,navigate])

  return (
    <div className={signIn.page}>
      <form className={signIn.form} onSubmit={handleSubmit(onSubmit)}>

        <h1 className={signIn.title}>Sign In</h1>

        <ul className={signIn.inputsList}>
          <li className={signIn.inputsItem}>
            <label htmlFor="email" className={signIn.label}>Email address </label>
            <input
              className={signIn.input}
              type="email"
              id="email"
              placeholder="Email address"
              autoFocus
              onKeyUp={() => {
                setValue('email', watch('email').toLowerCase());
              }}
              style={errors.email && {outline:"1px solid #F5222D"}}
              {...register("email", {
                required: "Email address can't be empty",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Email address is not correct",
                }
              })}
            />
            {errors.email && <p className={signIn.error}>{errors.email.message}</p>}
          </li>
          <li className={signIn.inputsItem}>
            <label htmlFor="password" className={signIn.label}>Password </label>
            <input
              className={signIn.input}
              type="password"
              id="password"
              placeholder="Password"
              style={errors.password && {outline:"1px solid #F5222D"}}
              {...register("password", {
                required: "Password can't be empty."
              })}
            />
            {errors.password && <p className={signIn.error}>{errors.password.message}</p>}
            {servErr &&
              <p className={signUp.error}>{`${Object.entries(servErr)[0][0]} ${Object.entries(servErr)[0][1]}`}</p>}
          </li>
        </ul>

        <button type="submit" className={signIn.submit}>Sign In</button>

        <span className={signIn.signInLabel}>Don't have an account? <Link className={signIn.signUp} to="/sign-up">Sign Up.</Link></span>

      </form>
    </div>
  );
};

export default SignIn;