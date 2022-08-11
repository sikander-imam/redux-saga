import { all, takeEvery, put, call } from 'redux-saga/effects';
import { addScoutPlayer, getPlayers, getPlayersBulk, getScoutStats, addMatchReport, getScoutReports, getScoutReport, getScoutPlayer, getScoutEvents, getManagerPlayers, getManagerReports, getManagerStats, getManagerEvents, getManagerAverageStats, getManagerReport, getManagerPlayer, addScoutClub, getScoutClubs, getScoutClub } from '../../services/scout';
import { message } from 'antd';
import { history } from 'index';
import actions from './actions';

export function* GET_PLAYERS_BULK({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(getPlayersBulk, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        scoutClubs: success.scoutClubs,
        scoutPlayer: success.scoutPlayer,
        teamPositions: success.teamPositions,
      },
    });
  } else {
    message.error(payload?.formatMessage({ id: "general.SomethingWentWrong" }));
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
  }
}

export function* GET_SCOUT_PLAYERS({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(getPlayers, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        scoutPlayers: success.players,
        scoutClubs: success.scoutClubs,
        teamPositions: success.teamPositions,
        allScoutPlayers: success.allScoutPlayers,
        scoutReportsFields: success.scoutReportsFields,
      },
    });
  } else {
    message.error(payload?.formatMessage({ id: "general.SomethingWentWrong" }));
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
  }
}

export function* GET_MANAGER_PLAYERS({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(getManagerPlayers, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        allScouts: success.allScouts,
        scoutClubs: success.scoutClubs,
        teamPositions: success.teamPositions,
        scoutPlayers: success.allScoutPlayers,
        allScoutPlayers: success.allScoutPlayers,
        scoutReportsFields: success.scoutReportsFields,
      },
    });
  } else {
    message.error(payload?.formatMessage({ id: "general.SomethingWentWrong" }));
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
  }
}

export function* ADD_SCOUT_PLAYER({ payload }) {
    if (!payload.silent) {
      yield put({
        type: actions.SET_STATE,
        payload: {
          loading: true,
        },
      });
    }
    const success = yield call(addScoutPlayer, payload);
    if (success) {
      yield put({
        type: actions.SET_STATE,
        payload: {
          loading: false
        },
      });
      if (payload.onSuccess) {
        payload.onSuccess(success);
      }
      if (payload.formatMessage && !payload.silent) {
        message.success(payload.formatMessage({ id: "players.playedAddedSuccess" }));
      }
    } else {
      yield put({
        type: actions.SET_STATE,
        payload: {
          loading: false,
        },
      });
      if (payload.formatMessage && !payload.silent) {
        message.error(payload.formatMessage({ id: "general.SomethingWentWrong" }));
      }
      if (payload.onError) {
        payload.onError();
      }
    }
  }

  export function* GET_SCOUT_STATS({ payload }) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: true,
      },
    });
    const success = yield call(getScoutStats, payload);
    if (success) {
      yield put({
        type: actions.SET_STATE,
        payload: {
          loading: false,
          scoutStats: success.scoutStats,
          allScoutPlayers: success.allScoutPlayers,
          scoutReportsFields: success.scoutReportsFields,
          scoutReportsWithPlayers: success.scoutReportsWithPlayers,
        },
      });
    } else {
      yield put({
        type: actions.SET_STATE,
        payload: {
          loading: false,
        },
      });
      if (payload.formatMessage) {
        message.error(payload.formatMessage({ id: "general.SomethingWentWrong" }));
      }
    }
}

export function* GET_MANAGER_STATS({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(getManagerStats, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        scoutStats: success.scoutStats,
        allScoutPlayers: success.allScoutPlayers,
        scoutReportsFields: success.scoutReportsFields,
      },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
    if (payload.formatMessage) {
      message.error(payload.formatMessage({ id: "general.SomethingWentWrong" }));
    }
  }
}

export function* GET_MANAGER_AVERAGE_STATS({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(getManagerAverageStats, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        scoutStats: success.scoutStats,
        allScoutPlayers: success.allScoutPlayers,
        scoutReportsFields: success.scoutReportsFields,
      },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
    if (payload.formatMessage) {
      message.error(payload.formatMessage({ id: "general.SomethingWentWrong" }));
    }
  }
}

export function* ADD_MATCH_REPORT({ payload }) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: true,
      },
    });
    const success = yield call(addMatchReport, payload);
    if (success) {
      yield put({
        type: actions.SET_STATE,
        payload: {
          loading: false,
        },
      });
      if (payload.onSuccess) {
        payload.onSuccess(success);
      }
      if (payload.formatMessage) {
        message.success(payload.formatMessage({ id: "general.reportAddedSuccess" }));
      }
    } else {
      yield put({
        type: actions.SET_STATE,
        payload: {
          loading: false,
        },
      });
      if (payload.onError) {
        payload.onError();
      }
      if (payload.formatMessage) {
        message.error(payload.formatMessage({ id: "general.SomethingWentWrong" }));
      }
    }
}

export function* ADD_SCOUT_CLUB({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(addScoutClub, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
    if (payload.onSuccess) {
      payload.onSuccess(success);
    }
    if (payload.formatMessage) {
      message.success(payload.formatMessage({ id: "general.clubAddedSuccess" }));
    }
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
    if (payload.onError) {
      payload.onError();
    }
    if (payload.formatMessage) {
      message.error(payload.formatMessage({ id: "general.SomethingWentWrong" }));
    }
  }
}

export function* GET_SCOUT_REPORTS({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(getScoutReports, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        scoutClubs: success.scoutClubs,
        scoutReports: success.scoutReports,
      },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
    if (payload.formatMessage) {
      message.error(payload.formatMessage({ id: "general.SomethingWentWrong" }));
    }
  }
}

export function* GET_MANAGER_REPORTS({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(getManagerReports, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        scoutReports: success.scoutReports,
      },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
    if (payload.formatMessage) {
      message.error(payload.formatMessage({ id: "general.SomethingWentWrong" }));
    }
  }
}

export function* GET_SCOUT_PLAYER({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(getScoutPlayer, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        scoutClubs: success.scoutClubs,
        scoutPlayer: success.scoutPlayer,
        teamPositions: success.teamPositions,
        scoutPlayerHistory: success.scoutPlayerHistory,
        scoutReportsFields: success.scoutReportsFields,
        scoutPlayerMatches: success.scoutPlayerMatches,
      },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
    if (payload.formatMessage) {
      message.error(payload.formatMessage({ id: "general.SomethingWentWrong" }));
    }
  }
}

export function* GET_MANAGER_PLAYER({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(getManagerPlayer, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        scoutClubs: success.scoutClubs,
        scoutPlayer: success.scoutPlayer,
        teamPositions: success.teamPositions,
        scoutPlayerHistory: success.scoutPlayerHistory,
        scoutReportsFields: success.scoutReportsFields,
        scoutPlayerMatches: success.scoutPlayerMatches,
      },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
    if (payload.formatMessage) {
      message.error(payload.formatMessage({ id: "general.SomethingWentWrong" }));
    }
  }
}

export function* GET_SCOUT_REPORT({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(getScoutReport, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        scoutReportDetails: success.scoutReportDetails,
      },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
    if (payload.formatMessage) {
      message.error(payload.formatMessage({ id: "general.SomethingWentWrong" }));
    }
  }
}

export function* GET_MANAGER_REPORT({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(getManagerReport, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        allScouts: success.allScouts,
        scoutReportDetails: success.scoutReportDetails,
      },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
    if (payload.formatMessage) {
      message.error(payload.formatMessage({ id: "general.SomethingWentWrong" }));
    }
  }
}

export function* GET_SCOUT_EVENTS({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(getScoutEvents, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        scoutEvents: success.scoutEvents,
      },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
    if (payload.formatMessage) {
      message.error(payload.formatMessage({ id: "general.SomethingWentWrong" }));
    }
  }
}

export function* GET_MANAGER_EVENTS({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(getManagerEvents, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        scoutEvents: success.scoutEvents,
      },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
    if (payload.formatMessage) {
      message.error(payload.formatMessage({ id: "general.SomethingWentWrong" }));
    }
  }
}

export function* GET_SCOUT_CLUBS({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(getScoutClubs, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        scoutClubs: success.scoutClubs,
      },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
    if (payload.formatMessage) {
      message.error(payload.formatMessage({ id: "general.SomethingWentWrong" }));
    }
  }
}

export function* GET_SCOUT_CLUB({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      loading: true,
    },
  });
  const success = yield call(getScoutClub, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
        scoutClub: success.scoutClub,
      },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        loading: false,
      },
    });
    if (payload.formatMessage) {
      message.error(payload.formatMessage({ id: "general.SomethingWentWrong" }));
    }
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_SCOUT_STATS, GET_SCOUT_STATS),
    takeEvery(actions.GET_PLAYERS_BULK, GET_PLAYERS_BULK),
    takeEvery(actions.ADD_SCOUT_PLAYER, ADD_SCOUT_PLAYER),
    takeEvery(actions.GET_SCOUT_PLAYERS, GET_SCOUT_PLAYERS),
    takeEvery(actions.ADD_MATCH_REPORT, ADD_MATCH_REPORT),
    takeEvery(actions.GET_SCOUT_REPORT, GET_SCOUT_REPORT),
    takeEvery(actions.GET_SCOUT_PLAYER, GET_SCOUT_PLAYER),
    takeEvery(actions.GET_MANAGER_PLAYER, GET_MANAGER_PLAYER),
    takeEvery(actions.GET_SCOUT_EVENTS, GET_SCOUT_EVENTS),
    takeEvery(actions.GET_SCOUT_REPORTS, GET_SCOUT_REPORTS),
    takeEvery(actions.GET_MANAGER_STATS, GET_MANAGER_STATS),
    takeEvery(actions.GET_MANAGER_PLAYERS, GET_MANAGER_PLAYERS),
    takeEvery(actions.GET_MANAGER_REPORTS, GET_MANAGER_REPORTS),
    takeEvery(actions.GET_MANAGER_EVENTS, GET_MANAGER_EVENTS),
    takeEvery(actions.GET_MANAGER_REPORT, GET_MANAGER_REPORT),
    takeEvery(actions.GET_MANAGER_AVERAGE_STATS, GET_MANAGER_AVERAGE_STATS),
    takeEvery(actions.ADD_SCOUT_CLUB, ADD_SCOUT_CLUB),
    takeEvery(actions.GET_SCOUT_CLUBS, GET_SCOUT_CLUBS),
    takeEvery(actions.GET_SCOUT_CLUB, GET_SCOUT_CLUB),
  ]);
}
