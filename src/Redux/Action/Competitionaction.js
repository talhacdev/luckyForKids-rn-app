import axios from 'axios';
import {BASE_URL} from '../Baseurl';
import {
  COMPETITION_USER,
  CHARITY_LIST,
  USER_BALANCE,
  MY_TICKETS,
  ALL_CATEG,
  WINNERS,
  PACKAGES,
  CHAIRTY_FUNDS,
} from './types';

export const competition = (data, userCart) => {
  const formData = new FormData();
  formData.append('category', data);
  console.log(formData);
  return async (dispatch) => {
    const res = await axios.post(
      `${BASE_URL}wp-json/winnerwish/v1/all_competitions`,
      formData,
    );
    console.log(res);
    // return res;
    if (res.data.status) {
      const compet =
        res &&
        res.data.data.map((item) => {
          return {
            ...item,
            qty: parseInt(item.minimum_entry),
            totalPrice: parseFloat(item.price) * parseInt(item.minimum_entry),
            selectedQues: '',
            isCart:
              userCart.length > 0
                ? userCart.some((item1) => {
                    if (item.ID === item1.ID) {
                      return true;
                    } else return false;
                  })
                : false,
          };
        });

      dispatch({
        type: COMPETITION_USER,
        competition: compet,
      });
    } else {
      dispatch({
        type: COMPETITION_USER,
      });
    }
  };
};
export const charityCateg = (data) => {
  return async (dispatch) => {
    const res = await axios.post(
      `${BASE_URL}wp-json/winnerwish/v1/all_charities`,
      data,
    );

    console.log(res);
    // return res;
    if (res.data.status) {
      dispatch({
        type: CHARITY_LIST,
        charityList: res.data.data,
      });
    } else {
      dispatch({
        type: CHARITY_LIST,
      });
    }
  };
};
export const getUserBalance = (data) => {
  return async (dispatch) => {
    const res = await axios.post(
      `${BASE_URL}wp-json/winnerwish/v1/user_balance`,
      null,
      {headers: {auth: data}},
    );
    console.log(res);
    // return res;
    if (res.data.status) {
      dispatch({
        type: USER_BALANCE,
        balance: res.data.balance,
      });
    } else {
      alert(res.data.message);
      dispatch({
        type: USER_BALANCE,
      });
    }
  };
};
export const compDetail = (data) => {
  return async (dispatch) => {
    const res = await axios.post(
      `${BASE_URL}wp-json/winnerwish/v1/competition_detail`,
      data,
    );
    console.log(res);
    return res;
  };
};

export const getMyTickets = (data) => {
  return async (dispatch) => {
    const res = await axios.post(
      `${BASE_URL}wp-json/winnerwish/v1/mytickets`,
      null,
      {
        headers: {
          auth: data,
        },
      },
    );
    console.log(res);
    // return res;
    if (res.data.status) {
      dispatch({
        type: MY_TICKETS,
        myTickets: res.data.data,
      });
    } else {
      alert(res.data.message);
      dispatch({
        type: MY_TICKETS,
      });
    }
  };
};
export const updateComp = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: COMPETITION_USER,
        competition: data,
      });
    } catch (err) {}
  };
};
export const getCateg = (data) => {
  return async (dispatch) => {
    const res = await axios.post(
      `${BASE_URL}wp-json/winnerwish/v1/all_main_categories`,
      null,
    );

    console.log(res);
    // return res;
    if (!res.data.error) {
      console.log('zaid=====>', res.data.main_categories);
      let newCategList =
        res.data.main_categories &&
        res.data.main_categories.splice(0, 0, {
          id: 0,
          cat_name: 'Choose Category',
        });

      dispatch({
        type: ALL_CATEG,
        allCateg: res.data.main_categories,
      });
    } else {
      dispatch({
        type: ALL_CATEG,
      });
    }
  };
};
export const getWinners = () => {
  return async (dispatch) => {
    const res = await axios.post(
      `${BASE_URL}wp-json/winnerwish/v1/winners_list`,
      null,
    );

    if (res.data.status) {
      dispatch({
        type: WINNERS,
        winners: res.data.data,
      });
      return res;
    } else {
      dispatch({
        type: WINNERS,
      });
    }
    return res;
  };
};
export const getSubscriptions = () => {
  return async (dispatch) => {
    const res = await axios.post(
      `${BASE_URL}wp-json/winnerwish/v1/subscription_packages`,
      null,
    );
    console.log(res.data.data);
    if (res.data.status) {
      dispatch({
        type: PACKAGES,
        packages: res.data.data,
      });
      return res;
    } else {
      dispatch({
        type: PACKAGES,
      });
    }
    return res;
  };
};
export const getCharityFunds = () => {
  return async (dispatch) => {
    const res = await axios.post(
      `${BASE_URL}wp-json/winnerwish/v1/charity_funds`,
      null,
    );
    console.log(res.data.charity_fund);
    if (res.data.status) {
      dispatch({
        type: CHAIRTY_FUNDS,
        charityFunds: res.data.charity_fund,
      });
      return res;
    } else {
      dispatch({
        type: CHAIRTY_FUNDS,
      });
    }
    return res;
  };
};
export const purchasePkg = (data, auth) => {
  return async (dispatch) => {
    const res = await axios.post(
      `${BASE_URL}wp-json/winnerwish/v1/place_subscription`,
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
