import { all } from "redux-saga/effects";
import user from "./user/sagas";
import players from "./players/sagas";
import menu from "./menu/sagas";
import settings from "./settings/sagas";
import blogs from "./blog/sagas";
import home from "./home/sagas";
import session from "./session/sagas";
import matchSaga from "./match/sagas";
import trainingexercises from "./trainingexercises/sagas";
import trainingbuildup from "./trainingbuildup/sagas";
import userInfoReducer from "./userInfo/sagas";
import matchesSaga from "./matches/sagas";
import instructionsSaga from "./manager-instructions/sagas";
import coachesSaga from "./coaches/sagas";
import statusesSaga from "./statuses/sagas";
import clubSagas from './club/sagas';
import teamTrendsSagas from './teamtrends/sagas';
import videoAnalysisSaga from "./videoanalysis/sagas";
import scoutSaga from "./scout/sagas";
import managerSettingsSaga from "./managersettings/sagas";
import scoutMatchAnalysisSaga from "./scoutmatchanalysis/sagas";
import trainingDrillsTrendsSagas from './trainingdrillstrends/sagas';
import trainingsAndExercisesSagas from './trainingsandexercises/sagas';

export default function* rootSaga() {
  yield all([
    user(),
    players(),
    menu(),
    settings(),
    blogs(),
    home(),
    matchSaga(),
    trainingexercises(),
    trainingbuildup(),
    session(),
    matchesSaga(),
    teamTrendsSagas(),
    instructionsSaga(),
    userInfoReducer(),
    coachesSaga(),
    statusesSaga(),
    clubSagas(),
    videoAnalysisSaga(),
    scoutSaga(),
    managerSettingsSaga(),
    scoutMatchAnalysisSaga(),
    trainingDrillsTrendsSagas(),
    trainingsAndExercisesSagas(),
  ]);
}
