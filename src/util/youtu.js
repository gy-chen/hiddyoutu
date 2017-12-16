import _ from 'lodash';
import PropTypes from 'prop-types';

export const searchResultItemPropTypes = PropTypes.shape({
    etag: PropTypes.string.isRequired,
    id: PropTypes.shape({
        videoId: PropTypes.string.isRequired
    }).isRequired,
    snippet: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }).isRequired
})

// for search result sample, see: https://gist.github.com/gy-chen/de02bde82777b0618c825f1bd799f94c
export const searchResultPropTypes = PropTypes.shape({
    etag: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(searchResultItemPropTypes),
    nextPageToken: PropTypes.string
})

export function extractItemVideoId(item) {
    return _.get(item, 'id.videoId');
}

export function extractItemTitle(item) {
    return _.get(item, 'snippet.title');
}

export function extractItemEtag(item) {
    return _.get(item, 'etag');
}