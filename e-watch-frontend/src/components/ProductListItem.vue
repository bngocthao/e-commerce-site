<!--đây sẽ chứa shopping cart item-->
<template>
  <div class="product-container">
    <img class="product-image" :src="product.imageUrl" />
    <div class="detail-wrap">
      <h3>{{product.name}}</h3>
      <p>${{ product.price }}</p>
    </div>
    <button class="remove-button">Remove From Cart</button>
  </div>
</template>

<script>
export default {
  name: 'ProductsListItem',
  props: ['product'],
}

</script>

<style scopedyyy>
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

