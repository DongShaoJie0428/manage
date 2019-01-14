import request from '@/utils/request'

export function userList(params) {
  console.log('params...', params)
  return request({
    url: '/users/list',
    method: 'get',
    params
  })
}
