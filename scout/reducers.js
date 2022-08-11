import actions from './actions';

const initialState = {
  loading: false,
  scoutClubs: [],
  scoutClub: false,
  teamPlayers: [],
  scoutPlayers: [],
  teamPositions: [],
  scoutPlayer: false,
  scoutPlayerHistory: [],
  allScouts: [],
  scoutStats: [],
  scoutEvents: [],
  scoutReports: [],
  clubDetails: false,
  allScoutPlayers: [],
  scoutReportsFields: [],
  scoutPlayerMatches: [],
  scoutReportDetails: false,
  scoutReportsWithPlayers: [],
  scoutReport: {
    basic: {
      match_id: "",
      venue: "",
      league: "",
      datetime: "",
      homeTeam: "",
      awayTeam: "",
      competiton: "",
      description: "",
      awayTeamYear: "",
      homeTeamYear: "",
    },
    tactics: {
      homeTeam: [],
      awayTeam: [],
    },
    players: [
      {
        id: "fake__home",
        name: "",
        club: "",
        report: "",
        avatar: "",
        team: "homeTeam",
        contacts: [],
        birthdate: "",
        positions: [],
        jerseyNumber: "",
        bodyStructure: "",
        grades: {}
      },
      {
        id: "fake__away",
        name: "",
        club: "",
        report: "",
        avatar: "",
        team: "awayTeam",
        contacts: [],
        birthdate: "",
        positions: [],
        jerseyNumber: "",
        bodyStructure: "",
        grades: {}
      }
    ],
    videos: [],
    summary: "",
    scouts: [],
  }
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
  case actions.SET_STATE:
    return { ...state, ...action.payload };
  case actions.UPDATE_REPORT:
    return {
      ...state,
      scoutReport: {
        ...state.scoutReport,
        [action.payload.field]: action.payload.data, 
      }
    };
  default:
    return state;
  }
}