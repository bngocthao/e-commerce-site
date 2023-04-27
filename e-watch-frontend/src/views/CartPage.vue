<template>
  <div id="page-wrap">
    <h1>Shopping Cart</h1>
    <ProductsList
        :cartItems="cartItems"
        v-on:remove-from-cart=removeFromCart($event)
    />
    <h3 id="total-price">${{ totalPrice }}</h3>
    <button id="chechout-button">Proceed to Checkout</button>
  </div>
</template>

<script>
import axios from "axios";
import ProductsList from "@/components/ProductsList.vue";
export default {
  name: 'CardPage',
  components: {ProductsList},
  data() {
    return {
      cartItems: [],
    }
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce(
          (sum, item) => sum + Number(item.price),
          0,
      );
    }
  },
  methods: {
    async removeFromCart(productId){
      const result = await axios.delete(`/api/users/12345/cart/${productId}`)
      this.cartItems = result.data
    }
  },
  async created() {
    const result = await axios.get(`/api/users/12345/cart`)
    const cartItems = result.data
    this.cartItems = cartItems
  }
}
</script>

<style scoped>
  h1 {
  border-bottom: 1px solid black;
  margin: 0;
  margin-top: 16px;
  padding: 16px;
}

  #total-price {
    padding: 16px;
    text-align: right;
  }

  #chechout-button {
    width: 100%;
  }

  #page-wrap{
    margin-left: 250px;
    margin-right: 250px;
  }
</style>