import {combineReducers} from 'redux';
import searchResult from './searchResult';
import relatedVideosResult from './relatedVideosResult';
import nextPageToken from './nextPageToken';
import apiKey from './apiKey';

const hiddyoutu = combineReducers({
    searchResult,
    relatedVideosResult,
    nextPageToken,
    apiKey
});

export default hiddyoutu;
