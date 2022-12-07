import axios from "axios";
import {goHome, setErrors, setUser} from "../store/user-slice";

const baseUrl = 'https://blog.kata.academy/api';

const fetchUser = axios.create({
  baseURL: `${baseUrl}`,
  method: 'post',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});


export const registerUser = (data) => async (dispatch) => {
  const user = JSON.stringify({
    user: data
  });
  fetchUser({
    url: '/users',
    data: user
  })
    .then((res) => res.data)
    .then((data) => {
      console.log('register if no error', data.user);
      dispatch(getUser(data.user.token));
      dispatch(setErrors(null));
    })
    .catch((err) => {
      console.log(err);
      if (err?.response?.status === 422) {
        console.log("if error:", JSON.parse(user));
        dispatch(setUser(JSON.parse(user)));
        dispatch(setErrors(err.response.data.errors));
      }
    });
};

export const loginUser = (data) => async (dispatch) => {
  const user = JSON.stringify({
    user: data
  });
  fetchUser({
    url: '/users/login',
    data: user
  })
    .then((res) => res.data)
    .then((data) => {
      console.log('if no error', data.user);
      dispatch(getUser(data.user.token));
      dispatch(setErrors(null));
      localStorage.setItem('token', data.user.token);
    })
    .catch((err) => {
      console.log("if error login user:", err);
      if (err.response.status === 422) {
        console.log("if error login user:", JSON.parse(user), err.response.data.errors);
        dispatch(setUser(JSON.parse(user)));
        dispatch(setErrors(err.response.data.errors));
      }
    });
};

export const getUser = (token) => async (dispatch) => {
  axios({
    url: `${baseUrl}/user`,
    method: 'get',
    headers:
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
  })
    .then((res) => res.data)
    .then((data) => {
      console.log(data.user)
      dispatch(setUser({user: data.user}));
      dispatch(setErrors(null));
      localStorage.setItem('token', data.user.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch(goHome(true));
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data.errors));
    });
};

export const updateUser = (data) => async (dispatch) => {
  console.log(data)
  const token = localStorage.getItem('token');

  const user = JSON.stringify({
    user: data
  });
  console.log('from update', user);

  axios({
    url: `${baseUrl}/user`,
    method: 'put',
    headers:
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    data: user
  })
    .then((res) => res.data)
    .then((data) => {
      console.log('from update ok ',data.user)
      dispatch(getUser(data.user.token));
      dispatch(setErrors(null));
      localStorage.setItem('token', data.user.token);
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data.errors));
    });
};