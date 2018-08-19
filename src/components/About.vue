<template>
	<div>
			<div class="container about">
      	<div class="row clearfix">
						<div class="col-12 brand">
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

					<div class="col-4 contact-info">
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

    			<div class="col-8 google-map">
    				<GmapMap :center="{lat:25.0339639, lng:121.5622835}" 
    					:zoom="15" map-type-id="terrain"
						  style="width: 100%; height: 500px">
						  <GmapMarker :key="index" v-for="(m, index) in markers"
						    :position="m.position" :clickable="true"
						    :draggable="true" @click="center=m.position"/>
						</GmapMap>
    			</div>

				</div>
			</div>
							
	</div>    
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			
		}
	}
</script>

<!-- var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 25.0786104, lng: 121.5828413}, //中心點經緯度
    zoom: 17 //地圖大小
  });
} -->