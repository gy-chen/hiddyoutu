import React from 'react';
import { withRouter } from 'react-router';

/**
 * Provide query string as props.
 *
 * Component use this HOC can access query string from prop named qs.
 *
 * @param Component
 */
export default Component => {

    const buildQueryString = search => {
        const query = new URLSearchParams(search);
        const result = {};
        for (let [key, value] of query.entries()) {
            result[key] = value;
        }
        return result;
    };

    const ProvideQueryStringFromRoute = (props) => {

        const search = props.location.search;
        const qs = buildQueryString(search);

        return (<Component {...props} qs={qs} />);
    };

    return withRouter(ProvideQueryStringFromRoute);
};
