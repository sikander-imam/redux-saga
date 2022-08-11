import { all, takeEvery, put, call } from 'redux-saga/effects';
import { getIFASharedTrainingsAndExercisesDrills, getPromotedTrainingsAndExercisesDrills, getIFATrainingsAndExercisesDrills, getTrainingsAndExercisesBulk, getTrainingsAndExercisesDrills, getIFATrainingsAndExercisesBulk, getApprovedTrainingsAndExercisesDrills } from 'services/trainingsandexercises';
import actions from './actions';


export function* GET_CLUB_TRAININGS_BULK({ payload }) {
  const success = yield call(getTrainingsAndExercisesBulk, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'clubDrills',
        clubDrills: {
            ageGroups: success.ageGroups,
            categories: success.categories,
            drillsTags: success.drillsTags,
        },
      },
    });
  } 
}

export function* GET_IFA_TRAININGS_BULK({ payload }) {
  const success = yield call(getIFATrainingsAndExercisesBulk, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'ifaDrills',
        ifaDrills: {
            ifaCoaches: success.ifaCoaches,
            ageGroups: success.ageGroups,
            categories: success.categories,
            drillsTags: success.drillsTags,
        },
      },
    });
  } 
}

export function* GET_CLUB_TRAININGS_DRILLS({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'clubDrills',
      clubDrills: {
        fetching: true
      },
    },
  });
  const success = yield call(getTrainingsAndExercisesDrills, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'clubDrills',
        clubDrills: {
            list: success.list,
        },
      },
    });
  } 
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'clubDrills',
      clubDrills: {
        fetching: false,
      },
    },
  });
}

export function* GET_IFA_TRAININGS_DRILLS({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'ifaDrills',
      ifaDrills: {
        fetching: true
      },
    },
  });
  const success = yield call(getIFATrainingsAndExercisesDrills, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'ifaDrills',
        ifaDrills: {
            list: success.list,
        },
      },
    });
  } 
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'ifaDrills',
      ifaDrills: {
        fetching: false,
      },
    },
  });
}

export function* GET_IFA_SHARED_TRAININGS_DRILLS({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'ifaSharedDrills',
      ifaSharedDrills: {
        fetching: true
      },
    },
  });
  const success = yield call(getIFASharedTrainingsAndExercisesDrills, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'ifaSharedDrills',
        ifaSharedDrills: {
            list: success.list,
        },
      },
    });
  } 
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'ifaSharedDrills',
      ifaSharedDrills: {
        fetching: false,
      },
    },
  });
}

export function* GET_IFA_PROMOTED_TRAININGS_DRILLS({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'ifaPromotedDrills',
      ifaPromotedDrills: {
        fetching: true
      },
    },
  });
  const success = yield call(getPromotedTrainingsAndExercisesDrills, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'ifaPromotedDrills',
        ifaPromotedDrills: {
            list: success.list,
        },
      },
    });
  } 
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'ifaPromotedDrills',
      ifaPromotedDrills: {
        fetching: false,
      },
    },
  });
}

export function* GET_IFA_APPROVED_TRAININGS_DRILLS({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'ifaApprovedDrills',
      ifaApprovedDrills: {
        fetching: true
      },
    },
  });
  const success = yield call(getApprovedTrainingsAndExercisesDrills, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'ifaApprovedDrills',
        ifaApprovedDrills: {
            list: success.list,
        },
      },
    });
  } 
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'ifaApprovedDrills',
      ifaApprovedDrills: {
        fetching: false,
      },
    },
  });
}

export default function* videoAnalysisSaga() {
  yield all([
    takeEvery(actions.GET_IFA_TRAININGS_BULK, GET_IFA_TRAININGS_BULK),
    takeEvery(actions.GET_CLUB_TRAININGS_BULK, GET_CLUB_TRAININGS_BULK),
    takeEvery(actions.GET_IFA_TRAININGS_DRILLS, GET_IFA_TRAININGS_DRILLS),
    takeEvery(actions.GET_CLUB_TRAININGS_DRILLS, GET_CLUB_TRAININGS_DRILLS),
    takeEvery(actions.GET_IFA_SHARED_TRAININGS_DRILLS, GET_IFA_SHARED_TRAININGS_DRILLS),
    takeEvery(actions.GET_IFA_PROMOTED_TRAININGS_DRILLS, GET_IFA_PROMOTED_TRAININGS_DRILLS),
    takeEvery(actions.GET_IFA_APPROVED_TRAININGS_DRILLS, GET_IFA_APPROVED_TRAININGS_DRILLS),
  ]);
}
