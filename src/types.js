/* @flow */

export type PhotoType = {
  id: string,
  owner: string,
  farm: string,
  server: string,
  title: string,
  secret: string
}
export type PhotosObjectType = {
  page: number,
  photo: Array<PhotoType>
}
export type ResponseType = {
  photos: Array<PhotosObjectType>
}