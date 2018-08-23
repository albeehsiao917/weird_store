<template>
	<div>
			<div class="container about my-4">
      	<div class="row clearfix">
						<div class="u-col-12 brand">
      				<h6>品牌精神</h6>
      				<p class="title">"werid store"</p>
      				<p class="point">Lorem ipsum dolor sit adipisicing elit. <br>
      				Temporibus facere officia, itaque. <br>
      				Quo dolor, architecto quasi rem quae dignissimos.</p>
      				<p>Lorem ipsum dolor sit ametur adipisicing elit. <br>
      				Quos quas sunt nisi qst quasi doloribus. <br>
      				eligendi, libero consequuntur ipsam?</p>
      			</div>
      	</div>
			</div>	
			
			<div class="container contact">
				<div class="row clearfix">

					<div class="u-col-4 contact-info mb-4">
						<h6>聯絡資訊</h6>
						<div class="info">
							<div class="address">
								<label>地址：</label>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, hic.</p>
							</div>
	            <div>
	              <label>電話：</label>
	              <a href="tel:+99-123-123-123">+99 123 123 123</a>
	            </div>
	            <div>
	              <label>信箱：</label>
	              <a href="mailto:weird_store@mail.com">weird_store@mail.com</a>
	            </div>
						</div>
            
    			</div>

    			<div class="u-col-8 google-map mb-4">
						<gmap-map ref="mymap" :center="{lat:25.0339639, lng:121.5622835}" 
							:zoom="18" style="width: 100%; height: 500px">
				    <gmap-marker  :position="{lat:25.0339639, lng:121.5622835}" 
				    	:clickable="true"/>
				  	</gmap-map>
    			</div>

				</div>
			</div>
							
	</div>    
</template>

<script>
	export default {
		data() {
			return {}
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
	.u-col-4, .u-col-8, .u-col-12 {
	  float: left;
	  padding: 0 30px;
	}
	.u-col-4 {
		width: 33.33333%;
	}
	.u-col-8 {
		width: 66.66667%;
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
	

	/*about*/
	.about, .contact-info {
	  h6 {
	    padding-bottom: 1rem
	  }
	}
	.brand{
	  margin: 30px 0;
	  letter-spacing: 1px;
	  .title {
	    text-transform: uppercase;
	  }
	}
	.info {
	  letter-spacing: 1px;
	  color: $text-color-gray;
	  line-height: 30px;
	  a {
	    color: $text-color-gray;
	    text-decoration: none;
	  }
	}


	@media (max-width: 1024px) { 
	  .container {
	    max-width: 760px; 
	  }
	  .u-col-4, .u-col-8, .u-col-12 {
	  	width: 100%;
	  }
	}
	
	@media (max-width: 760px) { 
	  .container {
	    max-width: 320px; 
	  }
	}
</style>