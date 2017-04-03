import React, { Component } from 'react';


class HiddYoutu extends Component {

  render() {
    const { match } = this.props;

    return (
      <div>
        Hello {match.params.youtube_id}
      </div>
    );
  }
}

export default HiddYoutu;
