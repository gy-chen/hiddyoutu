import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * SearchInput
 * 
 * Provides:
 *   - Input for user to enter keyword
 *   - Submit button for user to click
 */
class SearchInput extends Component {

    _inputRef(ref) {
        this._input = ref;
    }

    _onSubmit(event) {
        event.preventDefault();
        _.invoke(this.props, 'onSubmit', this._input.value);
        this._input.value = '';
    }

    render() {
        return (
            <form onSubmit={event => this._onSubmit(event)}>
                <input ref={ref => this._inputRef(ref)} />
                <button type="submit">Search</button>
            </form>
        );
    }
}

SearchInput.propTypes = {
    onSubmit: PropTypes.func
};

export default SearchInput;