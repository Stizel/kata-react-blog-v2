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
      dispatch(getUser(data.user.token));
      dispatch(setErrors(null));
      dispatch(goHome(true));
    })
    .catch((err) => {
      if (err?.response?.status === 422) {
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
      dispatch(getUser(data.user.token));
      dispatch(setErrors(null));
      dispatch(goHome(true));
    })
    .catch((err) => {
      if (err.response.status === 422) {
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
      dispatch(setUser({user: data.user}));
      dispatch(setErrors(null));
      localStorage.setItem('user', JSON.stringify(data.user));
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data.errors));
    });
};

export const updateUser = (data) => async (dispatch) => {

  const token = JSON.parse(localStorage.getItem('user')).token

  const user = JSON.stringify({
    user: data
  });


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
      dispatch(getUser(data.user.token));
      dispatch(setErrors(null));
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data.errors));
    });
};