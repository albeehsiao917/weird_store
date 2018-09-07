import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({	
	strict: true, //vuex嚴謹模式
	state: { //管理資料內容
    cart: {
      carts: [],
      final_total: 0,
    },
    isLoading: false,
    isCartItem: false,
    messages: [],
	},
	actions: { //操作行為，但不會直接操作state的資料狀態
    getCart(context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTPATH}/cart`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        context.commit('CART',response.data.data);
        context.commit('LOADING', false);
        if(context.state.cart.carts.length == 0) {
          context.commit('ISCARTITEM', false);
        }else {
          context.commit('ISCARTITEM', true);
        };
      });
    },
    delCart(context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTPATH}/cart/${id}`;
      context.commit('LOADING', true);
      axios.delete(api).then((response) => {
        context.commit('LOADING', false);
        context.dispatch('getCart');
      });
    },
    addToCart(context, { id, qty }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTPATH}/cart`;
      let cart = {
        product_id: id,
        qty
      }
      axios.post(api, {data: cart}).then((response) => {
        if(response.data.success) {
          let message = response.data.message;
          let status = 'success';
          context.dispatch('updateMessage', { message, status });
        }else {
          let message = response.data.message;
          let status = 'danger';
          context.dispatch('updateMessage', { message, status });
        }
        context.dispatch('getCart');
      });
    },
    addCouponCode(context, code) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTPATH}/coupon`;
      const coupon = { code: code};
      context.commit('LOADING', true);
      axios.post(api, {data: coupon}).then((response) => {
        if(response.data.success) {
          context.dispatch('getCart');
          context.commit('LOADING', false);
        }else {
          context.commit('LOADING', false);
          let message = response.data.message;
          let status = 'danger';
          context.dispatch('updateMessage', { message, status });
        };
      });
    },
    createOrder(context, form) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTPATH}/order`;
      const order = form;
      context.commit('LOADING', true);
      axios.post(api, {data: order}).then((response) => {          
        if(response.data.success) {
          context.commit('LOADING', false);
          let message = response.data.message;
          let status = 'success';
          context.dispatch('updateMessage', { message, status });
        }else {
          context.commit('LOADING', false);
          let message = response.data.message;
          let status = 'danger';
          context.dispatch('updateMessage', { message, status });
        };
      });
    },
    updateMessage(context, {message, status}) {
      const timestamp = Math.floor(new Date() / 1000);
      context.commit('PUSHMESSAGE', {message, status, timestamp});
      context.dispatch('removeMessageWithTiming',  timestamp );
    },
    removeMessage(context, num) { //X按鈕關閉訊息
      context.commit('SPLICEMESSAGES', num);
    },
    removeMessageWithTiming(context, timestamp) { //每5秒過後自動移除訊息
      setTimeout(() => {
        context.state.messages.forEach((item, i) => {
          console.log(timestamp, item, i);
          if (item.timestamp === timestamp) {
            context.commit('SPLICEMESSAGES', { i });
          }
        });
      }, 5000);
    },

	},
	mutations: { //操作資料狀態
    LOADING(state, boolean) {
      state.isLoading = boolean;
    },
    CART(state, response) {
      state.cart = response;
    },
    ISCARTITEM(state, boolean) {
      state.isCartItem = boolean;
    },
    SPLICEMESSAGES(state, num) {
      state.messages.splice(num, 1);
    },
    PUSHMESSAGE(state, response) {
      state.messages.push(response);
    },
	},
	getters: { //類似computed，用來過濾資料
    isLoading: state => state.isLoading,
    cart: state => state.cart,
    isCartItem: state => state.isCartItem,
    messages: state => state.messages,
	}
});