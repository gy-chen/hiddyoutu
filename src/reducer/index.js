import {combineReducers} from 'redux';
import searchResult from './searchResult';
import nextPageToken from './nextPageToken';
import apiKey from './apiKey';

const hiddyoutu = combineReducers({
    searchResult,
    nextPageToken,
    apiKey
});

export default hiddyoutu;
