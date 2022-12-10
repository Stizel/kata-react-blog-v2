import React from 'react';
import profile from "./profile.module.scss";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../services/user-service";
import signUp from "../sign-up/sign-up.module.scss";


const Profile = () => {

  const {register, formState: {errors}, handleSubmit} = useForm();


  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const servErr = useSelector(state => state.user.errors);
  const onSubmit = data => dispatch(updateUser(data));
console.log(user)

  return (
    <div className={profile.page}>
      <form className={profile.form} onSubmit={handleSubmit(onSubmit)}>

        <h1 className={profile.title}>Edit Profile</h1>

        <ul className={profile.inputsList}>
          <li className={profile.inputsItem}>
            <label htmlFor="name" className={profile.label}>Username</label>
            <input
              className={profile.input}
              type="text"
              id="name"
              placeholder="Username"
              defaultValue={user.username}
              autoFocus
              style={errors.username && {outline: "1px solid #F5222D"}}
              {...register("username",
                {
                  required: "Your username can't be empty.",
                  minLength: {
                    value: 3,
                    message: "Your username needs to be at least 3 characters."
                  },
                  maxLength: {
                    value: 20,
                    message: "Your username needs to be not more than 20 characters."
                  }
                })}
            />
            {errors.username &&
              <p className={profile.error}>{errors.username.message}</p>}
            {servErr?.username &&
              <p className={signUp.error}>{user.username} {servErr?.username}</p>}
          </li>

          <li className={profile.inputsItem}>
            <label htmlFor="email" className={profile.label}>Email address</label>
            <input
              className={profile.input}
              type="email"
              id="email"
              placeholder="Email address"
              defaultValue={user.email}
              style={errors.email && {outline: "1px solid #F5222D"}}
              {...register("email", {
                required: "Your email address can't be empty",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Your email address is not correct"
                }
              })}
            />
            {errors.email && <p className={profile.error}>{errors.email.message}</p>}
            {servErr?.email &&
              <p className={signUp.error}>{user.email} {servErr?.email}</p>}
          </li>

          <li className={profile.inputsItem}>
            <label htmlFor="password" className={profile.label}>New password</label>
            <input
              className={profile.input}
              type="password"
              id="password"
              placeholder="New password"
              style={errors.password && {outline: "1px solid #F5222D"}}
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "Your password needs to be at least 6 characters."
                },
                maxLength: {
                  value: 40,
                  message: "Your password needs to be not more than 40 characters."
                }
              })}
            />
            {errors.password &&
              <p className={profile.error}>{errors.password.message}</p>}
          </li>

          <li className={profile.inputsItem}>
            <label htmlFor="avatar" className={profile.label}>Avatar image (url)</label>
            <input
              className={profile.input}
              type="text"
              id="avatar"
              placeholder="Avatar image"
              defaultValue={user.image}
              style={errors.image && {outline: "1px solid #F5222D"}}
              {...register("image", {
                pattern: {
                  value: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                  message: "Your url link is not correct"
                }
              })}
            />
            {errors.image &&
              <p className={profile.error}>{errors.image.message}</p>}
          </li>
        </ul>

        <button type="submit" className={profile.submit}>Save</button>

      </form>
    </div>
  );
};

export default Profile;