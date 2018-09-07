<template>
	<div id="ordercheck">
		<!-- loading -->
		<loading :active.sync="isLoading"></loading>

		<!-- orderstep -->
		<div class="orderstep text-center" v-if="!cartEmpty">
			<div class="container">
	      <div class="row clearfix">
					<div class="u-col-4">
	      		<span class="step" :class="{'current-step':step == 1}">1. 確認購買清單</span>
	      	</div>
	      	<div class="u-col-4">
	      		<span class="step" :class="{'current-step':step == 2}">2. 填寫個人資料</span>
	      	</div>
	      	<div class="u-col-4">
	      		<span class="step" :class="{'current-step':step == 3}">3. 確認</span>
	      	</div>
				</div>
			</div>
		</div>

		<!-- 1.checkorderlist -->
		<div class="checkorderlist" v-if="step == 1">
			<div class="container">
	      <div class="row clearfix">
					<div class="u-col-12" v-if="!cartEmpty">
						<table class="table">
							<thead>
								<tr>
									<th></th>
									<th class="table-image">商品圖片</th>
									<th>名稱</th>
									<th>數量</th>
									<th>單價</th>
								</tr>	
							</thead>

							<tbody>
								<tr v-for="(item, key) in cart.carts" :key='item.id' v-if="cart.carts">
									<td class="align-middle">
				            <button type="button" class="btn btn-outline-danger btn-sm" 
				            	@click='delCart(item.id)'>
				              <i class="far fa-trash-alt"></i>
				            </button>
				          </td>
				          <td class="table-image">
				          	<img class="img-fluid" style="width:100px" 
				          		:src="item.product.imageUrl" alt="商品圖片">
				          </td>
									<td class="align-middle">
										{{ item.product.title }}
										<div class="text-success" v-if="item.coupon">
		                  已套用優惠券
		                </div>
									</td>

									<td class="align-middle">{{ item.qty }}{{ item.product.unit }}</td>
									<td class='align-middle'>{{ item.final_total | currencyFilter }}</td>
								</tr>
							</tbody>

							<tfoot>
				        <tr v-if="cart.final_total == cart.total">
				        	<td></td>
				        	<td class="table-image"></td>
				        	<td></td>
				          <td>總計</td>
				          <td>{{ cart.total | currencyFilter }}</td>
				        </tr>
				        <tr v-if="cart.final_total !== cart.total">
				        	<td></td>
				        	<td class="table-image"></td>
				        	<td></td>
		              <td class=" text-success">折扣價</td>
		              <td class=" text-success">{{ cart.final_total | currencyFilter }}</td>
		            </tr>
				      </tfoot>
						</table>

						<!-- addcoupon -->
						<div class="coupon input-group">
							<input type="text" class="form-control" v-model="coupon_code" 
								placeholder="請輸入優惠碼">
		        	<div class="input-group-append">
		            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
		              套用優惠碼
		            </button>
		          </div>
						</div>
	          
					</div>

					<div class="u-col-12 ordercart-nothing" 
						v-if="cartEmpty">
						<div>購物車沒有東西了～～趕緊購物去吧 Σ(っ °Д °;)っ</div>
						<router-link to="/" class="btn btn-primary text-light btn-goshopping">
							繼續購物
						</router-link>
					</div>
				</div>
			</div>
		</div>

		
        
		<!-- 2.checkorderinfo -->
		<div class="checkorderlist" v-if="step == 2">
			<div class="container">
	      <div class="row clearfix">
					<div class="u-col-12">		
		        <form @submit.prevent='createOrder'>
							<div class="form-group">
				        <label for="email">信箱</label>
				        <input type="text" class="form-control" id="email" name="信箱" 
				        	placeholder="輸入信箱" v-model="form.user.email"
				        	v-validate="'required|email|max:50'" 
				        	:class="{'is-invalid': errors.has('信箱')}"></input>
				        <span class='text-danger' v-if="errors.has('信箱')">{{ errors.first('信箱') }}</span>
				      </div>
				      <div class="form-group">
				        <label for="name">姓名</label>
				        <input type="text" class="form-control" id="name" name="姓名"
				        	placeholder="輸入姓名" v-model="form.user.name"
				        	v-validate="'required|max:20'"
				        	:class="{'is-invalid': errors.has('姓名')}"></input>
				        <span class='text-danger' v-if="errors.has('姓名')">
				        	{{ errors.first('姓名') }}</span>
				      </div>
							<div class="form-group">
				        <label for="tel">電話</label>
				        <input type="text" class="form-control" id="phone" name='電話'
				        	placeholder="輸入電話" v-model="form.user.tel"
				        	v-validate="'required|numeric|max:50'"
				        	:class="{'is-invalid': errors.has('電話')}"></input>
				        <span class='text-danger' v-if="errors.has('電話')">
				        	{{ errors.first('電話') }}</span>
				      </div>
				      <div class="form-group">
				        <label for="address">地址</label>
				        <input type="address" class="form-control" id="address" name="地址"
				        	placeholder="輸入地址" v-model="form.user.address"
				        	v-validate="'required|max:100'"
				        	:class="{'is-invalid': errors.has('地址')}"></input>
				        <span class='text-danger' v-if="errors.has('地址')">
				        	{{ errors.first('地址') }}</span>
				      </div>
				      <div class="form-group">
				        <label for="message">留言</label>
				        <textarea class="form-control" cols="30" rows="10" id="message" name="留言"
				        	v-model="form.message" v-validate="'max:300'"
				        	:class="{'is-invalid': errors.has('留言')}"></textarea>
				        <span class='text-danger' v-if="errors.has('留言')">
				        	{{ errors.first('留言') }}</span>
				      </div>
				      <div class="text-right">
					      <!-- <button class="btn btn-outline-danger">送出訂單</button> -->
				      </div>
				    </form>
				  </div>
				</div>
			</div>
		</div>

		<!-- 3.done -->
		<div class="done" v-if="step == 3">
			<div class="container">
				<div class="row clearfix">
					<div class="u-col-12">
						<table class="table">
							<thead>
								<tr>
									<th class="table-image">商品圖片</th>
									<th>名稱</th>
									<th>數量</th>
									<th>單價</th>
								</tr>	
							</thead>
							<tbody>
								<tr v-for="(item, key) in cart.carts" :key='item.id' v-if="cart.carts">
				          <td class="table-image">
				          	<img class="img-fluid" style="width:100px" 
				          		:src="item.product.imageUrl" alt="商品圖片">
				          </td>
									<td class="align-middle">
										{{ item.product.title }}
										<div class="text-success" v-if="item.coupon">
		                  已套用優惠券
		                </div>
									</td>
									<td class="align-middle">{{ item.qty }}{{ item.product.unit }}</td>
									<td class='align-middle'>{{ item.final_total | currencyFilter }}</td>
								</tr>
							</tbody>
							<tfoot>
				        <tr v-if="cart.final_total == cart.total">
				        	<td class="table-image"></td>
				        	<td></td>
				          <td>總計</td>
				          <td>{{ cart.total | currencyFilter }}</td>
				        </tr>
				        <tr v-if="cart.final_total !== cart.total">
				        	<td class="table-image"></td>
				        	<td></td>
		              <td class=" text-success">折扣價</td>
		              <td class=" text-success">{{ cart.final_total | currencyFilter }}</td>
		            </tr>
				      </tfoot>
						</table>
					</div>
					<div class="u-col-12">
						<h6 class="personal-data-check">個人資料確認</h6>
						<table class="table">
							<thead>
								
							</thead>
							<tbody>
								<td width="20%">
									<tr>信箱： {{ form.user.email }}</tr>
									<tr>姓名： {{ form.user.name }}</tr>
									<tr>電話： {{ form.user.tel }}</tr>
									<tr>地址： {{ form.user.address }}</tr>
									<tr>留言： {{ form.message }}</tr>
								</td>
							</tbody>
							<tfoot></tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>

		<!-- stepbutton -->
		<div class="stepbutton" v-if="!cartEmpty">
			<div class="container">
				<div class="row clearfix">
					<div class="u-col-6 prevbtn">
						<router-link to="/" class="btn btn-outline-secondary" v-if="step == 1">繼續購物</router-link>
						<button type="button" class="btn btn-outline-secondary d-block" 
							v-if="step == 2 || step == 3" @click="prevStep">
							上一步
						</button>
					</div>
					<div class="u-col-6 check-btn">
						
						<button type="button" class="btn btn-primary d-block" 
							v-if="step == 1 || step == 2 " @click="stepChange">
							下一步
						</button>
						<button type="button" class="btn btn-danger d-block" 
							v-if="step == 3" @click="createOrder">
							送出訂單！
						</button>
					</div>
				</div>
			</div>
		</div>
		
	
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	import $ from 'jquery';
	export default {
		data() {
			return {
				products: [],
				product: {},
				coupon_code: '',
				form: {
					user: {
						name: '',
						email: '',
		        tel: '',
		        address: ''
					},
					message: ""
				},
				step: 1,
				isOrdercartEmpty: false
			}
		},
		methods: {
			addCouponCode() {
	      this.$store.dispatch('addCouponCode', this.coupon_code);
	      this.coupon_code = '';
	    },
			// createOrder() {
		 //    const vm = this;
			// 	const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTPATH}/order`;
		 //    const order = vm.form;
   //      this.$http.post(api, {data: order}).then((response) => {		      
		 //      if(response.data.success) {
		 //      	vm.isLoading = false;
		 //      	this.$bus.$emit('messsage:push', response.data.message, 'success');
		 //      	vm.$router.push('/');
		 //      }else {
		 //      	vm.isLoading = false;
		 //      	this.$bus.$emit('messsage:push', response.data.message, 'danger');
		 //      };
		 //    });
			// },
			createOrder() {
	      this.$store.dispatch('createOrder', this.form);
	      this.$router.push('/');
	    },
			stepChange() {
				document.body.scrollTop = 0;
    		document.documentElement.scrollTop = 0;
				let vm = this;
				if(vm.step == 1) {
					vm.step = 2;
				}else if(vm.step == 2) {
					// console.log('step=2');
					this.$validator.validate().then((result) => {
						if(result) {
							// console.log('validate result: ',result);
							vm.step = 3;
						}else {
							this.$bus.$emit('messsage:push', '請填寫完整個人資料', 'danger');
						};
					});
				};
			},
			prevStep() {
				document.body.scrollTop = 0;
    		document.documentElement.scrollTop = 0;
				let vm = this;
				if(vm.step == 2) {
					vm.step = 1;
				}else if(vm.step == 3) {
					vm.step = 2;
				}
			},
      delCart(id) {
        this.$store.dispatch('delCart', id);
        this.$emit('reloadcart');
      },
		},
		created() {
		},
		computed: {
			cartEmpty() {
				if(this.cart.carts.length == 0) {
					return true;
				}else {
					return false;
				}
			},
			...mapGetters(['cart', 'isLoading']),
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
	.u-col-6 {
		float: left;
		padding: 0 30px;
		&.check-btn {
			display: flex;
			justify-content: flex-end;
		}
	}
	.u-col-4 {
		width: 33.33333%;
	}
	.u-col-6 {
		width: 50%;
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
	#ordercheck {
		min-height: 600px;
	}
	
	/*orderstep*/
	.orderstep {
	  padding: 50px 0;
	}
	.step{
	  display: inline-block;
	  color: $text-color-gray;
	  font-weight: normal;
	  border-bottom: 2px solid;
	  border-color: transparent;
	  padding-bottom: 2px;
	}
	.current-step{
	  color: $text-color-black;
	  border-color: $text-color-black;
	  letter-spacing: 1px;
	}


	/*1.checkorderlist*/
	.coupon {
	  padding: 50px 0;
	}
	.table-right {
		display: flex;
		justify-content: flex-end;
	}
	.ordercart-nothing {
    margin: 1rem 0;
    letter-spacing: 1px;
    padding-top: 30px;
    padding-bottom: 30px;
    text-align: center;
    background-image: url('../image/coupon-background.jpg');
		background-repeat: no-repeat;
		background-size: cover;
	}
	.btn-goshopping {
		margin-top: 20px;
	}

	/*stepbutton*/
	.stepbutton {
	  padding-bottom: 50px;
	  a {
	  	color: #6c757d;
	  }
	}


	// table
	.table {
		font-size: 1rem;
		font-weight: normal;
  	word-break:break-all;
	}
	.personal-data-check {
		text-align: center;
	}


	@media (max-width: 1024px) { 
	  .container {
	    max-width: 760px; 
	  } 
	}

	@media (max-width: 560px) { 
	  .container {
	    max-width: 480px; 
	  } 
	  .u-col-6 {
	  	width: 50%;
	  }
	  .u-col-4, .u-col-12 {
	  	width: 100%;
	  }
	  .table-image {
	  	display: none;
	  }
	  * {
	  	font-size: 0.9rem;
	  }

	}
	
	@media (max-width: 425px) { 
	  .container {
	    max-width: 320px; 
	  }
	  * {
	  	font-size: 0.8rem;
	  }
	}
</style>