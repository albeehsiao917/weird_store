<template>
	<div>
		<!-- loading -->
		<loading :active.sync="isLoading"></loading>

		<div class="container">
      <div class="row clearfix justify-content-center">

				
				<div style="width: 50%;">

					<!-- game start -->
					<div class="game-start">
						<h5 class="game-title my-4">(❁´ω`❁)~領取優惠券~(❁´ω`❁)</h5>
				    <img class="img-fluid" 
				    	src="@/image/coupon-background.jpg" alt="">
				    <div class="desc">
							只要在<span class="chance"><b>三次機會內</b></span>猜對了他的年齡，<br>
							就會提供你一個折扣代碼喔～！<br>
						</div>
						<button class="btn btn-primary d-block mx-auto my-2 btn-lg" 
							@click="isShow = true" v-if="!isShow">
							給我折扣！
						</button>
					</div>
					
					<!-- card -->
					<div class="card text-dark bg-light d-block mx-auto my-2 text-center"
						style="width: 50%;" v-if="isShow">
					  <div class="card-body">
					    <div class="card-title person-from">
					    	來自{{ person[0].location.city }}的
					    	<span class='person-name'>{{ person[0].name.last }}</span>
					    </div>
					    <img class="card-img-top" :src="person[0].picture.large" 
					  		alt="person">
					  </div>
					</div>
					
					<!-- guess -->
					<div class="guess" v-if="isShow && times !== 0">
						<div v-if="isHigh && !success">
				  		猜的太高了，還有{{ times }}次機會
				  	</div>
				  	<div v-if="!isHigh && !success && times !== 3">
				  		猜的太低了，還有{{ times }}次機會
				  	</div>
				    <p class="card-text" v-if="!success">
				    	小提示～可能介於{{ Math.floor(person[0].dob.age/10)*10 }}~{{ Math.floor((person[0].dob.age/10)+1)*10 }}之間
				    </p>
				    <input type="number" placeholder="猜猜看～" v-if="!success"
				    	v-model.number="inputAge" class="text-center rounded border">
				    <button class="btn btn-primary d-block mx-auto mt-4" 
				    	@click.prevent="guessAge" v-if="times !== 0">
				    	勇敢的試一試吧～
				    </button>
					</div>
					
					<!-- success -->
					<div class="desc" v-if="success">
						恭喜你猜中了！是{{ person[0].dob.age }}歲沒錯！<br>
						{{ person[0].name.last }}想給你的折扣代碼是
						<code class="border rounded bg-light px-2 py-1">
							<b>{{ getCoupon.code }}</b>
						</code><br>
						﹝折扣名稱：<b>{{ getCoupon.name }}</b>，{{ 100-getCoupon.discount }}% off﹞
						<br>
						想必這也是一種緣份~~~不如就當交個朋友吧！<br>
						他的電話是{{ person[0].phone }}，e-mail是{{ person[0].email }}
						<div>
							<router-link class="btn btn-success text-white mt-4" to="/">
								馬上買個小禮物送給他
							</router-link>
						</div>
					</div>
					
					<!-- fail -->
					<div class="desc" v-if="!success && times == 0">
						太可惜了～他的年齡是{{ person[0].dob.age }}歲<br>
						但是沒關係！看在你這麼認真玩遊戲的份上還是給你一點小折扣<br>
						折扣代碼是
						<code class="border rounded bg-light px-2 py-1">
							<b>{{ getCoupon.code }}</b>
						</code><br>
						﹝折扣名稱：<b>{{ getCoupon.name }}</b>，{{ 100-getCoupon.discount }}% off﹞
						<div>
							<router-link class="btn btn-success text-white mt-4" to="/">
								領著折扣就趕緊購物吧
							</router-link>
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
				isLoading: false,
				person: [],
				isShow: false,
				inputAge: '',
				success: false,
				times: 3,
				isHigh: false,
				coupons: [
					{
						name: '噓🤫闆娘一點小折扣',
						code: 'neversay',
						discount: 70
					},
					{
						name: '闆娘永遠愛您～',
						code: 'foreverlove',
						discount: 95
					},
					{
						name: '是時候了都給闆娘買起來',
						code: 'buybuybuy',
						discount: 80
					},
				]
			}
		},
		methods: {
			getData() {
				const vm = this;
				const api = `https://randomuser.me/api/`;
		    vm.isLoading = true;
		    this.$http.get(api).then((response) => {
		      console.log(response.data.results);
		      vm.isLoading = false;
		      vm.person = response.data.results;
		    })
			},
			guessAge() {
				let vm = this;
				if(vm.times !== 0) {
					if(vm.inputAge == vm.person[0].dob.age) {
						vm.success = true;
						vm.times = 0;
					}else if(vm.inputAge > vm.person[0].dob.age) {
						vm.success = false;
						vm.times = vm.times - 1;
						vm.isHigh = true;
					}else {
						vm.success = false;
						vm.times = vm.times - 1;
					}
				}
			}
		},
		created() {	
			this.getData();		
		},
		computed: {
			getCoupon() {
				let vm = this;
				let num = Math.round(Math.random()*100)%(vm.coupons.length);
				let randomCoupon = vm.coupons[num];
				console.log(vm.coupons[num]);
				return randomCoupon;
			}
		}
	}
</script>

<style scope>
	.desc, .game-start, .guess, .game-title {
		margin: 20px 0;
		font-weight: normal;
		letter-spacing: 1px;
		text-align: center;
		line-height: 30px;
	}
	.chance, .person-name {
		color: #FF556C;
	}
	.person-from {
		/*letter-spacing: 1px;*/
		text-transform: uppercase;
	}
</style>