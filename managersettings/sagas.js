import { all, takeEvery, put, call } from 'redux-saga/effects';
import { getManagerAgeGroups, getManagerCoaches, getManagerDomains, getManagerMatchQuestionnaire, getManagerReportsBulk, getManagerScoutReportsBulk, getManagerScouts, getManagerSubmanagers, getManagerTrainings, getManagerTrainingTypes, getMatchDynamicFields } from 'services/managersettings';
import actions from './actions';


export function* GET_MATCH_DYNAMIC_FIELDS({ payload }) {
  if (!payload.silent) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'matchDynamicFields',
        matchDynamicFields: {
          fetching: true
        },
      },
    });
  }
  const success = yield call(getMatchDynamicFields, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'matchDynamicFields',
        matchDynamicFields: {
            languages: success.languages,
            postMatchFields: success.postMatchFields,
            dynamicGradesFields: success. dynamicGradesFields,
        },
      },
    });
  } 
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'matchDynamicFields',
      matchDynamicFields: {
        fetching: false,
      },
    },
  });
}

export function* GET_MANAGER_COACHES({ payload }) {
  if (!payload.silent) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'coaches',
        coaches: {
          fetching: true
        },
      },
    });
  }
  const success = yield call(getManagerCoaches, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'coaches',
        coaches: {
            list: success.coaches,
            ageGroups: success.ageGroups,
        },
      },
    });
  } 
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'coaches',
      coaches: {
        fetching: false,
      },
    },
  });
}

export function* GET_MANAGER_SCOUTS({ payload }) {
  if (!payload.silent) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'scouts',
        scouts: {
          fetching: true
        },
      },
    });
  }
  const success = yield call(getManagerScouts, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'scouts',
        scouts: {
            list: success.scouts,
        },
      },
    });
  } 
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'scouts',
      scouts: {
        fetching: false,
      },
    },
  });
}

export function* GET_MANAGER_SUBMANAGERS({ payload }) {
  if (!payload.silent) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'submanagers',
        submanagers: {
          fetching: true
        },
      },
    });
  }
  const success = yield call(getManagerSubmanagers, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'submanagers',
        submanagers: {
            coaches: success.coaches,
            list: success.submanagers,
        },
      },
    });
  } 
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'submanagers',
      submanagers: {
        fetching: false,
      },
    },
  });
}

export function* GET_MANAGER_TRAININGTYPES({ payload }) {
  if (!payload.silent) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'trainingtypes',
        trainingtypes: {
          fetching: true
        },
      },
    });
  }
  const success = yield call(getManagerTrainingTypes, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'trainingtypes',
        trainingtypes: {
            languages: success.languages,
            list: success.trainingtypes,
        },
      },
    });
  } 
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'trainingtypes',
      trainingtypes: {
        fetching: false,
      },
    },
  });
}

export function* GET_MANAGER_MATCH_QUESTIONNAIRE({ payload }) {
  if (!payload.silent) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'matchquestions',
        matchquestions: {
          fetching: true
        },
      },
    });
  }
  const success = yield call(getManagerMatchQuestionnaire, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'matchquestions',
        matchquestions: {
            languages: success.languages,
            list: success.questions,
        },
      },
    });
  } 
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'matchquestions',
      matchquestions: {
        fetching: false,
      },
    },
  });
}


export function* GET_MANAGER_TRAININGS({ payload }) {
  if (!payload.silent) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'trainings',
        trainings: {
          fetching: true
        },
      },
    });
  }
  const success = yield call(getManagerTrainings, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'trainings',
        trainings: {
            list: success.trainings,
            languages: success.languages,
            categories: success.categories,
            trainingtypes: success.trainingtypes,
        },
      },
    });
  } 
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'trainings',
      trainings: {
        fetching: false,
      },
    },
  });
}

export function* GET_MANAGER_REPORTS_BULK({ payload }) {
  if (!payload.silent) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'reports',
        reports: {
          fetching: true
        },
      },
    });
  }
  const success = yield call(getManagerReportsBulk, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'reports',
        reports: {
            list: success.reports,
            languages: success.languages,
            reportsFor: success.reportsFor,
            reportsTypes: success.reportsTypes,
            reportsTopics: success.reportsTopics,
            reportsFields: success.reportsFields,
        },
      },
    });
  } 
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'reports',
      reports: {
        fetching: false,
      },
    },
  });
}

export function* GET_MANAGER_SCOUTREPORTS_BULK({ payload }) {
  if (!payload.silent) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'scoutreports',
        scoutreports: {
          fetching: true
        },
      },
    });
  }
  const success = yield call(getManagerScoutReportsBulk, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'scoutreports',
        scoutreports: {
            list: success.reports,
            languages: success.languages,
        },
      },
    });
  } 
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'scoutreports',
      scoutreports: {
        fetching: false,
      },
    },
  });
}

export function* GET_MANAGER_AGEGROUPS({ payload }) {
  if (!payload.silent) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'agegroups',
        agegroups: {
          fetching: true
        },
      },
    });
  }
  const success = yield call(getManagerAgeGroups, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'agegroups',
        agegroups: {
            coaches: success.coaches,
            list: success.ageGroups,
        },
      },
    });
  } 
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'agegroups',
      agegroups: {
        fetching: false,
      },
    },
  });
}

export function* GET_MANAGER_DOMAINS({ payload }) {
  if (!payload.silent) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'managerdomains',
        managerdomains: {
          fetching: true
        },
      },
    });
  }
  const success = yield call(getManagerDomains, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        field: 'managerdomains',
        managerdomains: {
            list: success.managerDomains,
            languages: success.languages,
        },
      },
    });
  } 
  yield put({
    type: actions.SET_STATE,
    payload: {
      field: 'managerdomains',
      managerdomains: {
        fetching: false,
      },
    },
  });
}

export default function* videoAnalysisSaga() {
  yield all([
    takeEvery(actions.GET_MANAGER_SCOUTS, GET_MANAGER_SCOUTS),
    takeEvery(actions.GET_MANAGER_DOMAINS, GET_MANAGER_DOMAINS),
    takeEvery(actions.GET_MANAGER_COACHES, GET_MANAGER_COACHES),
    takeEvery(actions.GET_MANAGER_TRAININGS, GET_MANAGER_TRAININGS),
    takeEvery(actions.GET_MANAGER_AGEGROUPS, GET_MANAGER_AGEGROUPS),
    takeEvery(actions.GET_MANAGER_SUBMANAGERS, GET_MANAGER_SUBMANAGERS),
    takeEvery(actions.GET_MATCH_DYNAMIC_FIELDS, GET_MATCH_DYNAMIC_FIELDS),
    takeEvery(actions.GET_MANAGER_REPORTS_BULK, GET_MANAGER_REPORTS_BULK),
    takeEvery(actions.GET_MANAGER_TRAININGTYPES, GET_MANAGER_TRAININGTYPES),
    takeEvery(actions.GET_MANAGER_SCOUTREPORTS_BULK, GET_MANAGER_SCOUTREPORTS_BULK),
    takeEvery(actions.GET_MANAGER_MATCH_QUESTIONNAIRE, GET_MANAGER_MATCH_QUESTIONNAIRE),
  ]);
}
