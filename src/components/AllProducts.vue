<template>
	<div>
		<!-- loading -->
		<loading :active.sync="isLoading"></loading>
		
		<!-- content -->
		<div class="container">
      <div class="row clearfix">

				<!-- category bar -->
				<ul class="nav nav-tabs col-12 category-bar mb-4 mt-4">
				  <li class="nav-item">
				    <a class="nav-link" href="#" :class="{'active': selected=='all'}"
				    	@click.prevent="selected='all'; productCategory">
				    	全部商品
				    </a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link" href="#" :class="{'active': selected=='嚴重強迫症'}"
				    	@click.prevent="selected='嚴重強迫症'; productCategory">
				    	嚴重強迫症系列
				    </a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link" href="#" :class="{'active': selected=='天生奴才命'}"
				    	@click.prevent="selected='天生奴才命'; productCategory">
				    	天生奴才命系列
				    </a>
				  </li>
				</ul>
				
				<!-- card -->
        <div class="col-4 mb-4" v-for='(item, key) in newProducts' :key='item.id'>
				  <div class="card border-0 shadow-sm">
						
						<div style="height: 150px; background-size: cover; 
				      background-position: center"
				    	:style='{"backgroundImage": `url(${item.imageUrl})`}'
				    	class="thumbnail">
						  	<router-link class="cover" :to="`/product/${item.id}`">
		          			<div class="cover-btn">See More</div>
		          	</router-link>
						</div>

				    <div class="card-body item">
				      <router-link class="text-dark item-title" :to="`/product/${item.id}`">
	            	{{ item.title }}
	            </router-link>
				      <p class="card-text">{{ item.content}}</p>
				      <div class="d-flex justify-content-between align-items-baseline">
				        <div class="item-price" v-if="!item.price"> {{ item.origin_price | currencyFilter }} 元</div>
				        <del class="item-origin-price" v-if="item.price">原價 {{ item.origin_price | currencyFilter }} 元</del>
				        <div class="item-sale" v-if="item.price">特價 {{ item.price | currencyFilter }} 元</div>
				      </div>
				    </div>

				    <div class="card-footer d-flex">
				      <router-link class="btn btn-outline-secondary" 
				        :to="`/product/${item.id}`">
				      	查看更多
				      </router-link>
				      <button type="button" class="btn btn-outline-danger ml-auto">
				        <!-- @click="addToCart(item.id)" -->
				        <!-- <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i> -->
				        加到購物車
				      </button>
				    </div>
				  </div>

				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import $ from 'jquery';
	export default {
		data() {
			return {
				products: [],
				product: {},
				isLoading: false,
				status: {
					loadingItem: '' //存放產品id，判斷目前畫面上是哪個元素正在loading
				},
				cart: {},
				selected: 'all', //category bar內容
				newProducts: [] //分類過的商品內容
			}
		},
		methods: {
			getProducts() { //取得所有商品
 				const api = `https://vue-course-api.hexschool.io/api/albeehsiao/products/all`;
		    const vm = this;
		    vm.isLoading = true;
		    this.$http.get(api).then((response) => {
		      console.log(response.data);
		      vm.isLoading = false;
		      vm.products = response.data.products;
		      vm.newProducts = response.data.products;
		    })
			},
			// addToCart(id, qty = 1) {
			// 	const api = `https://vue-course-api.hexschool.io/api/albeehsiao/cart`;
		 //    const vm = this;
		 //    let cart = {
		 //    	product_id: id,
		 //    	qty
		 //    }
		 //    vm.status.loadingItem = id;
		 //    this.$http.post(api, {data: cart}).then((response) => {
		 //      console.log(response.data);
		 //      $('#productModal').modal('hide');
		 //      vm.status.loadingItem = '';
		 //      // vm.getCart();
		 //    });
			// },

			// getProduct(id) { //取的單一商品
			// 	const api = `https://vue-course-api.hexschool.io/api/albeehsiao/product/${id}`;
		 //    const vm = this;
		 //    vm.status.loadingItem = id;
		 //    this.$http.get(api).then((response) => {
		 //      console.log(response.data);
		 //      vm.product = response.data.product;
		 //      $('#productModal').modal('show');
		 //      vm.status.loadingItem = '';
		 //    });
			// },
			
			// getCart() {
			// 	const api = `https://vue-course-api.hexschool.io/api/albeehsiao/cart`;
		 //    const vm = this;
		 //    vm.isLoading = true;
		 //    this.$http.get(api).then((response) => {
		 //      console.log(response.data);
		 //      vm.cart = response.data.data;
		 //      vm.isLoading = false;
		 //    });
			// },

			// delCart(id) {
			// 	const api = `https://vue-course-api.hexschool.io/api/albeehsiao/cart/${id}`;
		 //    const vm = this;
		 //    vm.isLoading = true;
		 //    this.$http.delete(api).then((response) => {
		 //      console.log(response.data);
		 //      vm.isLoading = false;
		 //      vm.getCart();
		 //    });
			// },

			// addCouponCode() {
			// 	const api = `https://vue-course-api.hexschool.io/api/albeehsiao/coupon`;
		 //    const vm = this;
		 //    const coupon = {
		 //    	code: vm.coupon_code
		 //    }
		 //    vm.isLoading = true;
		 //    this.$http.post(api, {data: coupon}).then((response) => {
		 //      console.log(response.data);
		 //      if(response.data.success) {
		 //      	vm.isLoading = false;
		 //      	vm.getCart();
		 //      }else {
		 //      	vm.isLoading = false;
		 //      	this.$bus.$emit('messsage:push', response.data.message, 'danger');
		 //      };
		 //    });
			// },

			// createOrder() {
			// 	const api = `https://vue-course-api.hexschool.io/api/albeehsiao/order`;
		 //    const vm = this;
		 //    const order = vm.form;
		 //    // vm.isLoading = true;
	  //     this.$validator.validate().then((result) => {
	  //       if(result) {
	  //         this.$http.post(api, {data: order}).then((response) => {		      
			// 	      if(response.data.success) {
			// 	      	vm.isLoading = false;
			// 	      	console.log("訂單已完成", response);
			// 	      	if(response.data.success) {
			// 	      		vm.$router.push(`/customercheckout/${response.data.orderId}`);
			// 	      	}
			// 	      }else {
			// 	      	vm.isLoading = false;
			// 	      	this.$bus.$emit('messsage:push', response.data.message, 'danger');
			// 	      };
			// 	    });
	  //       }else {
	  //       	console.log('欄位不完整');
	  //       };
	  //     });
			// }
		},
		created() {
			this.getProducts();
			// this.getCart();
		},
		computed: {
			productCategory() {
				let vm = this;
				vm.newProducts = [];
				if(vm.selected == "all"){
					return vm.newProducts = vm.products;
					// this.tempProduct = Object.assign({},item);
				}else {
					vm.products.forEach((item , index , array) => {
						if(item.category == vm.selected) {
							vm.newProducts.push(item)
						}
					});
					return vm.newProducts;
				}
			}
		}
	}
</script>