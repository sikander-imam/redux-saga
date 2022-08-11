import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import { InstructionsApi } from '../../services/instructions';

export function* Instrucions_List({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(InstructionsApi.getManagerInstructions, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        instructions: success, // check how you will get the data
      },
    });
  }
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: false,
    },
  });
}
export default function* instructionsSaga() {
  yield all([takeEvery(actions.Manager_INSTRUCTIONS, Instrucions_List)]);
}
