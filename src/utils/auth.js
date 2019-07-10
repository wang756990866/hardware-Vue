import Cookies from 'vue-cookies'

const TokenKey = 'syy_template_token'
const RootList = 'syy_template_rootList'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRootList() {
  return Cookies.get(RootList)
}

export function setRootList(rootList) {
  return Cookies.set(RootList, rootList)
}

export function removeRootList() {
  return Cookies.remove(RootList)
}
