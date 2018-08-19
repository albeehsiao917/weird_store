<template>
  <div>

    <!-- header -->
    <div id="header">
      <div class="container clearfix">
        <div id="nav">

          <div class="col-10 header-nav">
            <ul class="clearfix">
              <router-link class="store-name" to="/">Weird Store</router-link>
              <router-link to="/">購物</router-link>
              <router-link to="/about">關於</router-link>
              <router-link to="/coupon">優惠券</router-link>
            </ul>
          </div>

        </div>

        <div class="col-2 cart">
          <a href="" @click.prevent="isCartShow = !isCartShow">
            <i class="fas fa-shopping-cart"></i>購物車
          </a>
        </div>

      </div>
    </div>

    <!-- alert -->
    <Alert></Alert>

    <!-- cart -->
    <div class="card cart-box" style="width: 320px;" v-if="isCartShow" @blur="isCartShow = false">
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
            <tr v-for="(item, key) in cart.carts" :key='item.id' v-if="cart.carts">
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
          </tbody>
        </table>
        <div class="d-flex justify-content-between align-items-baseline mt-4">
          <div class="text-muted text-nowrap mr-3">
            總計 <strong>{{cart.final_total | currencyFilter}}</strong> 元
          </div>
          <router-link to="/ordercheck" class="btn btn-primary" :ordercart="cart">
            結帳去
          </router-link>
        </div>
      </div>
    </div>

    <!-- content -->
    <div id="content">
        <router-view @shopaddcart="addcart"></router-view>
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
    <a href="#header" id="go-top"><i class="fas fa-chevron-up"></i></a>

  </div>
</template>

<script>
  import Alert from './Alert';
  export default {
    data() {
      return {
        cart: {},
        isLoading: false,
        isCartShow: false
      }
    },
    methods: {
      getCart() {
        const api = `https://vue-course-api.hexschool.io/api/albeehsiao/cart`;
        const vm = this;
        vm.isLoading = true;
        this.$http.get(api).then((response) => {
          // console.log(response.data);
          vm.cart = response.data.data;
          vm.isLoading = false;
        });
      },
      delCart(id) {
        const vm = this;
        const api = `https://vue-course-api.hexschool.io/api/albeehsiao/cart/${id}`;
        vm.isLoading = true;
        this.$http.delete(api).then((response) => {
          console.log(response.data);
          vm.isLoading = false;
          vm.getCart();
        });
      },
      addcart(id, qty) {
        const vm = this;
        const api = `https://vue-course-api.hexschool.io/api/albeehsiao/cart`;
        let cart = {
         product_id: id,
         qty
        }
        this.$http.post(api, {data: cart}).then((response) => {
          console.log(response.data);
          if(response.data.success) {
            this.$bus.$emit('messsage:push', response.data.message, 'success');
          }else {
            this.$bus.$emit('messsage:push', response.data.message, 'danger');
          }
        });
      }
    },
    created() {
      this.getCart();
    },
    watch: {
      cart: function() {
        this.getCart();
      }
    },
    components: {
      Alert
    }
  }
</script>