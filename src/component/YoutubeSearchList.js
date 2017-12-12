import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * YoutuSearchList
 * 
 * Provides:
 *   - Display passed children
 *   - Provide callback when user click an item
 */
class YoutubeSearchList extends Component {

    _onItemClick(event, item) {
        _.invoke(this.props, 'onItemClick', item);
    }

    _renderItem(item) {
        return (
            <li onClick={e => this._onItemClick(e, item)} key={item.etag}>{item.snippet.title}</li>
        );
    }

    render() {
        return (
            <ol>
                {this.props.items.map(item => this._renderItem(item))}
            </ol>
        );
    }
}

YoutubeSearchList.propTypes = {
    onItemClick: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({
        etag: PropTypes.string.isRequired,
        id: PropTypes.shape({
            videoId: PropTypes.string.isRequired
        }).isRequired,
        snippet: PropTypes.shape({
            title: PropTypes.string.isRequired,
        }).isRequired
    }))
}

YoutubeSearchList.defaultProps = {
    items: []
}

export default YoutubeSearchList;