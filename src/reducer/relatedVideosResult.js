import _ from 'lodash';
import {
    YOUTUBE_PUT_RELATED_VIDEOS_RESULT,
    YOUTUBE_CLEAR_RELATED_VIDEOS_RESULT
} from '../action';

export default function (state = [], action) {
    switch (action.type) {
    case YOUTUBE_PUT_RELATED_VIDEOS_RESULT:
        return _.get(action.payload, 'items', []);
    case YOUTUBE_CLEAR_RELATED_VIDEOS_RESULT:
        return [];
    default:
        return state;
    }
}