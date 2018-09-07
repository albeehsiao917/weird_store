<template>
  <div>

    <!-- header -->
    <div id="header">
      <div class="container clearfix">

          <div class="u-col-4" id="logo">
            <ul>
              <router-link class="store-name" to="/">Weird Store</router-link>
            </ul>
          </div>

          <div class="u-col-8">
            <div id="nav" :class="{'open':isMenu}">
              <ul>
                <li>
                  <router-link to="/">購物</router-link>
                  <span class="boundary"></span>
                </li>
                <li>
                  <router-link to="/about">關於</router-link>
                  <span class="boundary"></span>
                </li>
                <li>
                  <router-link to="/coupon">優惠券</router-link>
                  <span class="boundary"></span>
                </li>
                <li>
                  <a href="" @click.prevent="isCartShow = !isCartShow">
                    <i class="fas fa-shopping-cart"></i> 
                    購物車
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div id="menu-trigger">
            <button class="menu-btn btn" @click.prevent="isMenu = !isMenu">
              <span>
                <i class="fas fa-bars"></i>
              </span>
            </button>
          </div>

      </div>
    </div>

    <!-- alert -->
    <Alert></Alert>

    <!-- cart -->
    <div class="card cart-box" style="max-width: 320px;" v-if="isCartShow" @blur="isCartShow = false">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-baseline">
          <div class="text-muted text-nowrap mr-3">
            <div class="card-title">購物車清單</div>
          </div>
          <div class="card-close" @click="isCartShow = false">
            <span></span>
            <span></span>
          </div>
        </div>
        <table class="table">
          <tbody>
            <tr v-for="(item, key) in cart.carts" :key='item.id' v-if="isCartItem">
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm" 
                  @click='delCart(item.id)'>
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                <img class="img-fluid" style="width:60px" :src="item.product.imageUrl" 
                  alt="商品圖片">
              </td>
              <td class="align-middle card-content">
                {{ item.product.title }} <br>
                x{{ item.qty }}
                  {{ item.total | currencyFilter}}
              </td>
            </tr>
            <div class="cartnothing" v-if="!isCartItem">購物車還沒有東西喔~</div>
          </tbody>
        </table>

        <div class="d-flex justify-content-between align-items-baseline mt-4" 
          v-if="isCartItem">
          <div class="text-muted text-nowrap mr-3">
            總計 <strong>{{ cart.final_total | currencyFilter }}</strong> 元
          </div>
          <router-link to="/ordercheck" class="btn btn-primary d-block text-light">
            結帳去
          </router-link>
        </div>

        <div class="mt-4" v-if="!isCartItem">
          <button type="button" class="btn btn-danger d-block" 
            @click="isCartShow = false">
            繼續購物
          </button>
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
          <div class="title">Stay weird, stay different</div>
          <div class="subtitle">&copy; 2018. by Albee Hsiao</div>
        </div>
        <div class="social-media">
          <ul class="clearfix">
            <li><a href="#"><i class="fab fa-facebook-square"></i></a></li>
            <li><a href="#"><i class="fab fa-instagram"></i></a></li>
            <li>
              <a href="https://github.com/albeehsiao917" target="_blank">
              <i class="fab fa-github"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- go top -->
    <div id="go-top" @click.prevent="gotop">
      <i class="fas fa-chevron-up"></i>
    </div>

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Alert from './Alert';
  export default {
    data() {
      return {
        isCartShow: false,
        isMenu: false,
      }
    },
    methods: {
      ...mapActions(['getCart']),
      delCart(id) {
        this.$store.dispatch('delCart', id);
      },
      addcart(id, qty) {
        this.$store.dispatch('addToCart', { id, qty }); //傳入多個參數改用物件的形式傳入
      },
      gotop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }      
    },
    created() {
      this.getCart();
    },
    components: {
      Alert
    },
    computed: {
      ...mapGetters(['cart', 'isLoading', 'isCartItem'])
    },
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
  

  /*dashboard header*/
  #header {
    background: $text-color-white;
  }
  #logo {
    position: relative;
    float: left;
    text-transform: uppercase;
    line-height: 100px;
  }

  #nav {
    position: relative;
    float: right;
    text-transform: uppercase;
    line-height: 100px;
    li {
      float: left;
    }
    a {
      letter-spacing: 1px;
      color: $text-color-black;
      text-decoration: none;
      &:hover {
        color: $text-color-hover;
      }
    }
  }
  .boundary {
    &:after {
      content: "|";
      padding: 0 18px;
    }
  }
  .store-name {
    display:inline-block;
    text-decoration: none;
    font-size: 2.2rem;
    color: #ff556c;
  }

  // hamburger menu
  #menu-trigger {
    display: none;
  }
  .menu-btn {
    background: #f5f5f5;
    border: 1px solid #7e7e7e;
  }


  /*cart*/
  .cart-box {
    position: fixed;
    z-index: 500;
    right: 5%;
    top: 20%;
    max-height: 70%;
    max-width: 50%;
    overflow: scroll;
  }
  .card-title {
    letter-spacing: 1px;
  }
  .card-close {
    position: absolute;
    right: 0px;
    float: right;
    width: 30px;
    height: 30px;
    cursor: pointer;
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 24px;
      height: 2px;
      background-color: lightgrey;
    }
    &:hover {
      span {
        background-color: $text-color-hover;
      }
    }
  }
  .card-close span:first-child{
    transform: translate(-50%, -50%) rotate(45deg);
  }
  .card-close span:last-child{
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  .card-content {
    font-size: 0.9rem;
  }
  .cartnothing {
    letter-spacing: 1px;
  }


  /*dashboard footer*/
  #footer {
    padding: 25px 0;
    background: $text-color-white;
    position: relative;
    .copyright {
      float: left;
      text-transform: uppercase;
      letter-spacing: 1px;
      .subtitle {
        font-size: 0.8rem;
        color: $text-color-black;
      }
    }
    .social-media {
      float: right;
      li {
        float: left;
        a {
          display: inline-block;
          margin: 5px;
          border: 1px solid $text-color-black;
          -webkit-border-radius: 20px;
          -moz-border-radius: 20px;
          border-radius: 20px;
          width: 40px;
          height: 40px;
          color: $text-color-black;
          text-decoration: none;
          text-align: center;
          line-height: 40px;
          &:hover {
            color: $text-color-hover;
            border: 1px solid $text-color-hover;
          }
        }
      }
    }
  }


  /*dashboard go-top*/
  #go-top {
    position: fixed;
    right: 20px;
    bottom: 35px;
    width: 40px;
    height: 40px;
    background: rgba(0,0,0,.5);
    text-align: center;
    line-height: 40px;
    text-decoration: none;
    color: $text-color-white;
    cursor: pointer;
  }


  @media (max-width: 1024px) { 
    .container {
      max-width: 760px; 
    }
    .u-col-4 {
      width: 40%;
    }
    .u-col-8 {
      width: 60%;
    }
    .u-col-12 {
      width: 100%;
    }
    .store-name {
      font-size: 1.6rem;
    }
  }
  
  @media (max-width: 760px) { 
    .container {
      max-width: 320px; 
    }
    .u-col-8, .u-col-12 {
      width: 100%;
    }
    .u-col-8 {
      padding: 0;
    }
    .u-col-4 {
      width: 60%;
      padding: 0;
    }
    #nav {
      display: none;
    }
    #menu-trigger {
      position: relative;
      display: flex;
      justify-content: flex-end;
      padding: 5px 0;
      width: 40%;
    }
    #logo {
      padding: 5px 0;
      line-height: 38px;
    }
    .store-name {
      font-size: 1.4rem;
    }
    .boundary {
      &:after {
        content: "";
        padding: 0;
      }
    }
    #nav.open {
      display: block;
      width: 100%;
      height: 20%;
      text-align: center;
      background-color: #f5f5f5;
      line-height: 25px;
      ul {
        position: relative;
        float: none;
      }
      li {
        position: relative;
        display: flex;
        justify-content: flex-end;
        padding: 0 5px;
        float: none;
      }
    }

    #footer {
      .copyright {
        float: none;
        text-align: center;
        .title {
          font-size: 0.8rem;
        }
        .subtitle {
          font-size: 0.6rem;
        }
      }
      .social-media {
        float: none;
        display: flex;
        justify-content: center;
      }
    }

  }
</style>