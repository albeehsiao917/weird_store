import Vue from 'vue'
import VueRouter from 'vue-router'

// import home from '@/components/HelloWorld'
import dashboard from '@/components/Dashboard'
import shop from '@/components/pages/Shop'
import faq from '@/components/pages/FAQ'
import coupon from '@/components/pages/Coupon'
import product from '@/components/pages/Product'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      // name: 'dashboard',
      component: dashboard,
      children: [
        {
          path: '',
          name: 'shop',
          component: shop,
          children: [
            {
              path: 'product/:itemId',
              name: 'product',
              component: product
            }
          ]
        },
        {
          path: 'faq',
          name: 'faq',
          component: faq
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: coupon
        }
      ]
    }
  ]
})