import { connect } from 'react-redux';
import {
    putApiKey
} from '../action';
import ApiKeyInput from '../component/ApiKeyInput';

const mapDispatchToProps = {
    onSubmit: putApiKey
};

export default connect(null, mapDispatchToProps)(ApiKeyInput);
