import React from 'react';
import profile from "./profile.module.scss";
import {useForm} from "react-hook-form";

const Profile = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(watch("example"));
  return (
    <div className={profile.page}>
      <form className={profile.form}>

        <h1 className={profile.title}>Edit Profile</h1>

        <ul className={profile.inputsList}>
          <li className={profile.inputsItem}>
            <label htmlFor="name" className={profile.label}>Username</label>
            <input className={profile.input} type="text" name="name" id="name" placeholder="Username" required autoFocus/>
          </li>
          <li className={profile.inputsItem}>
            <label htmlFor="email" className={profile.label}>Email address</label>
            <input className={profile.input} type="email" name="Email" id="email" placeholder="Email address" required/>
          </li>
          <li className={profile.inputsItem}>
            <label htmlFor="password" className={profile.label}>New password</label>
            <input className={profile.input} type="password" name="password" id="password" placeholder="New password"
                   required/>
          </li>
          <li className={profile.inputsItem}>
            <label htmlFor="avatar" className={profile.label}>Avatar image (url)</label>
            <input className={profile.input} type="text" name="avatar" id="avatar" placeholder="Avatar image" required/>
          </li>
        </ul>

        <button type="submit" className={profile.submit}>Save</button>


      </form>
    </div>
  );
};

export default Profile;