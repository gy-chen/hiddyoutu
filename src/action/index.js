import { searchVideos } from '../service/youtu';

export const YOUTUBE_CLEAR_SEARCH_RESULT = 'YOUTUBE_CLEAR_SEARCH_RESULT';
export const YOUTUBE_PUT_SEARCH_RESULT = 'YOUTUBE_PUT_SEARCH_RESULT';
export const YOUTUBE_PUT_API_KEY = 'YOUTUBE_PUT_API_KEY';

export function putApiKey(apiKey) {
    return {
        type: YOUTUBE_PUT_API_KEY,
        payload: apiKey
    };
}

export function search(keyword, nextPageToken = null) {
    return function (dispatch, getState) {
        const apiKey = getState().apiKey;
        dispatch(clearSearchResult());
        searchVideos(keyword, nextPageToken, apiKey)
            .then(res => res.data)
            .then(data => dispatch(putSearchResult(data)));
    };
}

export function clearSearchResult() {
    return { type: YOUTUBE_CLEAR_SEARCH_RESULT };
}

export function putSearchResult(searchResult) {
    return {
        type: YOUTUBE_PUT_SEARCH_RESULT,
        payload: searchResult
    };
}
