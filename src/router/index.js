import Vue from 'vue'
import VueRouter from 'vue-router'

import dashboard from '@/components/Dashboard'
import shop from '@/components/Shop'
import about from '@/components/About'
import coupon from '@/components/Coupon'
import allproducts from '@/components/AllProducts'
import product from '@/components/Product'
import ordercheck from '@/components/OrderCheck'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      component: dashboard,
      children: [
        {
          path: '',
          component: shop,
          children: [
            {
              path: '',
              name: 'allproducts',
              component: allproducts
            },
            {
              path: 'product/:itemId',
              name: 'product',
              component: product
            }
          ]
        },
        {
          path: 'about',
          name: 'about',
          component: about
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: coupon
        },
        {
          path: 'ordercheck',
          name: 'ordercheck',
          component: ordercheck
        }
      ]
    }
  ]
})