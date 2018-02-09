import { combineEpics } from 'redux-observable';
import search from './search';
import searchRelatedVideos from './searchRelatedVideos';

export default combineEpics(
    search,
    searchRelatedVideos
);
