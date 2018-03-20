/* @flow */

export function getSearchRoute(tag : string) {
  return `/rest/?method=flickr.photos.search&api_key=950b8f7a8a5273343a8bea154ca10050&tags=${tag}&format=json&nojsoncallback=?`
}