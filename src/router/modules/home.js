import Layout from '@/views/layout/Layout'

const homeRouter = {
  path: '/home',
  component: Layout,
  redirect: '/home/coding',
  name: 'Home',
  meta: {
    title: 'Home',
    icon: 'peoples'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/home/index'),
      name: 'Index',
      meta: { title: 'Index' }
    }, {
      path: 'coding',
      component: () => import('@/views/home/index'),
      name: 'Coding',
      meta: { title: 'Coding', roles: ['coding'] }
    }, {
      path: 'review',
      component: () => import('@/views/home/index'),
      name: 'Review',
      meta: { title: 'Review', roles: ['review'] }
    }, {
      path: 'commit',
      component: () => import('@/views/home/index'),
      name: 'Commit',
      meta: { title: 'Commit', roles: ['commit'] }
    }, {
      path: 'prd',
      component: () => import('@/views/home/index'),
      name: 'Prd',
      meta: { title: 'Prd', roles: ['prd'] }
    }, {
      path: 'demand',
      component: () => import('@/views/home/index'),
      name: 'Demand',
      meta: { title: 'Demand', roles: ['demand'] }
    }, {
      path: 'activity',
      component: () => import('@/views/home/index'),
      name: 'Activity',
      meta: { title: 'Activity', roles: ['activity'] }
    }, {
      path: 'ui',
      component: () => import('@/views/home/index'),
      name: 'UI',
      meta: { title: 'UI', roles: ['ui'] }
    }
  ]
}
export default homeRouter
