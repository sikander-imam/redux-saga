import { all, takeEvery, put, call, select } from "redux-saga/effects";
import { selectSelectedCoach } from "redux/coaches/selectors";
import { selectUser } from "redux/user/selectors";
import * as api from "../../services/home";
import { getManagerFavouritePlayers } from "../../services/session";
import actions from "./actions";
import { roles, managerRoles } from '../../constants';

export function* LIST({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(api.getHomeList, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        blogs: success.blogs,
        nextMatches: success.nextMatches,
        previousMatches: success.previousMatches,
        nextSessions: success.nextSessions,
        previousSessions: success.previousSessions,
        activePlayers: success.activePlayers,
        myExercises: success.myExercises,
        clubExercises: success.clubExercises,
      },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
  }
}

export function* MANAGER_LIST({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(api.getManagerList, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        blogs: success.blogs,
        nextMatches: success.nextMatches,
        previousMatches: success.previousMatches,
        nextSessions: success.nextSessions,
        previousSessions: success.previousSessions,
        activePlayers: success.activePlayers,
        myExercises: success.myExercises,
        clubExercises: success.clubExercises,
      },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
  }
}

export function* LIST_CALENDAR({ payload }) {
  const selectedCoach = yield select(selectSelectedCoach);
  const user = yield select(selectUser);
  const { role } = user;

  let calendarTrainingBuildupTypes = [];
  let calendarBuildupTypesByManager = [];

  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  let success;
  if (managerRoles.includes(payload.type)) {
    // let successPrev = yield call(api.getManagerCalendarList, {
    //   ...payload,
    //   user,
    //   month: parseInt(payload.month) - 1,
    // });
    // if (!successPrev) {
    //   successPrev = [];
    // }
    // let successNext = yield call(api.getManagerCalendarList, {
    //   ...payload,
    //   user,
    //   month: parseInt(payload.month) + 1,
    // });
    // if (!successNext) {
    //   successNext = [];
    // }
    // let successNow = yield call(api.getManagerCalendarList, {
    //   ...payload,
    //   user,
    // });
    // if (!successNow) {
    //   successNow = [];
    // }
    // success = successPrev.concat(successNext).concat(successNow);
    success = yield call(api.getManagerCalendarList, {
      ...payload,
      user,
      month: parseInt(payload.month) + 1,
    });
    if (payload.coach_id) {
      success = success.filter(event => event.coach_id === payload.coach_id);
    }
  } else {
    // let successPrev = yield call(api.getCalendarList, {
    //   ...payload,
    //   month: parseInt(payload.month) - 1,
    //   role,
    //   selectedCoach,
    // });
    // if (!successPrev) {
    //   successPrev = [];
    // }
    // let successNext = yield call(api.getCalendarList, {
    //   ...payload,
    //   month: parseInt(payload.month) + 1,
    //   role,
    //   selectedCoach,
    // });
    // if (!successNext) {
    //   successNext = [];
    // }
    // let successNow = yield call(api.getCalendarList, {
    //   ...payload,
    //   role,
    //   selectedCoach,
    // });
    // if (!successNow) {
    //   successNow = [];
    // }
    // success = successPrev.concat(successNext).concat(successNow);
    success = yield call(api.getCoachCalendarList, {
      ...payload,
      role,
      selectedCoach,
      month: payload.month,
    });
    calendarTrainingBuildupTypes = yield call(api.getCalendarTrainingBuildupTypes);
    calendarBuildupTypesByManager = yield call(api.getCalendarBuildupTypesByManager, user.user_id);
  }

  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        calendar: success,
        calendarTrainingBuildupTypes: calendarTrainingBuildupTypes || [],
        calendarBuildupTypesByManager: calendarBuildupTypesByManager || [],
      },
    });
  }
  else {
    yield put({
      type: "home/SET_STATE",
      payload: {
        loading: false,
      },
    });
  }
}

export function* USER_LIST_CALENDAR({ payload }) {
  yield put({
    type: "home/SET_STATE",
    payload: {
      loading: true,
    },
  });
  const success = yield call(api.getCalendarListUser, payload);
  if (success) {
    yield put({
      type: "home/SET_STATE",
      payload: {
        calendar: success,
      },
    });
  }
  yield put({
    type: "home/SET_STATE",
    payload: {
      loading: false,
    },
  });
}

export function* LIST_NEXT_ACTIVES({ payload }) {
  yield put({
    type: "home/SET_STATE",
    payload: {
      loading: true,
    },
  });
  const success = yield call(api.getListNextActives, payload);
  if (success) {
    yield put({
      type: "home/SET_STATE",
      payload: {
        nextSessions: success,
      },
    });
  }
  yield put({
    type: "home/SET_STATE",
    payload: {
      loading: false,
    },
  });
}

export function* SET_CALENDAR({ payload }) {
  yield put({
    type: "home/SET_STATE",
    payload: {
      calendar: payload.calendar,
    },
  });
}

export function* LIST_MATCHES_ACTIVES({ payload }) {
  yield put({
    type: "home/SET_STATE",
    payload: {
      loading: true,
    },
  });
  const success = yield call(api.getListMatchesActives, payload);
  const res = yield call(api.getListNextMatchesActives, payload);
  if (success) {
    yield put({
      type: "home/SET_STATE",
      payload: {
        nextMatches: res,
        latestMatches: success,
      },
    });
  }
  yield put({
    type: "home/SET_STATE",
    payload: {
      loading: false,
    },
  });
}

export function* GET_CALENDAR_EVENTS({ payload }) {
  yield put({
    type: "home/SET_STATE",
    payload: {
      loading: true,
    },
  });
  const success = yield call(api.getCalendarEvents, payload);
  if (success) {
    yield put({
      type: "home/SET_STATE",
      payload: {
        calendar: success,
      },
    });
  }
  yield put({
    type: "home/SET_STATE",
    payload: {
      loading: false,
    },
  });
}

export function* GET_TRAINING_BUILDUP_TYPES({ payload }) {
  const user = yield select(selectUser);
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingBuildupTypes: true,
    },
  });
  let calendarTrainingBuildupTypes = [];
  let calendarBuildupTypesByManager = [];
  calendarTrainingBuildupTypes = yield call(api.getCalendarTrainingBuildupTypes);
  calendarBuildupTypesByManager = yield call(api.getCalendarBuildupTypesByManager, user.user_id);
  yield put({
    type: actions.SET_STATE,
    payload: {
      loadingBuildupTypes: false,
      calendarTrainingBuildupTypes: calendarTrainingBuildupTypes || [],
      calendarBuildupTypesByManager: calendarBuildupTypesByManager || [],
    },
  });
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.HOME_LIST, LIST),
    takeEvery(actions.SET_CALENDAR, SET_CALENDAR),
    takeEvery(actions.MANAGER_LIST, MANAGER_LIST),
    takeEvery(actions.LIST_CALENDAR, LIST_CALENDAR),
    takeEvery(actions.LIST_NEXT_ACTIVES, LIST_NEXT_ACTIVES),
    takeEvery(actions.USER_LIST_CALENDAR, USER_LIST_CALENDAR),
    takeEvery(actions.GET_CALENDAR_EVENTS, GET_CALENDAR_EVENTS),
    takeEvery(actions.LIST_MATCHES_ACTIVES, LIST_MATCHES_ACTIVES),
    takeEvery(actions.GET_TRAINING_BUILDUP_TYPES, GET_TRAINING_BUILDUP_TYPES),
  ]);
}
