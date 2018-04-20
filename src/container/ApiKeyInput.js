import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    putApiKey
} from '../action';
import ApiKeyInput from '../component/ApiKeyInput';
import provideQueryStringFromRouter from '../component/hoc/provideQueryStringFromRoute';

/**
 * HOC that redirect user to player after the api key is inputted.
 *
 * The container will auto input apiKey if apiKey is provided by query string with key apiKey.
 */
function apiKeyInputContainer(Component) {

    const QS_KEY_APIKEY = 'apiKey';
    const LOCATION_AFTER_APIKEY_INPUTTED = '/player';

    class ApiInputContainer extends React.Component {

        constructor(props) {
            super(props);

            this._onSubmit = this._onSubmit.bind(this);
        }

        componentDidMount() {
            const { qs } = this.props;
            if (qs[QS_KEY_APIKEY]) {
                this._onSubmit(qs[QS_KEY_APIKEY]);
            }
        }

        _onSubmit(apiKey) {
            const { putApiKey, history } = this.props;
            putApiKey(apiKey);
            history.push(LOCATION_AFTER_APIKEY_INPUTTED);
        }

        render() {
            return (
                <Component
                    {...this.props}
                    onSubmit={this._onSubmit}
                />
            );
        }
    }

    ApiInputContainer.propTypes = {
        putApiKey: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        qs: PropTypes.object.isRequired
    };


    return ApiInputContainer;
}

const mapDispatchToProps = {
    putApiKey
};

export default _.flowRight(
    connect(null, mapDispatchToProps),
    provideQueryStringFromRouter,
    apiKeyInputContainer
)(ApiKeyInput);
