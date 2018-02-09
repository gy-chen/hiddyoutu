import {
    createStore,
    applyMiddleware
} from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import youtubeEpic from './epic/youtube';
import reducer from './reducer';

const epicMiddleware = createEpicMiddleware(youtubeEpic);

export default createStore(
    reducer,
    applyMiddleware(epicMiddleware),
);
