<template>
	<div>
		<!-- loading -->
		<loading :active.sync="isLoading"></loading>

		<!-- carousel -->
		<div class="row justify-content-center u-over-hidden">
			<div class="col-md-7 col-sm-9 mx-auto mt-4">
				<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
				  <ol class="carousel-indicators">
				    <li data-target="#carouselExampleIndicators" data-slide-to="0" 
				    	class="active"></li>
				    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
				    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
				  </ol>
				  <div class="carousel-inner">
				    <div class="carousel-item active">
				      <img class="d-block w-100" src="@/image/first.jpg" alt="First slide">
				    </div>
				    <div class="carousel-item">
				      <img class="d-block w-100" src="@/image/second.jpg" alt="Second slide">
				    </div>
				    <div class="carousel-item">
				      <img class="d-block w-100" src="@/image/third.jpg" alt="Third slide">
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
		
		<!-- content -->
		<div class="container">
      <div class="row clearfix">

				<!-- navbar -->
				<ul class="nav nav-tabs u-col-12 category-bar mb-4 mt-4">
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
        <div class="u-col-4 mb-4" v-for='(item, key) in newProducts' :key='item.id'>
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
				      <button type="button" class="btn btn-outline-danger ml-auto"
				      	@click="addCart(item.id)">
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
		      // console.log(response.data);
		      vm.isLoading = false;
		      vm.products = response.data.products;
		      vm.newProducts = response.data.products;
		    })
			},
			addCart(id, qty = 1) {
		  	this.$emit('allproductsaddcart', id, qty);
			}
		},
		created() {
			this.getProducts();
		},
		computed: {
			productCategory() {
				let vm = this;
				vm.newProducts = [];
				if(vm.selected == "all"){
					return vm.newProducts = vm.products;
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
	.u-col-4, .u-col-12 {
	  float: left;
	  padding: 0 30px;
	}
	.u-col-4 {
		width: 33.33333%;
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
	

	/*carousel*/
	.u-over-hidden {
	  overflow: hidden;
	}


	/*card*/
	.thumbnail {
	  position: relative;
	  img {
	    width: 100%;
	    height: auto;
	  }
	  .cover {
	    position: absolute;
	    background: rgba(0,0,0,0.8);
	    border: 2px solid rgba(0,0,0,0.5);
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    text-align: center;
	    opacity: 0;
	    transition: all .2s;
	    text-decoration: none;
	    &:hover {
	      opacity: 1;
	    }
	    .cover-btn {
	      position: absolute;
	      padding: 5px 10px;
	      border: 1px solid $text-color-white;
	      top: 50%;
	      left: 50%;
	      transform: translate(-50%,-50%);
	      font-size: $font-size;
	      color: $text-color-white;
	      border-radius: 5px;
	    }
	  }
	}
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


	@media (max-width: 1024px) { 
	  .container {
	    max-width: 760px; 
	  }
	  .u-col-4 {
	    width: 50%;
	  }
	  .u-col-12 {
	  	width: 100%;
	  }
	}
	
	@media (max-width: 760px) { 
	  .container {
	    max-width: 320px; 
	  }
	  .u-col-4, .u-col-12 {
	  	width: 100%;
	  }
	  .nav, .btn {
	    font-size: 0.8rem;
	  }
	}
</style>