import _ from 'lodash';
import {createReducer} from 'reduxsauce';
import Types from '../action/type';

const INITIAL_STATE = [];

function putRelatedVideosResult(state = INITIAL_STATE, action) {
    return _.get(action.payload, 'items', []);
}

function clearRelatedVideosResult() {
    return [];
}

const HANDLERS = {
    [Types.YOUTUBE_PUT_RELATED_VIDEOS_RESULT]: putRelatedVideosResult,
    [Types.YOUTUBE_CLEAR_RELATED_VIDEOS_RESULT]: clearRelatedVideosResult
};

export default createReducer(INITIAL_STATE, HANDLERS);
