<template>
  <div id="page-wrap">
    <h1>Shopping Cart</h1>
    <ProductsList :cartItems="cartItems" />
    <h3 id="total-price">${{ totalPrice }}</h3>
    <button id="chechout-button">Proceed to Checkout</button>
  </div>
</template>

<script>
import {cartItems} from "@/fake-data";
import ProductsList from "@/components/ProductsList.vue";
export default {
  name: 'CardPage',
  components: {ProductsList},
  data() {
    return {
      cartItems,
    }
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce(
          (sum, item) => sum + Number(item.price),
          0,
      );
    }
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

</style>