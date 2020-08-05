import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/index'},
    { 
      path: '/err', 
      name: 'err', 
      component: resolve => require(['@/pages/err'],resolve) ,
      meta: {
        keepAlive: false
      }
     },
     { 
      path: '/about', 
      name: 'about', 
      component: resolve => require(['@/pages/about'],resolve) ,
      meta: {
        keepAlive: false
      }
     },
    { 
      path: '/house', 
      name: 'house', 
      component: resolve => require(['@/pages/house'],resolve) ,
      meta: {
        keepAlive: false
      }
    },
    { 
      path: '/housedetail',
      name: 'housedetail', 
      component: resolve => require(['@/pages/housedetail'],resolve),
      meta: {
        keepAlive: false
      }
    },
    { 
      path: '/collect', 
      name: 'collect', 
      component: resolve => require(['@/pages/collect'],resolve),
      meta: {
        keepAlive: false
      }
    },
    { 
      path: '/write', 
      name: 'write', 
      component: resolve => require(['@/pages/write'],resolve),
      meta: {
        keepAlive: true
      }
    },
    { 
      path: '/ditu', 
      name: 'ditu', 
      component: resolve => require(['@/pages/ditu'],resolve),
      meta: {
        keepAlive: false
      }
    },
    { 
      path: '/entrust', 
      name: 'entrust', 
      component: resolve => require(['@/pages/entrust'],resolve),
      meta: {
        keepAlive: false
      }
    },
    { 
      path: '/detail', 
      name: 'detail', 
      component: resolve => require(['@/pages/detail'],resolve),
      meta: {
        keepAlive: false
      }
    },
    { 
      path: '/lpdetail', 
      name: 'lpdetail', 
      component: resolve => require(['@/pages/lpdetail'],resolve),
      meta: {
        keepAlive: false
      }
    },
    { 
      path: '/permap', 
      name: 'permap', 
      component: resolve => require(['@/components/permap'],resolve),
      meta: {
        keepAlive: false
      }
    },
    { 
      path: '/index', 
      name: 'index', 
      component: resolve => require(['@/pages/index'],resolve),
      meta: {
        keepAlive: false
      }
    },
    { 
      path: '/free', 
      name: 'free', 
      component: resolve => require(['@/pages/free'],resolve),
      meta: {
        keepAlive: false
      }
    },
    { 
      path: '/good', 
      name: 'good', 
      component: resolve => require(['@/pages/good'],resolve),
      meta: {
        keepAlive: true
      }
    },
    { 
      path: '*', 
      name: '404', 
      component: resolve => require(['@/pages/404'],resolve),
      meta: {
        keepAlive: false
      }
    }
  ]
})