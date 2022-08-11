import actions from './actions';

const initialState = {
    clubDrills: {
      list: [],
      tags: [],
      ageGroups: [],
      difficulty: [],
      categories: [],
      drillsTags: [],
      fetching: false,
      filterText: "",
      filterTags: [],
      filterStatus: "1",
      filterAgeGroups: [],
      filterFavourite: "0",
      filterCategories: [],
      filterDifficulty: "",
    },
    ifaDrills: {
      list: [],
      tags: [],
      ageGroups: [],
      difficulty: [],
      ifaCoaches: [],
      categories: [],
      drillsTags: [],
      fetching: false,
      filterText: "",
      filterTags: [],
      filterCoaches: [],
      filterStatus: "1",
      filterAgeGroups: [],
      filterFavourite: "",
      filterCategories: [],
      filterDifficulty: "",
    },
    ifaSharedDrills: {
      list: [],
      tags: [],
      ageGroups: [],
      difficulty: [],
      categories: [],
      drillsTags: [],
      fetching: false,
      filterText: "",
      filterTags: [],
      filterStatus: "1",
      filterAgeGroups: [],
      filterFavourite: "",
      filterCategories: [],
      filterDifficulty: "",
    },
    ifaPromotedDrills: {
      list: [],
      tags: [],
      ageGroups: [],
      difficulty: [],
      categories: [],
      drillsTags: [],
      fetching: false,
    },
    ifaApprovedDrills: {
      list: [],
      tags: [],
      ageGroups: [],
      difficulty: [],
      categories: [],
      drillsTags: [],
      fetching: false,
    },
};

export default function managerSettings(state = initialState, action) {
  switch (action.type) {
  case actions.SET_STATE:
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