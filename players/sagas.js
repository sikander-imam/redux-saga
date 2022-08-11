import { all, call, put, takeEvery } from "redux-saga/effects";
import { MatchesApi } from "../../services/matches";
import actions from "./actions";
import { notification } from 'antd';
import { history } from "index";
import sessionActions from "redux/session/actions";
import {
  getPlayersInfo,
  getPlayerProfile,
  getAllPlayersReports,
  getAllMatchesPlayers,
  getPlayerDynamicGrades,
  getPlayersReportFields,
  savePlayersReportFields,
  getPlayersCoachReports,
  getPlayerReports,
  getReportPlayers,
  getOutSquadPlayers,
  addOutSquadPlayers,
  removeOutSquadPlayers,
  deletePlayerReport,
  getPlayersPositions,
  getPlayerSessionsAttendance,
  getPlayerSeasonMatches,
  getPlayerProfileHistory,
  getAllClubPlayers,
} from "../../services/players";

export function* PLAYERSDETAIL({payload}) {
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      loading: true,
    },
  });
  const labels = yield call(MatchesApi.getManagerReportlabels, {});
  const playerReports = yield call(getPlayerDynamicGrades, {payload});
  const success = yield call(getPlayersInfo, {payload});
  if (success) {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        player: success,
        loading: false,
        reports: playerReports || {},
        videos: playerReports.videos || [],
        dynamicLabels: labels ? labels.list : [],
        allTeamPlayers: playerReports.all_players || [],
        reportsGrades: playerReports.reports_stats || [],
        playerHistory: playerReports.player_history || [],
        playerAttendance: playerReports.session_attendence || [],
      },
    });
  }
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      loading: false,
    },
  });
}

export function* GET_PLAYER_PROFILE({ payload }) {
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      loading: true,
    },
  });
  const success = yield call(getPlayerProfile, payload);
  if (success) {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        playerProfile: success.player,
      },
    });
  }
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      loading: false,
    },
  });
}

export function* GET_ALL_PLAYERS_STATS({payload}) {
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      loading: true,
    },
  });
  // const labels = yield call(MatchesApi.getManagerReportlabels, {});
  const allMatchPlayers = yield call(getAllMatchesPlayers, payload);
  if (allMatchPlayers) {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        loading: false,
        dynamicLabels: allMatchPlayers.labels || [],
        allPlayersStats: allMatchPlayers.report || [],
      },
    });
  }
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      loading: false,
    },
  });
}

export function* GET_ALL_PLAYERS_REPORTS({ payload }) {
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      loading: true,
      loadingPlayersReports: false,
    },
  });
  const allPlayersReports = yield call(getAllPlayersReports);
  if (allPlayersReports) {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        loading: false,
        loadingPlayersReports: true,
        allPlayersReports: allPlayersReports.report || [],
      },
    });
  }
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      loading: false,
      loadingPlayersReports: false,
    },
  });
}

export function* GET_PLAYERS_REPORT_FIELDS({ payload }) {
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      loading: true,
    },
  });
  const playersReportFields = yield call(getPlayersReportFields, payload);
  console.log('Fields', playersReportFields);
  if (playersReportFields) {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        loading: true,
        playersReportFields: playersReportFields.fields,
      },
    });
    let reportsPayload = {
      remove_player: playersReportFields?.remove_player || [],
      coach_assign: playersReportFields?.coach_assign || [],
      type: playersReportFields?.coach_assign?.length > 0 ? 'public' : 'private',
    };
    if (playersReportFields.coaches) {
      reportsPayload.coaches = playersReportFields.coaches;
    }
    if (playersReportFields.report) {
      reportsPayload.values = playersReportFields.report;
    }
    if (playersReportFields.details) {
      reportsPayload.details = playersReportFields.details;
    }
    yield put({
      type: actions.SET_PLAYERS_REPORTS,
      payload: reportsPayload,
    });
  }
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      loading: false,
    },
  });
}

export function* SAVE_PLAYERS_REPORT_FIELDS({ payload }) {
  yield put({
    type: actions.SET_PLAYERS_REPORTS,
    payload: {
      saving: true,
      modified: true,
      values: payload.report_data,
      details: payload.report?.[0] || {},
    },
  });
  const playersReportFields = yield call(savePlayersReportFields, payload);
  if (playersReportFields) {
    notification.success({
      message: "Report saved!",
      description: "You have successfully saved the report",
    });
    history.push('/my-players/4');
  }
  yield put({
    type: actions.SET_PLAYERS_REPORTS,
    payload: {
      saving: false,
      modified: false,
      values: payload.report_data,
      details: payload.report?.[0] || {},
    },
  });
}

export function* GET_REPORT_PLAYERS({ payload }) {
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      loading: true,
    },
  });
  const reportPlayers = yield call(getReportPlayers, payload);
  if (reportPlayers) {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        loading: false,
        reportPlayers: reportPlayers.players,
      },
    });
  }
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      loading: false,
    },
  });
}

export function* GET_PLAYERS_COACH_REPORTS({ payload }) {
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      loading: true,
    },
  });
  const playersCoachReports = yield call(getPlayersCoachReports, payload);
  if (playersCoachReports) {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        loading: false,
        playersCoachReports: playersCoachReports.fields,
      },
    });
  }
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      loading: false,
    },
  });
}

export function* GET_PLAYER_REPORTS({ payload }) {
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      loading: true,
    },
  });
  const playerReports = yield call(getPlayerReports, payload);
  if (playerReports) {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        loading: false,
        playerReports: playerReports.reports,
      },
    });
  }
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      loading: false,
    },
  });
}

export function* MODIFY_PLAYERS_REPORT({ payload }) {
  yield put({
    type: actions.SET_PLAYERS_REPORTS,
    payload,
  });
}

export function* GET_COACH_OUT_SQUAD_PLAYERS({ payload }) {
  yield put({
    type: actions.UPDATE_OUT_SQUAD,
    payload: {
      loading: true,
    },
  });
  const outSquad = yield call(getOutSquadPlayers, payload);
  if (outSquad) {
    yield put({
      type: actions.UPDATE_OUT_SQUAD,
      payload: {
        players: outSquad.players,
      },
    });
  }
  yield put({
    type: actions.UPDATE_OUT_SQUAD,
    payload: {
      loading: false,
    },
  });
}

export function* ADD_COACH_OUT_SQUAD_PLAYERS({ payload }) {
  yield put({
    type: actions.UPDATE_OUT_SQUAD,
    payload: {
      adding: true,
    },
  });
  const outSquad = yield call(addOutSquadPlayers, payload);
  yield put({
    type: actions.UPDATE_OUT_SQUAD,
    payload: {
      adding: false,
    },
  });
  if (!outSquad) {
    return;
  } else {
    history.push('/my-players/1');
  }
}

export function* REMOVE_COACH_OUT_SQUAD_PLAYERS({ payload }) {
  yield call(removeOutSquadPlayers, payload);
  if (payload.dispatch) {
    payload.dispatch();
  }
}

export function* DELETE_PLAYER_REPORTS({ payload }) {
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      loading: true,
    },
  });
  const result = yield call(deletePlayerReport, payload);
  if (result) {
    history.push('/my-players/4');
  }
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      loading: false,
    },
  });
}

export function* GET_PLAYERS_POSITIONS({ payload }) {
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      positions: {
        list: [],
        getting: true,
      }
    },
  });
  const response = yield call(getPlayersPositions, payload);
  if (response) {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        positions: {
          getting: false,
          list: response.positions || [],
        }
      },
    });
  } else {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        positions: {
          list: [],
          getting: false,
        }
      },
    });
  }
}


export function* GET_PLAYER_SESSIONS_ATTENDANCE({ payload }) {
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      playerSessionsAttendance: {
        list: [],
        getting: true,
      }
    },
  });
  const response = yield call(getPlayerSessionsAttendance, payload);
  if (response) {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        playerSessionsAttendance: {
          list: response.attendance,
          getting: false,
        }
      },
    });
  } else {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        playerSessionsAttendance: {
          list: [],
          getting: false,
        }
      },
    });
  }
}

export function* GET_PLAYER_CLUB_REPORTS({ payload }) {
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      playerClubReports: {
        list: [],
        getting: true,
      }
    },
  });
  const playerReports = yield call(getPlayerReports, payload);
  if (playerReports) {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        playerClubReports: {
          getting: false,
          list: playerReports.reports,
        }
      },
    });
  } else {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        playerClubReports: {
          list: [],
          getting: false,
        }
      },
    });
  }
}

export function* GET_PLAYER_SEASON_MATCHES({ payload }) {
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      playerSeasonMatches: {
        list: [],
        getting: true,
        matchDynamicLabels: [],
      }
    },
  });
  const playerMatches = yield call(getPlayerSeasonMatches, payload);
  if (playerMatches) {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        playerSeasonMatches: {
          getting: false,
          list: playerMatches.matches,
          matchDynamicLabels: playerMatches.dynamicLabels,
        }
      },
    });
  } else {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        playerSeasonMatches: {
          list: [],
          getting: false,
          matchDynamicLabels: [],
        }
      },
    });
  }
}

export function* GET_PLAYER_PROFILE_HISTORY({ payload }) {
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      playerProfileHistory: {
        list: [],
        getting: true,
      }
    },
  });
  const response = yield call(getPlayerProfileHistory, payload);
  if (response) {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        playerProfileHistory: {
          getting: false,
          list: response.history,
        }
      },
    });
  } else {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        playerProfileHistory: {
          list: [],
          getting: false,
        }
      },
    });
  }
}

export function* GET_ALL_CLUB_PLAYERS({ payload }) {
  yield put({
    type: actions.SET_PLAYERS_DETAIL,
    payload: {
      allClubPlayers: {
        list: [],
        getting: true,
      }
    },
  });
  const response = yield call(getAllClubPlayers, payload);
  if (response) {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        allClubPlayers: {
          getting: false,
          list: response.players,
        }
      },
    });
  } else {
    yield put({
      type: actions.SET_PLAYERS_DETAIL,
      payload: {
        allClubPlayers: {
          list: [],
          getting: false,
        }
      },
    });
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.GET_PLAYERS_DETAIL, PLAYERSDETAIL)]);
  yield all([takeEvery(actions.GET_REPORT_PLAYERS, GET_REPORT_PLAYERS)]);
  yield all([takeEvery(actions.GET_PLAYER_REPORTS, GET_PLAYER_REPORTS)]);
  yield all([takeEvery(actions.GET_PLAYER_PROFILE, GET_PLAYER_PROFILE)]);
  yield all([takeEvery(actions.GET_PLAYERS_POSITIONS, GET_PLAYERS_POSITIONS)]);
  yield all([takeEvery(actions.DELETE_PLAYER_REPORTS, DELETE_PLAYER_REPORTS)]);
  yield all([takeEvery(actions.GET_ALL_PLAYERS_STATS, GET_ALL_PLAYERS_STATS)]);
  yield all([takeEvery(actions.MODIFY_PLAYERS_REPORTS, MODIFY_PLAYERS_REPORT)]);
  yield all([takeEvery(actions.GET_ALL_PLAYERS_REPORTS, GET_ALL_PLAYERS_REPORTS)]);
  yield all([takeEvery(actions.GET_PLAYERS_COACH_REPORTS, GET_PLAYERS_COACH_REPORTS)]);
  yield all([takeEvery(actions.GET_PLAYERS_REPORTS_FIELDS, GET_PLAYERS_REPORT_FIELDS)]);
  yield all([takeEvery(actions.SAVE_PLAYERS_REPORTS_FIELDS, SAVE_PLAYERS_REPORT_FIELDS)]);
  yield all([takeEvery(actions.GET_COACH_OUT_SQUAD_PLAYERS, GET_COACH_OUT_SQUAD_PLAYERS)]);
  yield all([takeEvery(actions.ADD_COACH_OUT_SQUAD_PLAYERS, ADD_COACH_OUT_SQUAD_PLAYERS)]);
  yield all([takeEvery(actions.REMOVE_COACH_OUT_SQUAD_PLAYERS, REMOVE_COACH_OUT_SQUAD_PLAYERS)]);
  yield all([takeEvery(actions.GET_PLAYER_SESSIONS_ATTENDANCE, GET_PLAYER_SESSIONS_ATTENDANCE)]);
  yield all([takeEvery(actions.GET_PLAYER_CLUB_REPORTS, GET_PLAYER_CLUB_REPORTS)]);
  yield all([takeEvery(actions.GET_PLAYER_SEASON_MATCHES, GET_PLAYER_SEASON_MATCHES)]);
  yield all([takeEvery(actions.GET_PLAYER_PROFILE_HISTORY, GET_PLAYER_PROFILE_HISTORY)]);
  yield all([takeEvery(actions.GET_ALL_CLUB_PLAYERS, GET_ALL_CLUB_PLAYERS)]);
}