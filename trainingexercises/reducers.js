import actions from "./actions";

const initialState = {
  categories: [],
  categoriesDetail: [],
  category: {
    category_id: "",
    description: "",
    name: "",
    main_image: "",
    keymoment: [],
  },
  training: [],
  exercises: [],
  myExercises: [],
  loading: false,
  selectedExercise: null,
  philosophy: null,  
};

export default function trainingExercisesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    case actions.REMOVE_CATEGORY_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        categories: state.categories.filter((x) => x.category_id !== payload),
      };
    }
    case actions.TRAININGEXERCISES_SET_DEFAULT: {
      return initialState;
    }
    default:
      return state;
  }
}
