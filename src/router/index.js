import Vue from 'vue'
import VueRouter from 'vue-router'

// import home from '@/components/HelloWorld'
import dashboard from '@/components/Dashboard'
import shop from '@/components/Shop'
import faq from '@/components/FAQ'
import coupon from '@/components/Coupon'
import allproducts from '@/components/AllProducts'
import product from '@/components/Product'

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