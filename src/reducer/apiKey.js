import {createReducer} from 'reduxsauce';
import Types from '../action/type';

const INITIAL_STATE = '';

function putApiKey(state, action) {
    return action.payload;
}

const HANDLERS = {
    [Types.YOUTUBE_PUT_API_KEY]: putApiKey,
}

export default createReducer(INITIAL_STATE, HANDLERS);
