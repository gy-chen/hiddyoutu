import React, { Component } from 'react';
import YouTuBe from 'react-youtube';


class HiddYoutu extends Component {

  constructor(props) {
    super(props);

    this.on_ready = this.on_ready.bind(this);
  }

  on_ready(event) {
    event.target.playVideo();
  }

  render() {
    const { match } = this.props;
    const youtube_id = match.params.youtube_id;

    return (
      <div className='hiddyoutu'>
        <YouTuBe
          videoId={youtube_id}
          onReady={this.on_ready} />
      </div>
    );
  }
}

export default HiddYoutu;
