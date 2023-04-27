<!--đây sẽ chứa shopping cart-->
<template>
<!--  // vì dùng component iterate từng item nên phải vào component để lấy id item-->
<!--  // khi load hàm emit, btn hiện lên,gọi event bên productlistitem khi ấn vào gọi event chứa hàm remove-->
<!--  //from cart và truyền tham số cho nó-->
  <div v-if="cartItems.length > 0">
      <ProductsListItem
      v-for="product in cartItems"
      v-on:remove-from-cart="$emit('remove-from-cart', $event)"
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
  components: {ProductsListItem},
}
</script>

<style scoped>


</style>






