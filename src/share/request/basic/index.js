export * from "./request"
export * from "./proxyRequest"

export const buildImageURL = url => import.meta.env.$BASIC_IMAGE_URL + url
