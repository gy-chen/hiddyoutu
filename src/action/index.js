import Types from './type';


export function putApiKey(apiKey) {
    return {
        type: Types.YOUTUBE_PUT_API_KEY,
        payload: apiKey
    };
}

export function search(keyword, nextPageToken = null) {
    return {
        type: Types.YOUTUBE_SEARCH,
        keyword,
        nextPageToken
    };
}

export function searchRelatedVideos(videoId, nextPageToken = null) {
    return {
        type: Types.YOUTUBE_SEARCH_RELATED_VIDEOS,
        videoId,
        nextPageToken
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
