<template>
  <div id="page-wrap" v-if="product">
    <div id="img-wrap">
      <img v-bind:src="product[0].imageUrl" />
    </div>
    <div id="product-details">
      <h1>{{product[0].name}}</h1>
      <h3 id="price">${{product[0].price}}</h3>
      <p>Average rating: {{product[0].averageRating}}</p>
      <button id="add-to-cart"
              v-if="!showSuccessMessage"
              v-on:click="addToCart">
        Add to Cart</button>
      <button id="add-to-cart"
              class="green-button"
              v-if="showSuccessMessage">
        Item successfully add to cart</button>
      <h4>Description</h4>
      <p>{{product[0].description}}</p>
    </div>
  </div>
  <NotFoundPage v-else/>
</template>

<script>
import axios from "axios";
import NotFoundPage from "@/views/NotFoundPage.vue";
export default {
  name: 'ProductsDetailPage',
  components: {NotFoundPage},
  data() {
    return {
      // lấy single product trong array product nên để trong ngoặc nhọn
      product: {},
      // set thông báo khi thêm vào giỏ hàng thành công
      showSuccessMessage: false,
    }
  },
  methods: {
    async addToCart(){
      await axios.post('/api/users/12345/cart',{
        productId: this.$route.params.id,
      })
      this.showSuccessMessage = true
          //send user to product page after add product to cart after some time (mili second)
      setTimeout(() => {
        this.$router.push('/products')
      }, 1500)
    }
  },
  async created(){
    const result = await axios.get(`/api/products/${this.$route.params.id}`)
    const product = result.data
    this.product = product
    // console.log(product)
  }
}
</script>

<style scoped>
  #page-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
    margin-left: 380px;
  }

  #img-wrap {
    text-align: center;
  }

  #product-details {
    padding: 16px;
    position: relative;
  }

  #add-to-cart {
    width: 100%;
  }

  #price {
    position: absolute;
    top: 24px;
    right: 16px;
  }

  img {
    height: 500px;
    width: 500px;
  }

  .green-button{
    background-color: green;
  }

</style>