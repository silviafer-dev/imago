import { actionTypes } from "./actionTypes";

const initialState = [];
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.load:
      return [...action.payload];
    default:
      return state;
  }
};
