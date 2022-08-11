import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import players from './players/reducers'
import user from './user/reducers';
import menu from './menu/reducers';
import settings from './settings/reducers';
import blogs from './blog/reducers';
import home from './home/reducers';
import session from './session/reducers';
import trainingexercises from './trainingexercises/reducers';
import trainingbuildup from './trainingbuildup/reducers';
import matchesReducer from './matches/reducers';
import match from './match/reducers';
import InstructionsReducer from './manager-instructions/reducers';
import userInfoReducer from './userInfo/reducers';
import statuses from './statuses/reducers';
import coaches from './coaches/reducers';
import club from './club/reducers';
import scout from './scout/reducers';
import teamtrends from './teamtrends/reducers';
import videoAnalysis from './videoanalysis/reducers';
import managerSettings from './managersettings/reducers';
import scoutMatchAnalysis from './scoutmatchanalysis/reducers';
import trainingDrillsTrends from './trainingdrillstrends/reducers';
import trainingsAndExercises from './trainingsandexercises/reducers';
import drawerReducers from '../components/tacticsboard/reducers';

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    players,
    menu,
    settings,
    blogs,
    home,
    club,
    scout,
    session,
    statuses,
    teamtrends,
    managerSettings,
    trainingexercises,
    trainingbuildup,
    matchesReducer,
    InstructionsReducer,
    userInfoReducer,
    coaches,
    match,
    videoAnalysis,
    scoutMatchAnalysis,
    trainingDrillsTrends,
    trainingsAndExercises,
    ...drawerReducers,
  });
