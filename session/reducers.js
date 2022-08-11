import actions from "./actions";

const initialState = {
  session: [],
  training: [],
  players: [],
  total: 1,
  sessionInfo: {},
  playersInfo: [],
  trainingInfo: [],
  playerQuestions: [],
  playerAnswers: {},
  favouritePlayers: [],
  builduptypes: [],
  missingPlayers: [],
  playerMatchAnswers: false,
  sessionTrainingBuildupTypes: [],
  sessionBuildupTypesByManager: [],
  
  playerMatchDynamicAnswers: [],
  playerMatchDynamicQuestions: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
