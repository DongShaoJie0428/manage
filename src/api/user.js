import request from '@/utils/request'

// 用户列表
export function userList(params) {
  console.log('params...', params)
  return request({
    url: '/users/list',
    method: 'get',
    params
  })
}

// 修改用户列表信息
export function userUpdata(data) {
  return request({
    url: '/users/update',
    method: 'post',
    data
  })
}

// 删除用户列表
export function deleteUserInfo(data) {
  return request({
    url: '/users/action',
    method: 'delete',
    data
  })
}
