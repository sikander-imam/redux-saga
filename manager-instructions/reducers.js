import actions from './actions';

const initialState = {
  instructions: [
    {
      id: 0,
      event: 'instructions',
      name: 'instructions 1',
      content: 'make the players run',
      startDate: '2021-01-28 17:20:00',
      endDate: '2021-01-28 20:20:00',
      nodate: false,
    },
    {
      id: 1,
      event: 'instructions',
      name: 'instructions ',
      content: 'make the players run',
      startDate: '2021-01-24 17:20:00',
      endDate: '2021-01-24 20:20:00',
      nodate: false,
    },
  ],
  loading: false,
};

export default function InstructionsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
