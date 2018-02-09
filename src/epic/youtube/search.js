import 'rxjs';
import Rx from 'rxjs/Rx';
import Types from '../../action/type';
import { searchVideos } from '../../service/youtu';
import { putSearchResult, clearSearchResult } from '../../action';


export default function (action$, store) {
    return action$
        .ofType(Types.YOUTUBE_SEARCH)
        .switchMap(action =>
            Rx.Observable.create(obs => {
                obs.next(clearSearchResult());
                const apiKey = store.getState().apiKey;
                searchVideos(action.keyword, action.nextPageToken, apiKey)
                    .then(res => res.data)
                    .then(data => {
                        obs.next(putSearchResult(data));
                        obs.complete();
                    });
            })
        );
}

