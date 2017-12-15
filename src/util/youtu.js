import _ from 'lodash';

export function extractItemVideoId(item) {
    return _.get(item, 'id.videoId');
}

export function extractItemTitle(item) {
    return _.get(item, 'snippet.title');
}

export function extractItemEtag(item) {
    return _.get(item, 'etag');
}