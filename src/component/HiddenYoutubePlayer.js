/**
 * HiddenYoutubePlayer
 *
 * Provide abilities to play youtube video via vidoe Id
 *
 * TODOs:
 *   - load Youtube API.
 *   - play Youtube video when video id prop changed.
 *   - provide player functions, to let other can manipulate it.
 *      - play
 *      - pause
 *   - provide settings:
 *      - autoplay: autoplay video when video Id changed or the player initlalized.
 *   - callbacks:
 *      - onVideoEnded
 *      - onVideoPlaying
 *      - onVideoPaused
 */
import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import load from 'load-script';
import './HiddenYoutubePlayer.css';

const YOUTUBE_API_URL = "https://www.youtube.com/iframe_api";
const YOUTUBE_API_NAME = "YT";
let YT = null;


class HiddenYoutubePlayer extends Component {

    constructor(props) {
        super(props);

        this._player = null;
        this._playerContainer = null;
    }

    play() {
        if (this._player) {
            this._player.playVideo();
        }
    }

    pause() {
        if (this._player) {
            this._player.pauseVideo();
        }
    }

    componentDidMount() {
        if (YT) {
            this._initialize();
        } else {
            load(YOUTUBE_API_URL, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                YT = window[YOUTUBE_API_NAME];
                this._initialize();
            });
        }
    }

    componentDidUpdate(prevProps) {
        const {videoId} = this.props;
        const {videoId: prevVideoId} = prevProps;
        if (videoId !== prevVideoId) {
            this._autoPlay();
        }
    }

    _initialize() {
        YT = window[YOUTUBE_API_NAME];
        YT.ready(() => {
            this._player = new YT.Player(this._playerContainer, {
                events: {
                    'onReady': () => this._autoPlay(),
                    'onStateChange': (state) => this._onPlayerStateChanged(state)
                }
            });
            this._autoPlay();
        });
    }

    _autoPlay() {
        if (!this._player) {
            return;
        }
        const {videoId, autoPlay} = this.props;
        if (videoId) {
            this._player.loadVideoById(videoId);
        }
        if (!videoId || !autoPlay) {
            this.pause();
        }

    }

    _refPlayerContainer(ref) {
        this._playerContainer = ref;
    }

    _onPlayerStateChanged(state) {
        switch (state) {
            case 0:
                _.invoke(this.props, 'onVideoEnded');
                break;
            case 1:
                _.invoke(this.props, 'onVideoPlaying');
                break;
            case 2:
                _.invoke(this.props, 'onVideoPaused');
                break;
        }
    }

    render() {
        return (
            <div className="HiddenYoutubePlayer">
                <div ref={ref => this._refPlayerContainer(ref)}></div>
            </div>
        );
    }
}

HiddenYoutubePlayer.defaultProps = {
    autoPlay: true
}

HiddenYoutubePlayer.propTypes = {
    videoId: PropTypes.string,
    autoPlay: PropTypes.bool.isRequired,
    onVideoEnded: PropTypes.func,
    onVideoPlaying: PropTypes.func,
    onVideoPaused: PropTypes.func
}

export default HiddenYoutubePlayer;
