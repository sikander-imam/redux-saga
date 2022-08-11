import { all, takeEvery, put, call } from "redux-saga/effects";
import * as services from "../../services/trainingexercises";
import actions from "./actions";
import { history } from "index";
import { push } from "connected-react-router";
export function* LIST({ payload }) {
  yield put({
    type: "trainingexercises/SET_STATE",
    payload: {
      loading: true,
    },
  });
  const success = yield call(services.getTrainingList, payload);

  if (success) {
    yield put({
      type: "trainingexercises/SET_STATE",
      payload: { training: success.data },
    });
  }
  yield put({
    type: "trainingexercises/SET_STATE",
    payload: {
      loading: false,
    },
  });
}

export function* CATEGORIES({ payload }) {
  yield put({
    type: "trainingexercises/SET_STATE",
    payload: {
      loading: true,
    },
  });
  const success = yield call(services.getCategories, payload);
  if (success) {
    yield put({
      type: "trainingexercises/SET_STATE",
      payload: { categories: success, loading: false },
    });
  }
  yield put({
    type: "trainingexercises/SET_STATE",
    payload: {
      loading: false,
    },
  });
}

export function* GET_MY_CATEGORIES() {
  yield put({
    type: "trainingexercises/SET_STATE",
    payload: {
      loading: true,
    },
  });
  const success = yield call(services.getMyCategories);
  if (success) {
    yield put({
      type: "trainingexercises/SET_STATE",
      payload: { categories: success, loading: false },
    });
  }
  yield put({
    type: "trainingexercises/SET_STATE",
    payload: {
      loading: false,
    },
  });
}

export function* GET_MY_CATEGORY({ payload }) {
  yield put({
    type: "trainingexercises/SET_STATE",
    payload: {
      loading: true,
    },
  });
  const success = yield call(services.getMyCategories);
  if (success) {
    const exercises = yield call(services.getTraining, payload);
    if (exercises) {
      let currentCategory = success.find((cat) => cat.category_id === payload);
      yield put({
        type: "trainingexercises/SET_STATE",
        payload: { category: currentCategory, exercises, loading: false },
      });
    }
  }
  yield put({
    type: "trainingexercises/SET_STATE",
    payload: {
      loading: false,
    },
  });
}

export function* GET_CATEGORY({ payload }) {
  yield put({
    type: "trainingexercises/SET_STATE",
    payload: {
      loading: true,
    },
  });
  const success = yield call(services.getCategories);
  let currentCategory = success.find((cat) => cat.category_id === payload);
  // console.log(currentCategory);
  if (success) {
    yield put({
      type: "trainingexercises/SET_STATE",
      payload: {
        loading: false,
        category: currentCategory
      },
    });
  } else {
    yield put({
      type: "trainingexercises/SET_STATE",
      payload: {
        loading: false,
      },
    });
  }
}

export function* GET_PHILOSOPHY({ payload }) {
  yield put({
    type: "trainingexercises/SET_STATE",
    payload: {
      loading: true,
    },
  });
  const philosophy = yield call(services.getWOF, payload);
  if (philosophy) {
    yield put({
      type: "trainingexercises/SET_STATE",
      payload: {
        loading: false,
        philosophy: philosophy
      },
    });
  } else {
    yield put({
      type: "trainingexercises/SET_STATE",
      payload: {
        loading: false,
      },
    });
  }
}

export function* CREATE_MY_CATEGORY({ payload }) {
  yield put({
    type: "trainingexercises/SET_STATE",
    payload: {
      loading: true,
    },
  });

  const success = yield call(services.createCategories, payload);
  if (success) {
    const res = yield call(services.getMyCategories);
    yield put({
      type: "trainingexercises/SET_STATE",
      payload: { categories: res, loading: false },
    });
  } else {
    yield put({
      type: "trainingexercises/SET_STATE",
      payload: {
        loading: false,
      },
    });
  }
}

export function* CATEGORIES_DETAIL({ payload }) {
  yield put({
    type: "trainingexercises/SET_STATE",
    payload: {
      loading: true,
    },
  });
  const success = yield call(services.getCategoriesDetail, payload);

  if (success) {
    yield put({
      type: "trainingexercises/SET_STATE",
      payload: { categoriesDetail: success, loading: false },
    });
  } else {
    yield put({
      type: "trainingexercises/SET_STATE",
      payload: {
        loading: false,
      },
    });
  }
}

export function* REMOVE_CATEGORY({ payload }) {
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true,
    },
  });

  const result = yield call(services.removeCategory, payload);
  if (result) {
    yield put({
      type: actions.REMOVE_CATEGORY_SUCCESS,
      payload,
    });
  }
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: false,
    },
  });
}

export function* REMOVE_EXERCISE({ payload }) {
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: true,
    },
  });
  const result = yield call(services.removeExercise, payload.id);
  yield put({
    type: "session/SET_STATE",
    payload: {
      loading: false,
    },
  });
  if (result) {
    history.go(0);
  }
}

export function* EDIT_MY_CATEGORY({ payload: { data, resolve, reject } }) {
  yield put({
    type: "trainingexercises/SET_STATE",
    payload: {
      loading: true,
    },
  });
  const success = yield call(services.createCategories, data);
  if (success) {
    const id = data.get("category_id");
    const res = yield call(services.getMyCategories);
    let currentCategory = res.find((cat) => cat.category_id === id);
    yield put({
      type: "trainingexercises/SET_STATE",

      payload: { category: currentCategory, loading: false },
    });
    resolve(success);
  } else {
    yield put({
      type: "trainingexercises/SET_STATE",
      payload: {
        loading: false,
      },
    });
    reject("Could not find categories.");
  }
}

export function* CREATE_EXERCISE({ payload }) {
  yield put({
    type: "trainingexercises/SET_STATE",
    payload: {
      loading: true,
    },
  });
  const success = yield call(services.createExercise, payload);
  if (success) {
    const exercises = yield call(
      services.getTraining,
      payload.get("category_id")
    );
    yield put({
      type: "trainingexercises/SET_STATE",
      payload: { exercises },
    });
    // history.push("/training-drills/my");
    yield put(push(`/training-drills/my/${payload.get("category_id")}`));
  } else {
    yield put({
      type: "trainingexercises/SET_STATE",
      payload: {
        loading: false,
      },
    });
  }
}

export function* LIST_MY_TRAINING() {
  yield put({
    type: "trainingexercises/SET_STATE",
    payload: {
      loading: true,
    },
  });
  const success = yield call(services.getMyExercises);
  if (success) {
    yield put({
      type: "trainingexercises/SET_STATE",
      payload: { myExercises: success.exercises },
    });
  }
  yield put({
    type: "trainingexercises/SET_STATE",
    payload: {
      loading: false,
    },
  });
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.TRAININGEXERCISES_LIST, LIST),
    takeEvery(actions.TRAININGEXERCISES_CATEGORIES, CATEGORIES),
    takeEvery(actions.TRAININGEXERCISES_CATEGORIES_DETAIL, CATEGORIES_DETAIL),
    takeEvery(actions.REMOVE_CATEGORY, REMOVE_CATEGORY),
    takeEvery(actions.TRAININGEXERCISES_CATEGORIE, GET_CATEGORY),
    takeEvery(actions.TRAININGEXERCISES_MY_CATEGORIE, GET_MY_CATEGORIES),
    takeEvery(actions.TRAININGEXERCISES_MY_CATEGORI, GET_MY_CATEGORY),
    takeEvery(actions.TRAININGEXERCISES_CREATE_CATEGORY, CREATE_MY_CATEGORY),
    takeEvery(actions.TRAININGEXERCISES_EDIT_CATEGORY, EDIT_MY_CATEGORY),
    takeEvery(actions.TRAININGEXERCISES_CREATE_EXERCISE, CREATE_EXERCISE),
    takeEvery(actions.REMOVE_EXERCISE, REMOVE_EXERCISE),
    takeEvery(actions.LIST_MY_TRAINING, LIST_MY_TRAINING),
    takeEvery(actions.TRAININGEXERCISES_PHILOSOPHY, GET_PHILOSOPHY),
  ]);
}
