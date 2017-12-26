import { YOUTUBE_PUT_API_KEY } from '../action';

export default function(state=null, action) {
    switch(action.type) {
    case YOUTUBE_PUT_API_KEY:
        return action.payload;
    default:
        return state;
    }
}
