import {combineReducers} from 'redux'
import searchResult from './searchResult';
import nextPageToken from './nextPageToken';

const hiddyoutu = combineReducers({
    searchResult,
    nextPageToken
});

export default hiddyoutu;