<template>
	<div>
		<!-- loading -->
		<loading :active.sync="isLoading"></loading>

		<!-- product -->
		<div class="container">
      <div class="row clearfix">

      	<div class="product">
      		<div class="u-col-8 mb-4">
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

					<div class="u-col-4">
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
		      // console.log(response.data);
		      vm.product = response.data.product;
		      vm.isLoading = false;
		      vm.product.num = 0;
		    });
			},
			addCart(id, qty = 1) {
				if(qty == 0) {
					this.$bus.$emit('messsage:push', '請選擇商品數量', 'danger');
				}else {
					this.$emit('productaddcart', id, qty);
				};
			}
		},
		created() {
			let vm = this;
			vm.itemId = this.$route.params.itemId;
			this.getProduct();
		}
	}
</script>

<style lang="scss" scoped>
	/*global*/
	$text-color-black: #333;
	$text-color-gray: #7e7e7e;
	$text-color-white: #f5f5f5;
	$text-color-hover: #0056b3;
	$font-size: 16px;

	* {
	  position: relative;
	  -webkit-box-sizing: border-box;
	  -moz-box-sizing: border-box;
	  box-sizing: border-box;
	  font-family: 'Open Sans', 'Barlow Condensed', sans-serif;
	}
	body {
	  font-size: $font-size;
	  font-weight: 400;
	  -webkit-font-smoothing: antialiased;
	  -moz-font-smoothing: antialiased;
	}
	img {
	  display: block;
	}
	ul {
	  margin: 0;
	  padding-left: 0;
	}
	li {
	  list-style-type: none;
	}
	p {
	  color: $text-color-gray;
	  line-height: 30px;
	}
	a {
	  color: $text-color-black;
	  text-decoration: none;
	}
	.container {
	  display: block;
	  max-width: 1170px;
	  margin: 0 auto;
	}
	.clearfix:after, .row:after {
	  content: "";
	  display: table;
	  clear: both;
	}
	.row {
	  margin: 0 -10px;
	}
	.u-col-2, .u-col-4, .u-col-6, .u-col-8, .u-col-10, .u-col-12 {
	  float: left;
	  padding: 0 30px;
	}
	.u-col-2 {
		width: 16.66667%;
	}
	.u-col-4 {
		width: 33.33333%;
	}
	.u-col-6 {
		width: 50%;
	}
	.u-col-8 {
		width: 66.66667%;
	}
	.u-col-10 {
		width: 83.33333%;
	}
	.u-col-12 {
		width: 100%;
	}
	.button {
	  display: inline-block;
	  padding: 15px 30px;
	  margin-top: 30px;
	  border: none;
	  background: $text-color-white;
	  color: $text-color-gray;
	  text-transform: uppercase;
	  text-decoration: none;
	  font-size: $font-size;
	}

	/*product*/
	.product {
	  padding: 50px 0;
	}

	/*carousel*/
	.u-over-hidden {
	  overflow: hidden;
	}
	
	// product info
  .item-title, .item-price{
    font-size: 1rem;
  }
  .item-origin-price {
    font-size: 0.8rem;
  }
  .item-sale {
    font-size: 1.2rem;
    color: #dc3545;
  }
  .item-description {
    height: 250px;
    overflow: scroll;
    line-height: 30px;
  }

	@media (max-width: 1024px) { 
	  .container {
	    max-width: 760px; 
	  }
	  .u-col-4, .u-col-8 {
			width: 100%;
		}
		.item-description {
	    height: auto;
	    overflow: scroll;
	    line-height: 30px;
	  }
	}
	
	@media (max-width: 760px) { 
	  .container {
	    max-width: 320px; 
	  }
	}

</style>