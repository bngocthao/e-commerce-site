<template>
  <div class="grid-wrap">
    <ProductGridItem
      v-for="product in products"
      :key="product.id"
      :product="product" />
  </div>
</template>
<script>
import ProductGridItem from "@/components/ProductsGridItem.vue";
export default {
  name: 'ProductGrid',
  props: ['products'],
  components: {ProductGridItem}
}
</script>

<style scoped>
.grid-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 50px;
  margin-left: 200px;
  margin-right: 200px;
}


</style>