import {
    searchVideos,
    searchRelatedVideos as serviceSearchRelatedVideos
} from '../service/youtu';
import Types from './type';

export function putApiKey(apiKey) {
    return {
        type: Types.YOUTUBE_PUT_API_KEY,
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

export function searchRelatedVideos(videoId, nextPageToken = null) {
    return function (dispatch, getState) {
        const apiKey = getState().apiKey;
        dispatch(clearRelatedVideosResult());
        serviceSearchRelatedVideos(videoId, nextPageToken, apiKey)
            .then(res => res.data)
            .then(data => dispatch(putRelatedVideosResult(data)));
    };
}


export function clearSearchResult() {
    return {type: Types.YOUTUBE_CLEAR_SEARCH_RESULT};
}

export function putSearchResult(searchResult) {
    return {
        type: Types.YOUTUBE_PUT_SEARCH_RESULT,
        payload: searchResult
    };
}

export function putRelatedVideosResult(relatedVideosResult) {
    return {
        type: Types.YOUTUBE_PUT_RELATED_VIDEOS_RESULT,
        payload: relatedVideosResult
    };
}

export function clearRelatedVideosResult() {
    return {type: Types.YOUTUBE_CLEAR_RELATED_VIDEOS_RESULT};
}
