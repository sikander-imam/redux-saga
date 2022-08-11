import { all, takeEvery, put, call } from "redux-saga/effects";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  currentAccount,
  logout,
  signIn,
  recoverAccount,
  changePassword,
  updateProfile,
  updateAgeGroup,
  getAgeGroups,
} from "services/user/index";
import { history } from "index";
import actions from "./actions";
// import { GET_DATA } from "redux/menu/";
import { API_RESPOSE_TYPE_ERROR, API_RESPOSE_TYPE_SUCCESS } from '../../constants';

export function* SIGN_IN({ payload }) {
  yield put({
    type: "user/SET_STATE",
    payload: {
      signingIn: true,
      signingInErrorMessage: null,
    }
  });
  if (!payload.device_type) {
    payload.device_type = "web";
  }
  const { type, message, data } = yield call(signIn, payload);
  if (type === API_RESPOSE_TYPE_SUCCESS && data) {
    yield put({
      type: "user/SET_STATE",
      payload: {
        avatar: null,
        loading: false,
        signingIn: false,
        authorized: true,
        vimeo: data.vimeo,
        ages: data.user.ages,
        name: data.user.name,
        role: data.user.type,
        email: data.user.email,
        id: data.user.login_id,
        is_blog: data.is_blog,
        is_editor: data.is_editor,
        user_id: data.user.user_id,
        signingInErrorMessage: null,
      }
    });
    yield put({
      type: "menu/GET_DATA",
      payload: {
        user: {
          avatar: null,
          loading: false,
          authorized: true,
          type: data.user.type,
          name: data.user.name,
          email: data.user.email,
          id: data.user.login_id,
          user_id: data.user.user_id
        }
      }
    });
    if (data.user?.type === "player") {
      history.push('/player/a/schedule');
    } else if (data.user?.type === "scout") {
      history.push('/scout/shadowteam');
    }
    else {
      history.push('/homepage');
    }
  } else {
    yield put({
      type: "user/SET_STATE",
      payload: {
        signingIn: false,
        signingInErrorMessage: message,
      }
    });
  }
}

export function* RECOVER_ACCOUNT({ payload }) {
  yield put({
    type: "user/SET_STATE",
    payload: {
      recovering: true,
      recoveringSuccess: false,
      recoveringErrorMessage: null,
    }
  });
  const { type, message, data } = yield call(recoverAccount, payload);
  if (data) {
    yield put({
      type: "user/SET_STATE",
      payload: {
        recovering: false,
        recoveringSuccess: true,
        recoveringErrorMessage: null,
      }
    });
    // yield history.push("/user/login");
  } else {
    yield put({
      type: "user/SET_STATE",
      payload: {
        recovering: false,
        recoveringSuccess: false,
        recoveringErrorMessage: message,
      }
    });
  }
}


export function* CHANGE_PASSWORD({ payload }) {
  yield put({
    type: "user/SET_STATE",
    payload: {
      changePassword: {
        success: false,
        changing: true,
        errorMessage: null,
      }
    }
  });
  const { type, message, data } = yield call(changePassword, payload);
  if (data) {
    yield put({
      type: "user/SET_STATE",
      payload: {
        changePassword: {
          success: true,
          changing: false,
          errorMessage: null,
        }
      }
    });
  } else {
    yield put({
      type: "user/SET_STATE",
      payload: {
        changePassword: {
          success: false,
          changing: false,
          errorMessage: message,
        }
      }
    });
  }
}

export function* UPDATE_PROFILE({ payload }) {
  yield put({
    type: "user/SET_STATE",
    payload: {
      updateProfile: {
        success: false,
        changing: true,
        errorMessage: null,
      }
    }
  });

  let message, data, updateAges;

  const profileResult = yield call(updateProfile, payload.profile);
  data = profileResult?.data;
  message = profileResult?.message;
  
  const hostname = window.location.hostname.split('.')[0];
  if (["localhost", "eft"].includes(hostname)) {
    const ageGroupResult = yield call(updateAgeGroup, payload.profile);
    data = ageGroupResult?.data;
    message = ageGroupResult?.message;
    updateAges = true;
  }

  if (data) {
    yield put({
      type: "user/SET_STATE",
      payload: {
        ...payload.user,
        updateProfile: {
          success: true,
          changing: false,
          errorMessage: null,
        }
      }
    });
    let user = JSON.parse(localStorage.getItem("user"));
    if (updateAges) {
      user = {
        ...user,
        ages: payload?.user?.ages,
      }
    }
    localStorage.setItem("user", JSON.stringify({
      ...user,
      name: payload?.user?.name,
    }));
  } else {
    yield put({
      type: "user/SET_STATE",
      payload: {
        updateProfile: {
          success: false,
          changing: false,
          errorMessage: message,
        }
      }
    });
  }
}

export function* GET_AGE_GROUPS({ payload }) {
  yield put({
    type: "user/SET_STATE",
    payload: {
      ageGroups: {
        data: [],
        loading: true,
      },
    }
  });

  const { message, data } = yield call(getAgeGroups); 
  if (data) {
    yield put({
      type: "user/SET_STATE",
      payload: {
        ageGroups: {
          loading: false,
          data: data["Age Category"]
        },
      }
    });
  } else {
    yield put({
      type: "user/SET_STATE",
      payload: {
        ageGroups: {
          data: [],
          loading: true,
        },
      }
    });
  }
}


export function* DEFAULT_PROFILE() {
  yield put({
    type: "user/SET_STATE",
    payload: {
      updateProfile: {
        success: false,
        changing: false,
        errorMessage: null,
      },
      changePassword: {
        success: false,
        changing: false,
        errorMessage: null,
      }
    }
  });
}

export function* DEFAULT_RECOVER_ACCOUNT({ payload }) {
  yield put({
    type: "user/SET_STATE",
    payload: {
      recovering: false,
      recoveringSuccess: false,
      recoveringErrorMessage: null,
    }
  });
}



export function* LOGIN({ payload }) {
  yield put({
    type: "user/SET_STATE",
    payload: {
      loading: true,
      signingIn: true,
    }
  });
  if (!payload.device_type) {
    payload.device_type = "web";
  }
  const success = yield call(login, payload);
  if (success) {
    yield put({
      type: "user/SET_STATE",
      payload: {
        id: success.user.login_id,
        name: success.user.name,
        email: success.user.email,
        avatar: null,
        role: success.user.type,
        authorized: true,
        loading: false,
        signingIn: false,
        user_id: success.user.user_id,
        ages: success.user.ages,
      }
    });
    yield put({
      type: "menu/GET_DATA",
      payload: {
        user: {
          id: success.user.login_id,
          name: success.user.name,
          email: success.user.email,
          avatar: null,
          type: success.user.type,
          authorized: true,
          loading: false,
          user_id: success.user.user_id
        }
      }
    });
    if (success.user.type === "player") {
      history.push(
        `/user/my-schedule/?month=${new Date().getMonth() +
          1}&year=${new Date().getFullYear()}`
      );
    }
    else {
      history.push('/homepage');
    }
  }
  yield put({
    type: "user/SET_STATE",
    payload: {
      loading: false,
      signingIn: false,
    }
  });
}

export function* REGISTER({ payload }) {
  yield put({
    type: "user/SET_STATE",
    payload: {
      loading: true
    }
  });
  const success = yield call(signup, payload);
  if (success) {
    yield put({
      type: "user/SET_STATE",
      payload: {
        loading: false
      }
    });
    yield history.push("/user/login");
  }
  yield put({
    type: "user/SET_STATE",
    payload: {
      loading: false
    }
  });
}

export function* FORGOT_PASSWORD({ payload }) {
  yield put({
    type: "user/SET_STATE",
    payload: {
      loading: true
    }
  });
  const success = yield call(forgotPassword, payload);
  if (success) {
    yield put({
      type: "user/SET_STATE",
      payload: {
        loading: false
      }
    });
    yield history.push("/user/login");
  }
  yield put({
    type: "user/SET_STATE",
    payload: {
      loading: false
    }
  });
}

export function* RESET_PASSWORD({ payload }) {
  yield put({
    type: "user/SET_STATE",
    payload: {
      loading: true
    }
  });
  const success = yield call(resetPassword, payload);
  if (success) {
    yield put({
      type: "user/SET_STATE",
      payload: {
        loading: false
      }
    });
    yield history.push("/user/login");
  }
  yield put({
    type: "user/SET_STATE",
    payload: {
      loading: false
    }
  });
}

export function* LOAD_CURRENT_ACCOUNT() {
  yield put({
    type: "user/SET_STATE",
    payload: {
      loading: true
    }
  });
  const response = yield call(currentAccount);
  if (response.user) {
    const { user, token } = response;
    const {
      login_id: id = "",
      name = "",
      email = "",
      type = "",
      user_id,
      ages,
      vimeo,
      is_blog,
      is_editor,
    } = JSON.parse(user);
    yield put({
      type: "user/SET_STATE",
      payload: {
        id,
        name,
        email,
        is_blog,
        is_editor,
        role: type,
        authorized: true,
        loading: false,
        user_id,
        ages,
        vimeo,
      }
    });
    yield put({
      type: "menu/GET_DATA",
      payload: {
        user: JSON.parse(user),
      }
    });
    if (type === "player") {
      history.push(
        `/user/my-schedule/?month=${new Date().getMonth() +
          1}&year=${new Date().getFullYear()}`
      );
    }
  }
  yield put({
    type: "user/SET_STATE",
    payload: {
      loading: false
    }
  });
}

export function* LOGOUT() {
  yield call(logout);
  yield put({
    type: "user/SET_STATE",
    payload: {
      id: "",
      name: "",
      role: "",
      email: "",
      avatar: "",
      authorized: false,
      loading: false
    }
  });
  yield put({
    type: "trainingexercises/SET_STATE",
    payload: {
      categories: [],
      categoriesDetail: [],
      category: {
        category_id: "",
        description: "",
        name: "",
        main_image: ""
      },
      training: [],
      exercises: [],
      myExercises: [],
      loading: false
    }
  });
  yield put({
    type: "trainingbuildup/SET_STATE",
    payload: {
      trainingList: [],
      trainingDetail: [],
      categoryDetail: [],
      currentKeymoment: null,
      training: []
    }
  });
  yield put({
    type: "userInfo/SET_STATE",
    payload: {
      loading: false,
      exercises: [],
      infoSession: {},
      currentExercise: {}
    }
  });
  yield put({
    type: "SET_STATE",
    payload: {
      matchesList: [],
      matchesInfo: {
        gamePlan: "",
        goalsConceded: null,
        goalsScored: null,
        location: "",
        startDate: null,
        oppositionTeam: "",
        isHome: null
      },
      players: [],
      loading: false,
      idNewMatches: null
    }
  });
  yield put({
    type: "home/SET_STATE",
    payload: {
      blog: [],
      exercise: [],
      calendar: [],
      nextMatches: [],
      nextSessions: [],
      latestMatches: [],
      latestSessions: [],
      loading: false
    }
  });
  history.push('/user/login');
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.SIGN_IN, SIGN_IN),
    takeEvery(actions.CHANGE_PASSWORD, CHANGE_PASSWORD),
    takeEvery(actions.UPDATE_PROFILE, UPDATE_PROFILE),
    takeEvery(actions.RECOVER_ACCOUNT, RECOVER_ACCOUNT),
    takeEvery(actions.GET_AGE_GROUPS, GET_AGE_GROUPS),
    takeEvery(actions.DEFAULT_PROFILE, DEFAULT_PROFILE),
    takeEvery(actions.DEFAULT_RECOVER_ACCOUNT, DEFAULT_RECOVER_ACCOUNT),
    takeEvery(actions.LOGIN, LOGIN),
    takeEvery(actions.REGISTER, REGISTER),
    takeEvery(actions.FORGOT_PASSWORD, FORGOT_PASSWORD),
    takeEvery(actions.RESET_PASSWORD, RESET_PASSWORD),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
  ]);
}
