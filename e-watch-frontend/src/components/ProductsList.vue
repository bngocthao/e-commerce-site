<!--đây sẽ chứa shopping cart-->
<template>
  <div v-if="cartItems.length > 0">
      <ProductsListItem
      v-for="product in cartItems"
      :key="product.id"
      :product="product" />
  </div>
  <p v-else>You haven't add anything to cart yet</p>
</template>

<script>
import ProductsListItem from "@/components/ProductListItem.vue";

export default {
  name: 'ProductsList',
  props: ['cartItems'],
  components: {ProductsListItem}
}
</script>

<style>

</style>






