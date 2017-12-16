import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {extractItemEtag, extractItemTitle, searchResultItemPropTypes} from "../util/youtu";

/**
 * YoutuSearchList
 *
 * Provides:
 *   - Display passed items
 *   - Provide callback when user click an item
 */
class YoutubeSearchList extends Component {

    _onItemClick(item) {
        _.invoke(this.props, 'onItemClick', item);
    }

    _renderItem(item) {
        return (
            <li
                onClick={() => this._onItemClick(item)}
                key={extractItemEtag(item)}>
                {extractItemTitle(item)}
            </li>
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
    items: PropTypes.arrayOf(searchResultItemPropTypes)
};

YoutubeSearchList.defaultProps = {
    items: []
};

export default YoutubeSearchList;