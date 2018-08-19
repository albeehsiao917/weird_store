<template>
	<div>		
		<!-- product -->
		<router-view @productaddcart="addcart" @allproductsaddcart="addcart"></router-view>
	</div>
</template>

<script>
	import $ from 'jquery';
	export default {
		data() {
			return {}
		},
		methods: {
			addcart(id, qty) {
				this.$emit('shopaddcart', id, qty);
			}
		}
	};
</script>