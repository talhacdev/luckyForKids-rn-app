import {ADD_TO_CART, UPDATE_TOTAL_PRICE, APPLY_VOUCHER} from '../Action/types';

const initialState = {
  userCart: [],
  totalPrice: 0.0,
  instntBuy: null,
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        userCart: action.addToCart,
        totalPrice: action.totalPrice,
      };
    case UPDATE_TOTAL_PRICE:
      return {
        ...state,

        totalPrice: action.totalPrice,
      };
    case APPLY_VOUCHER:
      return {
        ...state,

        totalPrice: action.totalPrice,
      };
    case 'INSTANT_BUY':
      return {
        ...state,

        instntBuy: action.data,
      };
    case 'UPDATE_CART':
      return {
        ...state,

        userCart: action.addToCart,
        totalPrice: action.totalPrice,
      };
    default:
      return state;
  }
};
