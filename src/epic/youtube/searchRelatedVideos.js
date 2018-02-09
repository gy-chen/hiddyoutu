import 'rxjs';
import Rx from 'rxjs/Rx';
import Types from '../../action/type';
import { searchRelatedVideos } from '../../service/youtu';
import { putRelatedVideosResult, clearRelatedVideosResult } from '../../action';


export default function (action$, store) {
    return action$
        .ofType(Types.YOUTUBE_SEARCH_RELATED_VIDEOS)
        .delay(3000) // do not trigger search immediately after user select the video to play.
        .switchMap(action =>
            Rx.Observable.create(obs => {
                obs.next(clearRelatedVideosResult());
                const apiKey = store.getState().apiKey;
                searchRelatedVideos(action.videoId, action.nextPageToken, apiKey)
                    .then(res => res.data)
                    .then(data => {
                        obs.next(putRelatedVideosResult(data));
                        obs.complete();
                    });
            })
        );
}

