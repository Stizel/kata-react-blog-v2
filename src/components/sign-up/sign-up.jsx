import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { registerUser } from '../../services/user-service'
import { setErrors } from '../../store/user-slice'

import signUp from './sign-up.module.scss'

function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = useForm()

  const dispatch = useDispatch()

  const servErr = useSelector((state) => state.user.errors)
  const { user } = useSelector((state) => state.user)

  const onSubmit = (data) => {
    dispatch(registerUser(data))
  }

  const navigate = useNavigate()
  const home = useSelector((state) => state.user.home)
  useEffect(() => {
    dispatch(setErrors(null))
    if (home) navigate('/')
  }, [home, dispatch, navigate])

  return (
    <div className={signUp.page}>
      <form className={signUp.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={signUp.title}>Create new account</h1>

        <ul className={signUp.inputsList}>
          <li className={signUp.inputsItem}>
            <label htmlFor="name" className={signUp.label}>
              Username{' '}
            </label>
            <input
              className={signUp.input}
              type="text"
              id="name"
              placeholder="Username"
              autoFocus
              style={errors.username && { outline: '1px solid #F5222D' }}
              {...register('username', {
                required: 'Your username can`t be empty.',
                minLength: {
                  value: 3,
                  message: 'Your username needs to be at least 3 characters.',
                },
                maxLength: {
                  value: 20,
                  message: 'Your username needs to be not more than 20 characters.',
                },
              })}
            />
            {servErr?.username && (
              <p className={signUp.error}>
                {user.username} {servErr?.username}
              </p>
            )}
            {errors.username && <p className={signUp.error}>{errors.username.message}</p>}
          </li>

          <li className={signUp.inputsItem}>
            <label htmlFor="email" className={signUp.label}>
              Email address{' '}
            </label>
            <input
              className={signUp.input}
              type="text"
              id="email"
              placeholder="Email address"
              onKeyUp={() => {
                setValue('email', watch('email').toLowerCase())
              }}
              style={errors.email && { outline: '1px solid #F5222D' }}
              {...register('email', {
                required: 'Your email address can`t be empty',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Your email address is not correct',
                },
              })}
            />
            {servErr?.email && (
              <p className={signUp.error}>
                {user.email} {servErr?.email}
              </p>
            )}
            {errors.email && <p className={signUp.error}>{errors.email.message}</p>}
          </li>

          <li className={signUp.inputsItem}>
            <label htmlFor="password" className={signUp.label}>
              Password{' '}
            </label>
            <input
              className={signUp.input}
              type="password"
              id="password"
              placeholder="Password"
              style={errors.password && { outline: '1px solid #F5222D' }}
              {...register('password', {
                required: 'Your password can`t be empty.',
                minLength: {
                  value: 6,
                  message: 'Your password needs to be at least 6 characters.',
                },
                maxLength: {
                  value: 40,
                  message: 'Your password needs to be not more than 40 characters.',
                },
              })}
            />
            {errors.password && <p className={signUp.error}>{errors.password.message}</p>}
          </li>

          <li className={signUp.inputsItem}>
            <label htmlFor="repeatPassword" className={signUp.label}>
              Repeat Password{' '}
            </label>
            <input
              className={signUp.input}
              type="password"
              id="repeatPassword"
              placeholder="Password"
              style={errors.repeatPassword && { outline: '1px solid #F5222D' }}
              {...register('repeatPassword', {
                required: 'Your password can`t be empty.',
                validate: (value) => {
                  const { password } = getValues()
                  return password === value || 'Passwords must match!'
                },
              })}
            />
            {errors.repeatPassword && <p className={signUp.error}>{errors.repeatPassword.message}</p>}
          </li>
        </ul>
        <div className={signUp.agreement}>
          <label htmlFor="agreement" className={signUp.checkLabel}>
            <input
              className={signUp.checkbox}
              type="checkbox"
              id="agreement"
              name="agreement"
              style={errors.agreement && { outline: '1px solid #F5222D' }}
              {...register('agreement', {
                required: 'You need to confirm user agreement',
              })}
            />
            I agree to the processing of my personal information
          </label>
        </div>
        {errors.agreement && <p className={signUp.error}>{errors.agreement.message}</p>}

        <button type="submit" className={signUp.submit}>
          Create
        </button>

        <span className={signUp.signInLabel}>
          Already have an account?{' '}
          <Link className={signUp.signIn} to="/sign-in">
            Sign In.
          </Link>
        </span>
      </form>
    </div>
  )
}

export default SignUp
