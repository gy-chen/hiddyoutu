import {
    YOUTUBE_PUT_SEARCH_RESULT,
    YOUTUBE_CLEAR_SEARCH_RESULT
} from '../action';


export default function (state = null, action) {
    switch (action.type) {
        case YOUTUBE_PUT_SEARCH_RESULT:
            return action.payload.nextPageToken;
        case YOUTUBE_CLEAR_SEARCH_RESULT:
            return null;
        default:
            return state;
    }
}