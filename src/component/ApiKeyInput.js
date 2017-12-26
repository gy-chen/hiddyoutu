import _ from 'lodash';
import React, { Component } from 'react';
import propTypes from 'prop-types';

class ApiKeyInput extends Component {

    constructor(props) {
        super(props);

        this._input = null;
    }

    _inputRef(ref) {
        this._input = ref;
    }

    _onSubmit(event) {
        event.preventDefault();
        _.invoke(this.props, 'onSubmit', this._input.value);
    }

    render() {
        return (
            <div>
                <label>
                    Input your Youtube API key:
                    <form action="#" onSubmit={e => this._onSubmit(e)}>
                        <input type="text" ref={ref => this._inputRef(ref)} />
                    </form>
                </label>
            </div>
        );
    }
}

ApiKeyInput.propTypes = {
    onSubmit: propTypes.func
};

export default ApiKeyInput;
