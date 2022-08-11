import actions from "./actions";

const initialState = {
  loading: false,
  dynalicLabels: [],
  dynamicLabels: [],
  allPlayersStats: [],
  allPlayersReports: [],
  playersReportFields: [],
  playersCoachReports: [],
  loadingPlayersReports: false,
  playerReports: [],
  playerHistory: [],
  reports: {
    values: [],
    details: {},
    coaches: [],
    mode: 'view',
    saving: false,
    modified: false,
    coach_assign: [],
    remove_player: [],
  },
  videos: [],
  reportsGrades: [],
  reportPlayers: [],
  reportFavouritePlayers: [],
  outsquad: {
    players: [],
    adding: false,
    loading: false,
  },
  playerProfile: {},
  positions: {
    list: [],
    getting: false,
  },
  allTeamPlayers: [],
  playerAttendance: [],
  playerquestionnaire: {
    answers: [],
    questions: [],
    loading: false,
  },
  playerSessionsAttendance: {
    list: [],
    getting: false,
  },
  playerClubReports: {
    list: [],
    getting: false,
  },
  playerSeasonMatches: {
    list: [],
    getting: false,
    matchDynamicLabels: [],
  },
  playerProfileHistory: {
    list: [],
    getting: false,
  },
  allClubPlayers: {
    list: [],
    getting: false,
  },
};

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_PLAYERS_DETAIL:
      return { ...state, ...action.payload };
    case actions.SET_PLAYERS_REPORTS:
      return { 
        ...state, 
        reports: {
          ...state.reports,
          ...action.payload,
        }
      };
    case actions.UPDATE_OUT_SQUAD:
      return { 
        ...state, 
        outsquad: {
          ...state.outsquad,
          ...action.payload,
        }
      };    
    default:
      return state;
  }
}