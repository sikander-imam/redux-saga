import { all, takeEvery, put, call } from 'redux-saga/effects';
import { getMatchDynamicEvents, getMatchEvents, saveMatchEvents } from 'services/videoanalysis';
import actions from './actions';

export function* VIDEO_ANALYSIS_SET_VIDEO({ payload }) {
    yield put({
        type: actions.SET_STATE,
        payload: {
          ageGroups: [],
          loading: false,
        },
    });
    if (payload.onDone) {
      payload.onDone();
    }
}

export function* SET_VA_STATE({ payload }) {
  yield put({
      type: actions.SET_STATE,
      payload: {
        ...payload,
      },
  });
  if (payload.onDone) {
    payload.onDone();
  }
}

export function* GET_MATCH_EVENTS({ payload }) {
  if (!payload.silent) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'loading',
        loading: {
          fetching: true
        },
      },
    });
  }
  const success = yield call(getMatchEvents, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'fetchingData',
        fetchingData: success,
      },
    });
  } 
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'loading',
      loading: {
        fetching: false
      },
    },
  });
}

export function* GET_MATCH_DYNAMIC_EVENTS({ payload }) {
  if (!payload.silent) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'matchDynamicEvents',
        matchDynamicEvents: {
          fetching: true
        },
      },
    });
  }
  const success = yield call(getMatchDynamicEvents, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'matchDynamicEvents',
        matchDynamicEvents: {
          list: success.events,
        },
      },
    });
  } 
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'matchDynamicEvents',
      matchDynamicEvents: {
        fetching: false,
      },
    },
  });
}

export function* SAVE_MATCH_EVENTS({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'loading',
      loading: {
        saving: true,
      },
    },
  });
  const success = yield call(saveMatchEvents, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'loading',
        loading: {
          saving: false,
        },
      },
    });
  }
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'loading',
      loading: {
        saving: false,
      },
    },
  });
}

export default function* videoAnalysisSaga() {
  yield all([
    takeEvery(actions.SET_VA_STATE, SET_VA_STATE),
    takeEvery(actions.GET_MATCH_EVENTS, GET_MATCH_EVENTS),
    takeEvery(actions.SET_VIDEO, VIDEO_ANALYSIS_SET_VIDEO),
    takeEvery(actions.SAVE_MATCH_EVENTS, SAVE_MATCH_EVENTS),
    takeEvery(actions.GET_MATCH_DYNAMIC_EVENTS, GET_MATCH_DYNAMIC_EVENTS),
  ]);
}
