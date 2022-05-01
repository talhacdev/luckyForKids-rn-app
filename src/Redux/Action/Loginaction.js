import axios from 'axios';
import {BASE_URL} from '../Baseurl';

import {LOGIN_USER, SAVE_PASSWORD, LOGOUT_USER, SAVE_CHARITY} from './types';

export const loginaction = (data) => {
  console.log(data);
  return async (dispatch) => {
    const res = await axios.post(
      `${BASE_URL}wp-json/winnerwish/v1/login_user`,
      data,
    );
    console.log(res);
    // return console.log(res);
    if (res.data.status) {
      dispatch({
        type: LOGIN_USER,
        userdata: res.data.data,
        charityId: res.data.data.charity,
      });
      return res;
    } else {
      return res;
    }
  };
};
export const changeUName = (data, auth) => {
  console.log(data);
  return async (dispatch) => {
    const res = await axios.post(
      `${BASE_URL}wp-json/winnerwish/v1/name_change`,
      data,
      {
        headers: {
          auth: auth,
        },
      },
    );
    console.log(res);
    return res;
  };
};
export const changeUPass = (data, auth) => {
  console.log(data);
  return async (dispatch) => {
    const res = await axios.post(
      `${BASE_URL}wp-json/winnerwish/v1/change_password`,
      data,
      {
        headers: {
          auth: auth,
        },
      },
    );
    console.log(res);
    return res;
  };
};
export const savePass = (data) => {
  console.log(data);
  return async (dispatch) => {
    try {
      dispatch({
        type: SAVE_PASSWORD,
        password: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const logoutUser = (data, auth) => {
  console.log(data);
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGOUT_USER,
      });
    } catch (err) {}
  };
};
export const forgotPassword = (data) => {
  console.log(data);
  return async (dispatch) => {
    const res = await axios.post(
      `${BASE_URL}wp-json/winnerwish/v1/forget_password`,
      data,
    );
    console.log(res);
    return res;
  };
};
export const updatePassword = (data) => {
  console.log(data);
  return async (dispatch) => {
    const res = await axios.post(
      `${BASE_URL}wp-json/winnerwish/v1/reset_password`,
      data,
    );
    console.log(res);
    return res;
  };
};
export const saveCharity = (data) => {
  console.log(data);
  return async (dispatch) => {
    try {
      dispatch({
        type: SAVE_CHARITY,
        charityId: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
