<!--đây sẽ chứa shopping cart item-->
<template>
  <div class="product-container">
    <img class="product-image" :src="product.imageUrl" />
    <div class="detail-wrap">
      <h3>{{product.name}}</h3>
      <p>${{ product.price }}</p>
    </div>
<!--    // khi ấn vào remove hàm emit sẽ làm cái btn hiện lên, gọi hàm remove from cart và truyền tham số cho nó-->
    <button
        class="remove-button"
        v-on:click="$emit('remove-from-cart', product.id)"
    >Remove From Cart</button>
  </div>
</template>

<script>
export default {
  name: 'ProductsListItem',
  props: ['product'],
}

</script>

<style scoped>
.product-container {
  align-content: center;
  border-bottom: 1px solid #ddd;
  display: flex;
  padding: 16px;
  width: 100%;

}

.product-image {
  flex: 1;
  height: 100px;
  max-width: 100px;
}

.detail-wrap {
  padding: 0 16px;
  flex: 3;
}

.product-image {
  flex: 1;
  margin: auto;
}
</style>

