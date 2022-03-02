<template>
<ion-page>
    <div class="split left">
  <router-link to="Order In Place">       
  <div class="centered"> 
    <h2>Tại chỗ</h2>
  </div>
  </router-link>
</div>

<div class="split right">
  <router-link to="Order Take Away">  
  <div class="centered">
    <h2>Mang về</h2>
  </div>
  </router-link>
</div>
</ion-page>    
</template>

<script>
export default {
    name: 'ManageOrder',
    // setup() { 
    // },
}
</script>

<style scoped>
.split {
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}

/* Control the left side */
.left {
  left: 0;
}

/* Control the right side */
.right {
  right: 0;
}

/* If you want the content centered horizontally and vertically */
.centered {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
    padding: 170px 0;
   box-shadow: 2px 2px 5px 5px lightblue;
}

/* Style the image inside the centered container, if needed */
.centered img {
  width: 150px;
  border-radius: 50%;
}
</style>