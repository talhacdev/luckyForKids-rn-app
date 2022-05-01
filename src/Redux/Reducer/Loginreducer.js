import {
  LOGIN_USER,
  LOGOUT_USER,
  SAVE_PASSWORD,
  SAVE_CHARITY,
  UPDATE_EXECUTION,
} from '../Action/types';

const initialState = {
  user: null,
  isLoggedIn: false,
  password: '',
  charityId: '',
  executed: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.userdata,
        isLoggedIn: true,
        charityId: action.charityId,
      };
    case SAVE_PASSWORD:
      return {
        ...state,

        password: action.password,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        password: '',
        user: null,
        charityId: '',
      };
    case SAVE_CHARITY:
      return {
        ...state,

        charityId: action.charityId,
      };
    case UPDATE_EXECUTION:
      return {
        ...state,
        executed: true,
      };
    default:
      return state;
  }
};
