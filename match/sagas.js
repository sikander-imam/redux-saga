import { all, takeEvery, put, call, select } from "redux-saga/effects";
import actions from './actions';

export function* UPDATE_MATCH_SUMMARY({ payload }) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        summary: payload.summary
      }
    });
}

export function* UPDATE_MATCH_SQUAD({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      allSquad: payload.allSquad,
      gameSquad: payload.gameSquad,
      outSquad: payload.outSquad || [],
    }
  });
}

export function* UPDATE_MATCH({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      ...payload,
    }
  });
}

export function* UPDATE_MATCH_STATIC_DATA({ payload }) {
  yield put({
    type: actions.SET_MATCH_STATIC_STATE,
    payload: {
      ...payload,
    }
  });
}

export function* UPDATE_MATCH_PLAYERS({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      players: payload.players,
    }
  });
}

export function* UPDATE_MATCH_DYNAMIC_DATA({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      dynamicData: payload,
    }
  });
}

export function* UPDATE_MATCH_REPORT_EDITED({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      matchReportEdited: payload,
    }
  });
}

export function* UPDATE_MATCH_PLAYERS_POSITIONS({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      playersPositions: payload.playersPositions,
      playersPositioned: payload.playersPositioned,
    }
  });
}

export default function* matchesSaga() {
  yield all([
    takeEvery(actions.UPDATE_MATCH, UPDATE_MATCH),
    takeEvery(actions.UPDATE_MATCH_SQUAD, UPDATE_MATCH_SQUAD),
    takeEvery(actions.UPDATE_MATCH_SUMMARY, UPDATE_MATCH_SUMMARY),
    takeEvery(actions.UPDATE_MATCH_PLAYERS, UPDATE_MATCH_PLAYERS),
    takeEvery(actions.UPDATE_MATCH_STATIC_DATA, UPDATE_MATCH_STATIC_DATA),
    takeEvery(actions.UPDATE_MATCH_DYNAMIC_DATA, UPDATE_MATCH_DYNAMIC_DATA),
    takeEvery(actions.UPDATE_MATCH_REPORT_EDITED, UPDATE_MATCH_REPORT_EDITED),
    takeEvery(actions.UPDATE_MATCH_PLAYERS_POSITIONS, UPDATE_MATCH_PLAYERS_POSITIONS),
  ]);
}
