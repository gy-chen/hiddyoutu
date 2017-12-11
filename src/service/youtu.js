/** Youtube service
 *
 * Provides search functions.
 *
 * This module use custom server's APIs to search Youtube videos for simplicity. See: https://github.com/gy-chen/hiddenyoutu-server
 * It's not difficult to access Youtube APIs directly. Rewrite this module if want to.
 *
 */
import axios from 'axios';

// TODO maybe use enviroment variable to let user custom this variable without touch the codes.
const API_BASE_URL = "http://127.0.0.1:5000";


export function searchVideos(q, pageToken = null, apiKey = null) {
    const API_URL = `${API_BASE_URL}/list/${q}`;
    const params = {
        pageToken,
        apiKey
    };
    return axios.get(API_URL, {params});
}

export function searchRelatedVideos(videoId, pageToken = null, apiKey = null) {
    const API_URL = `${API_BASE_URL}/list/related_videos/${videoId}`;
    const params = {
        pageToken,
        apiKey
    };
    return axios.get(API_URL, {params});
}