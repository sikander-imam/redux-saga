import actions from "./actions";

const initialState = {
  menuLeftCategories: [],
  menuLeftData: [],
  menuTopData: [],
  menuLeftDataUser: [],
  menuLeftDataManager: [],
  menuLeftDataPlayer: []
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
