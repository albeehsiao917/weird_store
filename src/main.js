//npm套件
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';
import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';
import * as VueGoogleMaps from 'vue2-google-maps'

//自定義套件
import Vue from 'vue';
import App from './App.vue';
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Loading);

VeeValidate.Validator.localize('zh_TW', zhTWValidate);
Vue.use(VeeValidate);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDy7niYo3hKVoLoxDPCbZqRZWG_x7jml4k',
    libraries: 'places',
  }
});


//啟用元件
Vue.component('Loading',Loading);
Vue.filter('currencyFilter',currencyFilter);
Vue.filter('dateFilter',dateFilter);

new Vue({
	router,
  	render: h => h(App)
}).$mount('#app');
