<template>
  <ion-page>   
        <div class="container text-center">
            <h1 class="bg-light py-4 text-info">Product Manage</h1>
        </div>
        
        <!-- <div class="d-flex justify-content-center">
            <form class="w-50">
                <input type="file" id="newProductImage" class="box" placeholder="Product Image" accept="image/*" multiple>
                <input type="text" id="newProductName" class="form-control" placeholder="Product Name" autocomplete="off" >
                <div class="row">
                    <div class="col">
                        <input type="text" id="newProductType" class="form-control m-0" placeholder="Type" autocomplete="off">
                    </div>
                    <div class="col">
                        <input type="text" v-model="newProductPrice" id="newProductPrice" class="form-control m-0" placeholder="Price" autocomplete="off">
                    </div>
                </div>
            </form>
        </div>
        <div class="d-flex justify-content-center">
            <button class="btn btn-success" @click="addNewProduct()" id="btn-create">Create</button>
        </div> -->
        <div class="container">
             <button @click="changeDisplay(true)" type="button" class="ab-t-r mr-3 btn btn-primary">Add new</button>
        </div> 

        <div class="container" >
            <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Price</th>
                    <th scope="col" colspan="2" style="text-align:center">Action</th>
                  </tr>
                </thead>
                <tbody >
                  <tr v-for="product in products" :key="product.id">
                    <td><img id="theImage" :src="product.picture"></td>
                    <td>{{product.name}}</td>
                    <td v-if="product.category_id==1">Đồ uống</td>
                    <td v-if="product.category_id==2">Thức ăn</td>
                    <td>{{product.price}}</td>
                    <td class="btnedit" style="text-align:center"><button @click="changeDisplay(true); changeProduct(product)" type="button" class="btn btn-primary">Edit</button></td>
                    <td class="btndelete" style="text-align:center"><button @click="deleteProduct(product.id)" type="button" class="btn btn-danger">Delete</button></td>
                  </tr>                  
                </tbody>
              </table>
        <FormHandleProduct :product="willChange" @close="changeDisplay" v-if="isDisplay" />      
        </div>
  </ion-page>      
</template>

<script>
import {mapActions, mapState} from 'vuex';
import FormHandleProduct from "../components/FormHandleProduct.vue";

export default {
  name: 'ManageShop',
  components: {
    FormHandleProduct
  },
  data() {
    return {
      isDisplay: false,
      willChange: {},
    }
  },
  created() {
    this.$store.dispatch("products/getProducts")
  },
  computed: {
    ...mapState("products", ["products"]),
  },
  methods: {
  ...mapActions("products", ["getProducts", "deleteProduct"]),
  changeProduct(product) {
      this.willChange = product
      console.log(this.willChange)
    },
  changeDisplay(value){
      this.willChange = {}
      this.isDisplay = value
    },    
   },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #theImage {
      display: block;
      max-width:106px;
      max-height:95px;
      width: auto;
      height: auto;
  }
  .d-flex input {
      margin: .9em 0em;
  }

  .d-flex button {
      margin: 1.5em .6em;
      padding: .3em 2.4em;
  }

  .container table {
      margin: 1em 3em;
  }

  table .btnedit {
      color: lightgreen;
      cursor: pointer;
  }

  table .btndelete {
      color: red;
      cursor: pointer;
  }
</style>