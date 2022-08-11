import { all, put, call, takeEvery } from "redux-saga/effects";
import {
  getTopMenuData,
  getLeftMenuData,
  getLeftMenuCategories,
  getLeftMenuDataUser,
  getLeftMenuDataManager,
  getLeftMenuDataPlayer,
  getScoutLeftMenuData,
} from "../../services/menu";
import actions from "./actions";
import { managerRoles, roles } from "../../constants";

export function* GET_DATA({ payload }) {

  let menuLeftDataScout = [];
  let menuLeftDataPlayer = [];
  let menuLeftDataManager = [];

  const user = payload.user || {};
  const { type } = user;
  const isScout = type === roles.SCOUT;
  const isCoach = type === roles.COACH;
  const isPlayer = type === roles.PLAYER;
  const isManager = managerRoles.includes(type);

  const menuLeftDataUser = yield call(getLeftMenuDataUser);
  // const menuLeftCategories = yield call(getLeftMenuCategories);
  // const menuTopData = yield call(getTopMenuData);
  const menuLeftData = yield call(getLeftMenuData);
  if (isManager) {
    menuLeftDataManager = yield call(getLeftMenuDataManager, {user: payload?.user});
  }
  if (isPlayer) {
    menuLeftDataPlayer = yield call(getLeftMenuDataPlayer);
  }
  if (isScout) {
    menuLeftDataScout = yield call(getScoutLeftMenuData);
  }

  yield put({
    type: "menu/SET_STATE",
    payload: {
      menuLeftDataUser,
      // menuLeftCategories,
      menuLeftData,
      // menuTopData,
      menuLeftDataManager,
      menuLeftDataPlayer,
      menuLeftDataScout,
    },
  });
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_DATA, GET_DATA),
    // run once on app load to fetch menu data
  ]);
}
