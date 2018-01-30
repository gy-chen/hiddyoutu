import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    search,
    searchRelatedVideos,
} from './action';
import YoutubeSearchList from './component/YoutubeSearchList';
import SearchInput from './component/SearchInput';
import HiddenYoutubePlayer from './component/HiddenYoutubePlayer';
import { extractItemVideoId } from './util/youtu';

/**
 * Composite components and provides logic to make this app works
 *
 * TODO:
 *   - Add undo to make user can navigate back to previous page of search result
 */
class YoutubeApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videoId: null,
            keyword: null,
            isPlaying: false,
        };
        this._player = null;
    }

    _onSearchInputSubmit(keyword) {
        this.props.search(keyword);
        this._setCurrentKeyword(keyword);
    }

    _onItemClick(item) {
        const videoId = extractItemVideoId(item);
        this._setCurrentVideo(videoId);
    }


    _onVideoEnded() {
        this.setState({
            isPlaying: false,
        }, () => {
            const {relatedVideosResult} = this.props;
            this._playRandomItems(relatedVideosResult);
        });
    }

    _onVideoPaused() {
        this.setState({
            isPlaying: false,
        });
    }

    _onVideoPlaying() {
        this.setState({
            isPlaying: true,
        });
    }

    _playRandomItems(items) {
        const item = _.sample(items);
        const videoId = extractItemVideoId(item);
        this._setCurrentVideo(videoId);
    }

    _setCurrentVideo(videoId) {
        this.setState({
            videoId,
        }, () => {
            const {searchRelatedVideos} = this.props;
            searchRelatedVideos(this.state.videoId, null, this.state.apiKey);
        });
    }

    _setCurrentKeyword(keyword) {
        this.setState({
            keyword,
        });
    }

    _onMoreButtonClick() {
        const {search, nextPageToken} = this.props;
        if (!nextPageToken) {
            return;
        }
        search(this.state.keyword, nextPageToken);
    }

    _renderNextPageButton() {
        const {keyword} = this.state;
        const {nextPageToken} = this.props;
        if (!keyword || !nextPageToken) {
            return;
        }
        return (
            <button type="button" onClick={() => this._onMoreButtonClick()}>More</button>
        );
    }

    _renderPlayButton() {
        if (this.state.isPlaying) {
            return (<button type="button" onClick={() => this._onPauseButtonClick()}>Pause</button>);
        } else {
            return (<button type="button" onClick={() => this._onPlayButtonClick()}>Play</button>);
        }
    }

    _onPlayButtonClick() {
        if (!this._player) {
            return;
        }
        this._player.play();
    }

    _onPauseButtonClick() {
        if (!this._player) {
            return;
        }
        this._player.pause();
    }

    _playerRef(ref) {
        this._player = ref;
    }

    render() {
        return (
            <div>
                <SearchInput
                    onSubmit={(keyword) => this._onSearchInputSubmit(keyword)}/>
                <YoutubeSearchList
                    items={this.props.searchResult}
                    onItemClick={(item) => this._onItemClick(item)}/>
                <hr/>
                <YoutubeSearchList
                    items={this.props.relatedVideosResult}
                    onItemClick={(item) => this._onItemClick(item)}/>
                <HiddenYoutubePlayer
                    ref={(player) => this._playerRef(player)}
                    videoId={this.state.videoId}
                    onVideoEnded={() => this._onVideoEnded()}
                    onVideoPlaying={() => this._onVideoPlaying()}
                    onVideoPaused={() => this._onVideoPaused()}/>
                {this._renderNextPageButton()}
                <div>
                    {this._renderPlayButton()}
                </div>
            </div>
        );
    }
}

YoutubeApp.propTypes = {
    search: PropTypes.func.isRequired,
    searchRelatedVideos: PropTypes.func.isRequired,
    relatedVideosResult: PropTypes.array.isRequired,
    searchResult: PropTypes.array.isRequired,
    nextPageToken: PropTypes.string,
};

const mapStateToProps = (state) => ({
    searchResult: state.searchResult,
    relatedVideosResult: state.relatedVideosResult,
    nextPageToken: state.nextPageToken,
});

const mapDispatchToProps = {
    search,
    searchRelatedVideos,
};

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeApp);