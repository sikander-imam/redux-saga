import { roles, managerRoles  } from '../../constants';
import { all, call, put, select, takeEvery } from "redux-saga/effects";
import {
  addSession,
  deleteSession,
  editSession,
  getPlayers,
  getSessionDetail,
  getSessionList,
  getTrainingList,
  getSessionBuildupTypes,
  getManagerSessionReport,
  getListPlayers,
  getManagerFavouritePlayers,
  setManagerFavouritePlayers,
  deleteManagerFavouritePlayers,
  removePlayer,
  getPlayersForDuplicate,
  saveAddSession,
  saveEditSession,
  deleteSessionFreeText,
  getCalendarBuildupTypesByManager,
  getCalendarTrainingBuildupTypes,
} from "../../services/session";
import actions from "./actions";
import { addPlayerProfile, getDynamicMatchQuestionnaire } from "../../services/players";
import { history } from "../../index";
import {
  getCategoryDetail,
  getPlayerQuestions,
  getPlayerAnswer,
  getPlayerMatchAnswers
} from "../../services/trainingbuildup";
import { selectSelectedCoach } from "../coaches/selectors";
import { selectUser } from "../user/selectors";
import { leftMenuKeys } from "constants";
import API from 'services/api';

export function* SESSIONLIST({ payload }) {
  const selectedCoach = yield select(selectSelectedCoach);
  const user = yield select(selectUser);
  const { role } = user;

  let calendarTrainingBuildupTypes = [];
  let calendarBuildupTypesByManager = [];

  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true
    }
  });
  const success = yield call(getSessionList, {
    ...payload,
    role,
    selectedCoach,
    coach_id: payload.coach_id || user.user_id,
  });
  calendarTrainingBuildupTypes = yield call(getCalendarTrainingBuildupTypes);
  calendarBuildupTypesByManager = yield call(getCalendarBuildupTypesByManager, user.user_id);
  if (success) {
    const total = Math.ceil(success.total / success.perPage);
    yield put({
      type: "session/SET_STATE",
      payload: {
        session: success.session,
        total,
        sessionTrainingBuildupTypes: calendarTrainingBuildupTypes || [],
        sessionBuildupTypesByManager: calendarBuildupTypesByManager || [],
      }
    });
  }
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: false
    }
  });
}

export function* SESSIONPLAYERS(payload) {
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true
    }
  });
  const selectedCoach = yield select(selectSelectedCoach);
  const user = yield select(selectUser);
  const { role } = user;
  let success, success2;
  if (managerRoles.includes(role) && !selectedCoach && !payload?.payload?.managerOnCoach) {
    if (payload?.payload?.session) {
      success = yield call(getPlayers, {
        ...payload,
        role,
        selectedCoach: {},
      });
      const favourites = yield call(getManagerFavouritePlayers);
      success = {
        newPlayers: success.newPlayers || [],
        favouritePlayers: favourites.players || [],
      };
    } else {
      const favourites = yield call(getManagerFavouritePlayers);
      success = {
        newPlayers: favourites.players || [],
        favouritePlayers: favourites.players || [],
      };
    }
  } else {
    let coachEmail;
    if (payload?.payload?.managerOnCoach) {
      const result = yield API.get(`/user/coachlist`);
      const coaches = result?.data?.coaches || [];
      const managerOnCoach = coaches.find(coach => coach.coach_id === payload?.payload?.managerOnCoach);
      coachEmail = managerOnCoach.email;
    }
    success = yield call(getPlayers, {
      ...payload,
      role,
      selectedCoach: payload?.payload?.managerOnCoach ? {
        coach_id: payload?.payload?.managerOnCoach,
        email: coachEmail,
      } : selectedCoach ,
    });
  }

  if (success) {
    yield put({
      type: "session/SET_STATE",
      payload: {
        ...success,
        players: success.newPlayers || [],
        missingPlayers: success.missingPlayers || [],
      }
    });
  } else {
    yield put({
      type: "session/SET_STATE",
      payload: {
        loading: false
      }
    });
  }
}

export function* SESSIONDELETE(payload) {
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true
    }
  });
  const success = yield call(deleteSession, payload);
  if (success) {
    yield put({
      type: "session/LIST",
      payload: { 
        page: payload.page
      }
    });
  }
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: false
    }
  });
}

export function* SESSIONDETAIL({ payload }) {
  let selectedCoach = yield select(selectSelectedCoach);
  const user = yield select(selectUser);
  const { role } = user;
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true
    }
  });
  if (payload.coach_id) {
    selectedCoach = {
      coach_id: payload.coach_id
    }
  }
  const session = yield call(getSessionDetail, {
    ...payload,
    role,
    selectedCoach,
  });
  let managerSessionReport = {};
  if (payload.page === "view-session") {
    managerSessionReport = yield call(getManagerSessionReport, payload.id);
  }
  let trainingList = yield call(getTrainingList, { role, selectedCoach });
  let newTraining;
  if (session && trainingList) {
    let sessionEx = session.excercise || [];
    const ifaExercises = session.excercise_ifa?.map(ife => {
        return {
          ...ife,
          domain: ife.domain_name,
        }
    }) || [];
    sessionEx = sessionEx?.concat(ifaExercises);
    newTraining = trainingList.map((trainingItem) => {
      let exArr = [];
      sessionEx.map((ex) => {
        if (ex.type === trainingItem.training_name) {
          exArr.push({
            domain: ex.domain,
            minutes: ex.minutes,
            exerciseDetails: ex,
            category_id: ex.category_id,
            comment: ex.session_comment,
            exercise_id: ex.keymoment_id,
            category_name: ex.category_name,
            tag_players: ex.tag_players || [],
            time_intervals: ex.time_intervals || "",
            between_intervals: ex.between_intervals || "",
            tag_player_status: ex.tag_player_status || "1",
            exercise_name: ex.keymoment || ex.exercise_name,
            selectedPlayers: ex.tag_player_status === "1" ? [] : (ex.tag_players?.map(tPlayer => tPlayer.user_id) || []),
          });
        }
      });
      if (!trainingItem.selectedExercises) {
        return { ...trainingItem, selectedExercises: exArr };
      }
    });
  }

  if (session) {
    yield put({
      type: "session/SET_STATE",
      payload: {
        loading: false,
        session: session,
        training: newTraining,
        managerSessionReport: managerSessionReport.session || [],
      }
    });
  } else {
    yield put({
      type: "session/SET_STATE",
      payload: {
        loading: false
      }
    });
  }
}

export function* SESSION_DUPLICATE(payload) {
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true
    }
  });

  yield call(getPlayersForDuplicate, payload);

  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: false
    }
  });
}

export function* SESSIONADD(payload) {
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true
    }
  });
  const success = yield call(addSession, payload);
  if (success) {
    yield put({
      type: "session/SET_STATE",
      payload: {
        session: success,
        loading: false
      }
    });
    if (payload.payload?.returnToList) {
      history.push("/my-sessions/?page=1&sort=1");
    } else {
      history.push(`/my-sessions/${success.sessionId}`);
    }
    yield;
  }
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: false
    }
  });
}

export function* SESSIONEDIT(payload) {
  const sessionId = payload.payload?.session_id;
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true
    }
  });
  const success = yield call(editSession, payload);
  if (success) {
    if (payload.payload?.returnToList) {
      history.push("/my-sessions/?page=1&sort=1");
    } else {
      history.push(`/my-sessions/${sessionId}`);
    }
    yield put({
      type: "session/SET_STATE",
      payload: {
        loading: false
      }
    });
  }
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: false
    }
  });
}

export function* SAVESESSIONADD(payload) {
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true
    }
  });
  const success = yield call(saveAddSession, payload);
  if (success) {
    yield put({
      type: "session/SET_STATE",
      payload: {
        session: success,
        loading: false
      }
    });
    history.push("/my-sessions/?page=1&sort=1");
    yield;
  }
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: false
    }
  });
}

export function* SAVESESSIONEDIT(payload) {
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true
    }
  });
  console.log({
    payload
  });
  const success = yield call(saveEditSession, payload);
  if (success) {
    history.push("/my-sessions/?page=1&sort=1");
    yield put({
      type: "session/SET_STATE",
      payload: {
        loading: false
      }
    });
  }
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: false
    }
  });
}

export function* TRAINING() {
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true
    }
  });

  // const success = yield call(getTrainingList);
  const builduptypes = yield call(getSessionBuildupTypes);

  if (builduptypes) {
    yield put({
      type: "session/SET_STATE",
      payload: {
        // training: success,
        builduptypes: builduptypes || [],
      }
    });
  }
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: false
    }
  });
}

export function* SESSIONADDPROFILE(payload) {
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true
    }
  });
  const success = yield call(addPlayerProfile, payload);
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: false
    }
  });
  if (!success) {
    return;
  }
}

export function* GETLISTPLAYERS(pl) {
  const { payload } = pl
  const selectedCoach = yield select(selectSelectedCoach);
  const user = yield select(selectUser);
  const { role } = user;
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true
    }
  });

  let favourites = [];
  let session = {};
  if (payload.isManager) {
    if (payload.coach_id) {
      session = yield call(getListPlayers, {
        ...payload,
        role,
        selectedCoach,
        coachId: payload,
      });
    } else {
      favourites = yield call(getManagerFavouritePlayers, payload);
    }
  }
  if (!payload.isManager) {
    session = yield call(getListPlayers, {
      ...payload,
      role,
      selectedCoach,
      coachId: payload,
    });
  }
  if (session) {
    yield put({
      type: "session/SET_STATE",
      payload: {
        favouritePlayers: favourites.players || [],
        sessionAttendance: session.sessionAttendance || [],
        players: session.players?.[0] ? session.players : [],
      }
    });
  }
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: false
    }
  });
}

export function* REMOVEPLAYER({ payload }) {
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true
    }
  });
  const result = yield call(removePlayer, payload);
  if (result.status) {
    const success = yield call(getListPlayers, payload);
    if (success) {
      yield put({
        type: "session/SET_STATE",
        payload: {
          loading: false,
          players: success.players[0] ? success.players : []
        }
      });
    }
  }
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: false
    }
  });
}

export function* SET_MANAGER_FAVOURITE_PLAYER({ payload }) {
  yield put({
    type: "session/SET_STATE",
    payload: {
      favouritePlayers: payload.favouritePlayers,
    }
  });
  yield call(setManagerFavouritePlayers, payload.user_id);
}

export function* DELETE_SESSION_FREE_TEXT({ payload }) {
  yield call(deleteSessionFreeText, payload);
}

export function* DELETE_MANAGER_FAVOURITE_PLAYER({ payload }) {
  yield put({
    type: "session/SET_STATE",
    payload: {
      favouritePlayers: payload.favouritePlayers,
    }
  });
  yield call(deleteManagerFavouritePlayers, payload.user_id);
}

export function* CATEGORY_DETAIL_FOR_DUPLICATE({ payload }) {
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true
    }
  });
  const success = yield call(getCategoryDetail, payload);
  if (success) {
    yield put({
      type: "session/SET_STATE",
      payload: { trainingInfo: success }
    });
  }
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: false
    }
  });
}

export function* FETCH_PLAYER_QUESTIONS() {
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true
    }
  });
  const success = yield call(getPlayerQuestions);
  if (success) {
    yield put({
      type: "session/SET_STATE",
      payload: { playerQuestions: success }
    });
  }
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: false
    }
  });
}

export function* PLAYER_WELL_BEING_DETAIL({ payload }) {
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true
    }
  });
  const success = yield call(getPlayerAnswer, payload);
  if (success) {
    yield put({
      type: "session/SET_STATE",
      payload: { playerAnswers: success }
    });
  }
}

export function* GET_MATCH_QUESTIONNAIRE_ANSWERS({ payload }) {
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true
    }
  });
  const success = yield call(getPlayerMatchAnswers, payload);
  if (success) {
    yield put({
      type: "session/SET_STATE",
      payload: {
        loading: false,
        playerMatchAnswers: success.report,
        playerMatchDynamicAnswers: success.answers,
        playerMatchDynamicQuestions: success.questions,
      }
    });
  } else {
    yield put({
      type: "session/SET_STATE",
      payload: {
        loading: false,
      }
    });
  }
}


export function* GET_PLAYER_DYNAMIC_QUESTIONNAIRE({ payload }) {
  yield put({
    type: actions.SET_STATE,
    payload: {
      playerquestionnaire: {
        answers: [],
        questions: [],
        loading: false,
      }
    },
  });
  const success = yield call(getDynamicMatchQuestionnaire, payload);
  if (success) {
    yield put({
      type: actions.SET_STATE,
      payload: {
        playerquestionnaire: {
          loading: false,
          answers: success.answers,
          questions: success.questions,
        }
      },
    });
  } else {
    yield put({
      type: actions.SET_STATE,
      payload: {
        playerquestionnaire: {
          answers: [],
          questions: [],
          loading: false,
        }
      },
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.SESSION_LIST, SESSIONLIST),
    takeEvery(actions.SESSION_DELETE, SESSIONDELETE),
    takeEvery(actions.SESSION_TRAINING, TRAINING),
    takeEvery(actions.SESSION_DETAIL, SESSIONDETAIL),
    takeEvery(actions.SESSION_PLAYERS, SESSIONPLAYERS),
    takeEvery(actions.SESSION_ADD, SESSIONADD),
    takeEvery(actions.SESSION_EDIT, SESSIONEDIT),
    takeEvery(actions.SESSION_ADD_SAVE, SAVESESSIONADD),
    takeEvery(actions.SESSION_EDIT_SAVE, SAVESESSIONEDIT),
    takeEvery(actions.SESSION_DELETE_FREE_TEXT, DELETE_SESSION_FREE_TEXT),
    takeEvery(actions.SESSION_ADD_PROFILE, SESSIONADDPROFILE),
    takeEvery(actions.SESSION_LIST_PROFILE, GETLISTPLAYERS),
    takeEvery(actions.REMOVE_PLAYER, REMOVEPLAYER),
    takeEvery(actions.SESSION_DUPLICATE, SESSION_DUPLICATE),
    takeEvery(actions.PLAYER_QUESTIONS, FETCH_PLAYER_QUESTIONS),
    takeEvery(actions.PLAYER_WELL_BEING_DETAIL, PLAYER_WELL_BEING_DETAIL),
    takeEvery(actions.SET_MANAGER_FAVOURITE_PLAYER, SET_MANAGER_FAVOURITE_PLAYER),
    takeEvery(actions.CATEGORY_DETAIL_FOR_DUPLICATE, CATEGORY_DETAIL_FOR_DUPLICATE),
    takeEvery(actions.DELETE_MANAGER_FAVOURITE_PLAYER, DELETE_MANAGER_FAVOURITE_PLAYER),
    takeEvery(actions.GET_MATCH_QUESTIONNAIRE_ANSWERS, GET_MATCH_QUESTIONNAIRE_ANSWERS),
    takeEvery(actions.GET_MATCH_DYNAMIC_QUESTIONNAIRE, GET_PLAYER_DYNAMIC_QUESTIONNAIRE),
  ]);
}
