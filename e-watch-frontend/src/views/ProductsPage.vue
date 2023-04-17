<template>
  <div id="page-wrap">
    <product-grid :products="products" />
  </div>
</template>

<script>
import {products} from "@/fake-data";
import ProductGrid from "@/components/ProductsGrids.vue";

export default {
  name: 'ProductsPage',
  components: {ProductGrid},
  data() {
    return {
      products,
    }
  }
}
</script>


