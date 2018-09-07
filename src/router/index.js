import Vue from 'vue'
import VueRouter from 'vue-router'

import dashboard from '@/components/Dashboard.vue'
import about from '@/components/About.vue'
import coupon from '@/components/Coupon.vue'
import allproducts from '@/components/AllProducts.vue'
import product from '@/components/Product.vue'
import ordercheck from '@/components/OrderCheck.vue'

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
          name: 'allproducts',
          component: allproducts
        },
        {
          path: 'product/:itemId',
          name: 'product',
          component: product
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