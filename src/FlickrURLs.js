const API_KEY = 'a5e95177da353f58113fd60296e1d250';
const NASA_USER_ID = '24662369@N07';
const PHOTOS_ONLY = 1;
const SAFE_SEARCH_ACTIVATED = 1;
const NB_MAX_SEARCH_RESULTS = 100;

export const NB_MAX_PHOTOS_PER_PAGE = 20;

export function getSearchUrl(search, month, year) {
    return `https://api.flickr.com/services/rest/?method=flickr.photos.search&
    api_key=${API_KEY}&
    user_id=${NASA_USER_ID}&
    content_type=${PHOTOS_ONLY}&
    per_page=${NB_MAX_SEARCH_RESULTS}&
    format=json&
    nojsoncallback=1&
    sort=relevance&
    safe_search=${SAFE_SEARCH_ACTIVATED}&
    text=${search}&
    min_taken_date=${month.getMinDateAsSeconds(year)}&
    max_taken_date=${month.getMaxDateAsSeconds(year)}`;
};

export function getPhotoInfoUrl(photoId) {
    return `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&format=json&nojsoncallback=1&api_key=${API_KEY}&photo_id=${photoId}`;
};

export function getPhotoSnapshotUrl({farm, server, id, secret}) {
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
};
