<template>
  <div>

    <!-- header -->
    <div id="header">
      <div class="container clearfix">
        <div id="nav">
          <ul class="clearfix">
            <router-link class="store-name" to="/">Weird Store</router-link>
            <router-link to="/">購物</router-link>
            <router-link to="/faq">FAQ</router-link>
            <router-link to="/coupon">優惠券</router-link>
            <router-link class="boundary" to="/cart">
              <i class="fas fa-shopping-cart"></i>
              購物車
            </router-link>
          </ul>
        </div>
      </div>
    </div>

    <!-- content -->
    <div id="content">
        <router-view></router-view>
    </div>

    <!-- footer -->
    <div id="footer">
      <div class="container clearfix">
        <div class="copyright">
          <div class="store-name">Weird Store</div>
          <div class="title">Stay weird, stay different</div>
          <div class="subtitle">&copy; 2018. by Albee Hsiao</div>
        </div>
        <div class="social-media">
          <ul class="clearfix">
            <li><a href="#"><i class="fab fa-facebook-square"></i></a></li>
            <li><a href="#"><i class="fab fa-instagram"></i></a></li>
            <li><a href="#"><i class="fab fa-github"></i></a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- go top -->
    <a href="#header" id="go-top"><i class="fas fa-chevron-up"></i></a>

  </div>
</template>

<script>
  export default {
  }
</script>