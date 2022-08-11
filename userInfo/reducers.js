import actions from './actions';

const initialState = {
  loading: false,
  exercises: [],
  infoSession: {},
  currentExercise: {},
};

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
  case actions.SET_STATE:
    return { ...state, ...action.payload };
  default:
    return state;
  }
}
