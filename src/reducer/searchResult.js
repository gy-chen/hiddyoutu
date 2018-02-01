import _ from 'lodash';
import {createReducer} from 'reduxsauce';
import Types from '../action/type';

const INITIAL_STATE = [];

function putSearchResult(state, action) {
    return _.get(action.payload, 'items', []);
}

function clearSearchResult() {
    return [];
}

const HANDLERS = {
    [Types.YOUTUBE_PUT_SEARCH_RESULT]: putSearchResult,
    [Types.YOUTUBE_CLEAR_SEARCH_RESULT]: clearSearchResult
}

export default createReducer(INITIAL_STATE, HANDLERS);

