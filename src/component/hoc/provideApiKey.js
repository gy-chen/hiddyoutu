import { connect } from 'react-redux';

export default function(Component) {

    const mapStateToProps = state => ({
        apiKey: state.apiKey
    });

    return connect(mapStateToProps)(Component);
}
