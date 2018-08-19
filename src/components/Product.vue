<template>
	<div>
		<!-- loading -->
		<loading :active.sync="isLoading"></loading>

		<!-- product -->
		<div class="container">
      <div class="row clearfix">

      	<div class="product">
      		<div class="col-8">
						<!-- carousel -->
						<div class="row justify-content-center u-over-hidden">
							<div id="carouselExampleIndicators" class="carousel slide" 
								data-ride="carousel">
							  <ol class="carousel-indicators">
							    <li data-target="#carouselExampleIndicators" data-slide-to="0" 
							    	class="active"></li>
							    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
							    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
							    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
							    <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
							  </ol>
							  <div class="carousel-inner">
							    <div class="carousel-item active">
							      <img class="d-block w-100" :src="product.imageUrl" alt="First slide">
							    </div>
							    <div class="carousel-item">
							      <img class="d-block w-100" src="https://picsum.photos/g/715/420" alt="">
							      <div class="carousel-caption d-none d-md-block">
									    <p>註：此圖為 Lorem Picsum 隨機取得</p>
									  </div>
							    </div>
							    <div class="carousel-item">
							      <img class="d-block w-100" src="https://picsum.photos/g/715/420" alt="">
							      <div class="carousel-caption d-none d-md-block">
									    <p>註：此圖為 Lorem Picsum 隨機取得</p>
									  </div>
							    </div>
							    <div class="carousel-item">
							      <img class="d-block w-100" src="https://picsum.photos/g/715/420" alt="">
							      <div class="carousel-caption d-none d-md-block">
									    <p>註：此圖為 Lorem Picsum 隨機取得</p>
									  </div>
							    </div>
							    <div class="carousel-item">
							      <img class="d-block w-100" src="https://picsum.photos/g/715/420" alt="">
							      <div class="carousel-caption d-none d-md-block">
									    <p>註：此圖為 Lorem Picsum 隨機取得</p>
									  </div>
							    </div>
							  </div>

							  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
							    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
							    <span class="sr-only">Previous</span>
							  </a>
							  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
							    <span class="carousel-control-next-icon" aria-hidden="true"></span>
							    <span class="sr-only">Next</span>
							  </a>
							</div>
						</div>
					</div>

					<div class="col-4">
						<!-- product info -->
						<div class="item">
							<div class="item-titile">{{product.title}}</div>

							<hr>
							<div>商品描述： <br></div>
							<div class="item-description">{{product.description}}	</div>
							
							<hr>

							<div class="d-flex justify-content-between align-items-baseline mt-4">
				        <div class="item-price" v-if="!product.price"> 
				        	{{ product.origin_price | currencyFilter }} 元
				        </div>
				        <del class="item-origin-price" v-if="product.price">
				        	原價 {{ product.origin_price | currencyFilter }} 元
				        </del>
				        <div class="item-sale" v-if="product.price">
				        	特價 {{ product.price | currencyFilter }} 元
				        </div>
				      </div>

				      <select name="" class="form-control mt-3" v-model="product.num">
								<option value="0" selected disabled>請選擇商品數量</option>
	              <option :value="num" v-for="num in 20" :key="num">
	                選購 {{num}} {{product.unit}}
	              </option>
	            </select>

							<div class="d-flex justify-content-between align-items-baseline addcart mt-4">
								<div class="text-muted text-nowrap mr-3">
				      		小計 <strong>{{ product.num * product.price | currencyFilter }}</strong> 元
				      	</div>
				      	<button type="button" class="btn btn-primary" 
				      		@click="addCart(product.id, product.num)">
				      		加到購物車
				      	</button>
	          	</div>

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
				product: {},
				itemId: '',
				isLoading: false
			}
		},
		methods: {
			getProduct() { //取的單一商品
				const vm = this;
				const api = `https://vue-course-api.hexschool.io/api/albeehsiao/product/
					${vm.itemId}`;
		    vm.isLoading = true;
		    this.$http.get(api).then((response) => {
		      console.log(response.data);
		      vm.product = response.data.product;
		      vm.isLoading = false;
		      vm.product.num = 0;
		    });
			},
			addCart(id, qty = 1) {
				this.$emit('productaddcart', id, qty);
			}
		},
		created() {
			let vm = this;
			vm.itemId = this.$route.params.itemId;
			this.getProduct();
		}
	}
</script>