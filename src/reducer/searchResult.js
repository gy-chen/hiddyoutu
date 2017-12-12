import {
    YOUTUBE_PUT_SEARCH_RESULT,
    YOUTUBE_CLEAR_SEARCH_RESULT
} from '../action';

function searchResult(state = [], action) {
    switch (action.type) {
        case YOUTUBE_PUT_SEARCH_RESULT:
            return action.payload;
        case YOUTUBE_CLEAR_SEARCH_RESULT:
            return [];
        default:
            return state;
    }
}

export default searchResult;