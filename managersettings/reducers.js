import actions from './actions';

const initialState = {
    coaches: {
      list: [],
      ageGroups: [],
      fetching: false,
    },
    scouts: {
      list: [],
      fetching: false,
    },
    submanagers: {
      list: [],
      coaches: [],
      fetching: false,
    },
    trainingtypes: {
      list: [],
      languages: [],
      fetching: false,
    },
    agegroups: {
      list: [],
      coaches: [],
      languages: [],
      fetching: false,
    },
    trainings: {
      list: [],
      languages: [],
      categories: [],
      fetching: false,
      trainingtypes: [],
    },
    matchquestions: {
      list: [],
      fetching: false,
    },
    reports: {
      list: [],
      languages: [],
      reportsFor: [],
      fetching: false,
      reportsTypes: [],
      reportsTopics: [],
      reportsFields: [],
    },
    scoutreports: {
      list: [],
      languages: [],
      fetching: false,
    },
    managerdomains: {
      list: [],
      languages: [],
      fetching: false,
    },
    matchDynamicFields: {
        fetching: false,
        languages: [],
        postMatchFields: [],
        dynamicGradesFields: [],
    },
};

export default function managerSettings(state = initialState, action) {
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
    return {
      ...state,
      [action.payload.field]: {
        ...state[action.payload.field],
        ...action.payload[action.payload.field],
      }
  };
  case actions.SET_DEFAULT_STATE:
    return initialState;
  default:
    return state;
  }
}