<template>
  <div id="nav-bar">
    <router-link to="/products" id="product-link">
      <h1>ELITE WATCH</h1>
    </router-link>
    <router-link to="/cart" id="cart-link">
      <button>Shopping Cart</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
  #nav-bar {
    border-bottom: 1px solid #ddd;
    height: 75px;
    width: 100%;
  }

  #product-link {
    text-align: center;
    display: block;
    color: black;
    font-size: 22px;
    left: 32px;
    position: absolute;
    top: 16px;
    text-decoration: none;
  }

  #product-link h1 {
    margin: 0;
  }

  #cart-link {
    position: absolute;
    right: 16px;
    top: 16px;
  }
</style>