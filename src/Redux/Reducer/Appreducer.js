// import {ADD_TO_CART} from '../Action/types';

// const initialState = {
//   cart: [],
// };
// export const Competitionreducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       return {
//         ...state,
//         cart: action.addToCart,
//       };

//     default:
//       return state;
//   }
// };
import {
  ALL_CATEG,
  CHARITY_LIST,
  COMPETITION_USER,
  MY_TICKETS,
  USER_BALANCE,
  WINNERS,
  PACKAGES,
  CHAIRTY_FUNDS,
} from '../Action/types';

const initialState = {
  comp: null,
  charityList: null,
  balance: '',
  myTickets: null,
  allCateg: null,
  winners: null,
  packages: null,
  charityFunds: '',
};
export const Competitionreducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPETITION_USER:
      return {
        ...state,
        comp: action.competition,
      };
    case CHARITY_LIST:
      return {
        ...state,
        charityList: action.charityList,
      };
    case USER_BALANCE:
      return {
        ...state,
        balance: action.balance,
      };
    case MY_TICKETS:
      return {
        ...state,
        myTickets: action.myTickets,
      };
    case ALL_CATEG:
      return {
        ...state,
        allCateg: action.allCateg,
      };
    case WINNERS:
      return {
        ...state,
        winners: action.winners,
      };
    case PACKAGES:
      return {
        ...state,
        packages: action.packages,
      };
    case CHAIRTY_FUNDS:
      return {
        ...state,
        charityFunds: action.charityFunds,
      };
    default:
      return state;
  }
};
