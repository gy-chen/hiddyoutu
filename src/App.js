import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { search } from "./action";
import YoutubeSearchList from './component/YoutubeSearchList';
import SearchInput from './component/SearchInput';
import HiddenYoutubePlayer from './component/HiddenYoutubePlayer';
import { searchRelatedVideos } from './service/youtu';
import { extractItemVideoId } from "./util/youtu";

/**
 * Composite components and provides logic to make this app works
 *
 * TODO:
 *   - Add Controls: let music can be paused and played again
 *   - Let user can enter their API key to operate Youtube API
 *   - Add undo to make user can navigate back to previous page of search result
 */
class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videoId: null,
            keyword: null
        };
    }

    _onSearchInputSubmit(keyword) {
        this.props.search(keyword);
        this._setCurrentKeyword(keyword);
    }

    _onItemClick(item) {
        const videoId = extractItemVideoId(item);
        this._setCurrentVideo(videoId);
    }


    _onPlayEnded() {
        searchRelatedVideos(this.state.videoId)
            .then(res => res.data)
            .then(data => {
                this._playRandomItems(data.items);
            });

    }

    _playRandomItems(items) {
        const item = _.sample(items);
        const videoId = extractItemVideoId(item);
        this._setCurrentVideo(videoId);
    }

    _setCurrentVideo(videoId) {
        this.setState({
            videoId
        });
    }

    _setCurrentKeyword(keyword) {
        this.setState({
            keyword
        });
    }

    _onMoreButtonClick() {
        const { search, nextPageToken } = this.props;
        if (!nextPageToken) {
            return;
        }
        search(this.state.keyword, nextPageToken);
    }

    _renderNextPageButton() {
        const { keyword } = this.state;
        if (!keyword) {
            return;
        }
        return (
            <button type="button" onClick={() => this._onMoreButtonClick()}>More</button>
        );
    }

    render() {
        return (
            <div>
                <SearchInput
                    onSubmit={keyword => this._onSearchInputSubmit(keyword)} />
                <YoutubeSearchList
                    items={this.props.searchResult}
                    onItemClick={item => this._onItemClick(item)} />
                <HiddenYoutubePlayer
                    videoId={this.state.videoId}
                    onVideoEnded={() => this._onPlayEnded()} />
                {this._renderNextPageButton()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    searchResult: state.searchResult,
    nextPageToken: state.nextPageToken
});

const mapDispatchToProps = {
    search
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
