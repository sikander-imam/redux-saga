import actions from './actions';

const initialState = {
  players: [],
  allSquad: [],
  outSquad: [],
  gameSquad: [],
  summary: {
    redCard: [],
    yellowCard: [],
    playerScored: [],
    playersInjured: [],
  },
  staticData: {
    goalsScored: 0,
    goalsConceded: 0,
    oppositionTeam: "",
    startDate: "",
    location: "",
    gamePlan: "",
    players: [],
    summary: "",
    match_id: "",
    isHome: "0",
    matchNumber: "",
    competition: "League",
    summaryRating: "",
    attackingToDefending: "",
    attackingToDefendingRating: "",
    defendingToAttacking: "",
    defendingToAttackingRating: "",
    teamPress: "",
    teamPressRating: "",
    setPieces: "",
    setPiecesRating: "",
    countSelected: 0
  },
  dynamicData: [],
  allPlayers: [],
  injuredPlayers: [],
  injuredPlayersNames: [],
  playersPositions: [],
  playersPositioned: 0,
  matchDateEdited: false,
  matchReportEdited: false,
  matchDateCheckLoading: false,
  matchReportEditedInduced: false,
  overallTotals: {},
  started11Totals: {},
  subsTotals: {},
  videos: [],
  removeVideos: [],
};

export default function matchesReducer(state = initialState, action) {
  switch (action.type) {
  case actions.SET_STATE:
    return { ...state, ...action.payload };
  case actions.SET_MATCH_STATIC_STATE:
    return {
      ...state,
      matchReportEdited: true,
      staticData: {
        ...state.staticData,
        ...action.payload,
      }
    };
  default:
    return state;
  }
}
