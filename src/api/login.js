import request from '@/utils/request'
import axios from 'axios'
import 'url-search-params-polyfill';

export function login(userName, passWord) {
  let param = new URLSearchParams()
  param.append('userName', userName)
  param.append('passWord', passWord)
  return request({
    url: '/shiro/login',
    method: 'post',
    data: param
  }) 
  /* return axios.post('http://172.16.0.145:8011/user/login', {
    userName : 'admin',
    passWord : 'admin'
  }) */
}


export function getInfo(token) {
  return request({
    url: '/shiro/info',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/shiro/logout',
    method: 'post'
  })
}

export function generateRoutes() {
  return request({
    url: '/shiro/generateRoutes',
    method: 'post'
  })
}
