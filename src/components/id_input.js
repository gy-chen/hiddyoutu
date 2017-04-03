import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class IDInput extends Component {

  constructor(props) {
    super(props);

    this.handle_id_input_change = this.handle_id_input_change.bind(this);
    this.handle_submit = this.handle_submit.bind(this);
    this.state = {
      youtube_id: ''
    };
  }

  handle_id_input_change(event) {
    this.setState({ youtube_id: event.target.value});
  }

  handle_submit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handle_submit}>
          <input
            type='text'
            placeholder='place youtube ID here'
            required
            onChange={this.handle_id_input_change}
            value={this.state.youtube_id} />
          <Link to={`/y/${this.state.youtube_id}`}>Go</Link>
        </form>
      </div>
    );
  }
}

export default IDInput;
