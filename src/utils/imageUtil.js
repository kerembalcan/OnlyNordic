/* @flow */

import type {PhotoType} from "../types";

export function getPhotoUrl(photo : PhotoType) : string {
  const {farm, server, id, secret} = photo;
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
}