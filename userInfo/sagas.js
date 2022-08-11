import { all, takeEvery, put, call } from "redux-saga/effects";
import { UserInfoApi } from "../../services/userInfo";
import actions from "./actions";

export function* GET_INFO_ABOUT_SESSION({ payload }) {
  yield put({
    type: "userInfo/SET_STATE",
    payload: {
      loading: true
    }
  });
  const success = yield call(UserInfoApi.getDetailsAboutSession, payload);
  if (success) {
    yield put({
      type: "userInfo/SET_STATE",
      payload: {
        loading: false,
        infoSession: success.session,
        exercises: success.exercises
      }
    });
  }
  yield put({
    type: "userInfo/SET_STATE",
    payload: {
      loading: false
    }
  });
}

export function* CURRENT_EXERCISES({ payload }) {
  yield put({
    type: "userInfo/SET_STATE",
    payload: {
      loading: true
    }
  });
  const success = yield call(UserInfoApi.getDetailsExercises, payload);
  if (success) {
    yield put({
      type: "userInfo/SET_STATE",
      payload: {
        loading: false,
        currentExercise: success.keymoment
      }
    });
  }
  yield put({
    type: "userInfo/SET_STATE",
    payload: {
      loading: false
    }
  });
}

export function* POST_QUESTIONNAIRE({ payload }) {
  const success = yield call(UserInfoApi.postQuestionnaire, payload);
  if (success) {
    yield put({
      type: "userInfo/SET_STATE",
      payload: {
        loading: false
      }
    });
    if (payload.close) {
      payload.close();
    }
  } else {
    if (payload.error) {
      payload.error();
    }
  }
}

export function* ADD_PLAYER_MATCH_DYNAMIC_ANSWERS({ payload }) {
  const success = yield call(UserInfoApi.addPlayerMatchDynamicAnswers, payload);
  if (success) {
    yield put({
      type: "userInfo/SET_STATE",
      payload: {
        loading: false
      }
    });
    if (payload.close) {
      payload.close();
    }
  } else {
    if (payload.error) {
      payload.error();
    }
  }
}

export function* POST_MATCH_QUESTIONNAIRE({ payload }) {
  const success = yield call(UserInfoApi.postMatchQuestionnaire, payload);
  if (success) {
    yield put({
      type: "userInfo/SET_STATE",
      payload: {
        loading: false
      }
    });
    if (payload.close) {
      payload.close();
    }
  } else {
    if (payload.error) {
      payload.error();
    }
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.CURRENT_EXERCISES, CURRENT_EXERCISES),
    takeEvery(actions.POST_QUESTIONNAIRE, POST_QUESTIONNAIRE),
    takeEvery(actions.GET_INFO_ABOUT_SESSION, GET_INFO_ABOUT_SESSION),
    takeEvery(actions.POST_MATCH_QUESTIONNAIRE, POST_MATCH_QUESTIONNAIRE),
    takeEvery(actions.ADD_PLAYER_MATCH_DYNAMIC_ANSWERS, ADD_PLAYER_MATCH_DYNAMIC_ANSWERS),
  ]);
}
