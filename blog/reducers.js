import actions from './actions';

const initialState = {
  blogs: [],
  blogDetail: {},
  loading: false,
  categories: {
    list: [],
    listing: false,
    getting: false,
    details: false,
    created: false,
    creating: false,
    creatingError: false,
    creatingErrorMessage: '',
  },
  blog: {
    details: false,
    getting: false,
    details: false,
    created: false,
    creating: false,
    creatingError: false,
    creatingErrorMessage: '',
  },
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
  case actions.SET_STATE:
    return { ...state, ...action.payload };
  case actions.SET_INTERNAL_STATE:
    return {
      ...state,
      [action.payload.field]: {
        ...state[action.payload.field],
        ...action.payload[action.payload.field],
      }
    };
  default:
    return state;
  }
}
