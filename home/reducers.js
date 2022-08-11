import actions from './actions';

const initialState = {
  blog: [],
  exercise: [],
  latestMatches: [],
  latestSessions: [],
  managerDashboard: {},
  favouritePlayers: [],
  calendar: [],
  calendarTrainingBuildupTypes: [],
  calendarBuildupTypesByManager: [],

  loading: false,
  blogs: [],
  nextMatches: [],
  previousMatches: [],
  nextSessions: [],
  previousSessions: [],
  activePlayers: [],
  myExercises: [],
  clubExercises: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
  case actions.SET_STATE:
    return { ...state, ...action.payload };
  default:
    return state;
  }
}
