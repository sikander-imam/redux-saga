import actions from "./actions";

const initialState = {
  id: "",
  name: "",
  role: "",
  email: "",
  avatar: "",
  authorized: false, // false is default value
  loading: false,
  styles: null,
  user_id: "",
  client: {},
  signingIn: false,
  signingInErrorMessage: null,
  recovering: false,
  recoveringSuccess: false,
  recoveringErrorMessage: null,
  ageGroups: {
    loading: false,
    data: []
  },
  styles: {},
  changePassword: {
    success: false,
    changing: false,
    errorMessage: null,
  },
  updateProfile: {
    success: false,
    changing: false,
    errorMessage: null,
  },
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
