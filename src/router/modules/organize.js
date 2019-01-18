import Layout from '@/views/layout/Layout'

// 权限管理 如果你有权限你就会出现你对应的页面
const organizeRouter = {
  path: '/organize',
  component: Layout,
  redirect: '/organize/index',
  name: 'Organize',
  meta: {
    title: 'Organize',
    icon: 'peoples'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/organize/index'),
      name: 'Index',
      meta: { title: 'Index' }
    }, {
      path: 'coding',
      component: () => import('@/views/organize/index'),
      name: 'Coding',
      meta: { title: 'Coding', roles: ['coding'] }
    }, {
      path: 'review',
      component: () => import('@/views/organize/index'),
      name: 'Review',
      meta: { title: 'Review', roles: ['review'] }
    }, {
      path: 'commit',
      component: () => import('@/views/organize/commit'),
      name: 'Commit',
      meta: { title: 'Commit', roles: ['commit'] }
    }, {
      path: 'prd',
      component: () => import('@/views/organize/index'),
      name: 'Prd',
      meta: { title: 'Prd', roles: ['prd'] }
    }, {
      path: 'demand',
      component: () => import('@/views/organize/index'),
      name: 'Demand',
      meta: { title: 'Demand', roles: ['demand'] }
    }, {
      path: 'activity',
      component: () => import('@/views/organize/index'),
      name: 'Activity',
      meta: { title: 'Activity', roles: ['activity'] }
    }, {
      path: 'ui',
      component: () => import('@/views/organize/index'),
      name: 'UI',
      meta: { title: 'UI', roles: ['ui'] }
    }
  ]
}
export default organizeRouter
