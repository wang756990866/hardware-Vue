/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  return true
}

export function isExternal(path) {
  // alert(/^(https?:|mailto:|tel:)/.test(path))
  return /^(https?:|mailto:|tel:)/.test(path)
}
