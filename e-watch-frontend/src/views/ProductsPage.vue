
<template>
  <div id="page-wrap">
    <product-grid :products="products" />
  </div>
</template>

<script>
import axios from 'axios'
import ProductGrid from "@/components/ProductsGrids.vue";

export default {
  name: 'ProductsPage',
  components: {ProductGrid},
  data() {
    return {
      products: [],
    }
  },
  async setup() {
    const result = await axios.get('http://localhost:8000/api/products')
    const products = result.data
    this.products = products
  },
  // mounted() {
  //   axios.get('http://localhost:8000/api/products')
  //        .then(response => this.products = response.data)
  // }

}
</script>


