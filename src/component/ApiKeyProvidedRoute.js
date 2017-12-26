import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import provideApiKey from './hoc/provideApiKey';

/**
 * Ensure component of this Route will always has Api key
 *
 * - provide apiKey as prop to the component
 * - Redirect user back to root if apiKey is not presents.
 *
 * @param component
 */
export default function({component: Component, ...rest}) {

    const ResultComponent = provideApiKey(props => {
        const hasApiKey = !!props.apiKey;
        const ComponentWithApiKey = provideApiKey(Component);
        const renderComponent = hasApiKey ? <ComponentWithApiKey {...props} /> : <Redirect to={{ pathname: '/'}} />;
        return (
            <Route
                {...rest}
                render={props => renderComponent}
            />
        );
    });

    return (
        <ResultComponent />
    );
}
