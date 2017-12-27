import React from 'react';
import { connect } from 'react-redux';
import {
    putApiKey
} from '../action';
import ApiKeyInput from '../component/ApiKeyInput';

/**
 * HOC that redirect user to player after the api key is inputed.
 *
 */
function apiInputContainer(Component) {

    return props => {
        function onSubmit(apiKey) {
            const { putApiKey, history } = props;
            putApiKey(apiKey);
            history.push('/player');
        }

        return (
            <Component
                {...props}
                onSubmit={apiKey => onSubmit(apiKey)}
            />
        );
    };
}

const mapDispatchToProps = {
    putApiKey
};

export default connect(null, mapDispatchToProps)(apiInputContainer(ApiKeyInput));
