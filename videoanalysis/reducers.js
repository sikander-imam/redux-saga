import actions from './actions';

const initialState = {
  video: {
    seek: 0,
    playing: false,
    timeElapsed: 0,
    state: 'INITIAL',
    liveLoadedTime: 0,
    beforeSeekTime: 0,
    liveTimeElapsed: 0,
    showSeekBack: false,
    realTimeBeforeSeek: 0,
    soughtNormally: false,
  },
  editor: {
    code: '',
  },
  matchDetails: {
    id: '',
    isLive: false,
    goalsScored: 0,
    goalsConceded: 0,
  },
  record: {
    event: null,
  },
  custom: {
    event: null,
  },
  counting: {
    event: null,
  },
  eventAdded: {
    id: '',
  },
  submitActionTriggered: {
    id: '',
  },
  autoSavingFinished: {
    id: '',
  },
  opponentPlayerAdded: {
    id: '',
  },
  autoSaving: {
    status: false,
    inPending: false,
    inProgress: false,
  },
  viewMode: {
    // mode: "analysis",
    mode: "view",
  },
  match: {
    half: null,
    started: false,
    playing: false,
    timeElapsed: 0,
    initialTime: 0,
    matchStartedVideoTime: 0,
    onAction: 'Start1stHalf',
    start1stHalfTime: 0,
    end1stHalfTime: 0,
    start2ndHalfTime: 0,
    end2ndHalfTime: 0,
    startExtra1stHalf: 0,
    endExtra1stHalf: 0,
    startExtra2ndHalf: 0,
    endExtra2ndHalf: 0,
    start1stHalfVideoTime: 0,
    finish1stHalfVideoTime: 0,
    start2ndHalfVideoTime: 0,
    finish2ndHalfVideoTime: 0,
    start1stHalfLiveVideoTime: 0,
    finish1stHalfLiveVideoTime: 0,
    start2ndHalfLiveVideoTime: 0,
    finish2ndHalfLiveVideoTime: 0,
    start1stHalfUTCTime: null,
    start2ndHalfUTCTime: null,
  },
  event: {},
  events: [],
  players: [],
  reportData: {},
  matchEvents: [],
  savedEvents: [],
  opponentPlayers: [],
  fetchingData: null,
  loading: {
    saving: false,
    fetching: false,
  },
  deletedEvents: [],
  videoUrl: {
    url: '',
  },
  matchDynamicEvents: {
    list: [],
    fetching: false,
  },
  analysisType: "INTERNAL",
  eventZones: [],
  eventPlayers: [],
  eventAccuracy: "",
  teamEvent: null,
  currentTeamEventsTabKey: "1",
};

export default function videoAnalysis(state = initialState, action) {
  switch (action.type) {
  case actions.SET_STATE:
    if (Array.isArray(initialState[action.payload.field])) {
      return {
        ...state,
        [action.payload.field]: [
          ...action.payload[action.payload.field]
        ]
      }
    }
    if (typeof initialState[action.payload.field] === "object") {
      return {
        ...state,
        [action.payload.field]: {
          ...state[action.payload.field],
          ...action.payload[action.payload.field],
        }
      };
    }
    return {
      ...state,
      [action.payload.field]: action.payload[action.payload.field],
    };
  case actions.SET_ALL_STATE:
    return {
      ...state,
      ...action.payload,
    }
  case actions.SET_DEFAULT_STATE:
    return initialState;
  default:
    return state;
  }
}
