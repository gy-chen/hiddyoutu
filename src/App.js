import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {search} from "./action";
import YoutubeSearchList from './component/YoutubeSearchList';
import SearchInput from './component/SearchInput';
import HiddenYoutubePlayer from './component/HiddenYoutubePlayer';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videoId: null
        };
    }

    _onSearchInputSubmit(keyword) {
        this.props.search(keyword);
    }

    _onItemClick(item) {
        const videoId = _.get(item, 'id.videoId');
        this.setState({
            videoId
        });
    }

    render() {
        return (
            <div>
                <SearchInput
                    onSubmit={keyword => this._onSearchInputSubmit(keyword)}/>
                <YoutubeSearchList
                    items={this.props.searchResult}
                    onItemClick={item => this._onItemClick(item)}/>
                <HiddenYoutubePlayer
                    videoId={this.state.videoId}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    searchResult: state.searchResult
});

const mapDispatchToProps = {
    search
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
