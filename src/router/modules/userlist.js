/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const userRouter = {
  path: '/userlist',
  component: Layout,
  redirect: '/userlist/index',
  name: 'UserList',
  meta: {
    title: 'UserList',
    icon: 'people'
  },
  children: [{
    path: 'index',
    component: () => import('@/views/userlist/index'),
    name: 'UserListIndex',
    meta: { title: 'UserListIndex', noCache: true }
  }]
}

export default userRouter
