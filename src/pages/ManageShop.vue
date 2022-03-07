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
                    <td class="btndelete" style="text-align:center"><button @click="changeDisplayConfirmModal(true); changeProductIDToDelete(product.id)" type="button" class="btn btn-danger">Delete</button></td>
                  </tr>                  
                </tbody>
              </table>
        <FormHandleProduct :product="willChange" @close="changeDisplay" v-if="isDisplay" />
        <ConfirmDeleteModal :product_id="product_id_to_del" @close="changeDisplayConfirmModal" v-if="isDisplayConfirmModal" />          

        </div>    
  </ion-page>      
</template>

<script>
import {mapActions, mapState} from 'vuex';
import FormHandleProduct from "../components/FormHandleProduct.vue";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.vue";

export default {
  name: 'ManageShop',
  components: {
    FormHandleProduct,
    ConfirmDeleteModal
  },
  data() {
    return {
      isDisplay: false,
      isDisplayConfirmModal: false,
      willChange: {},
      product_id_to_del: ''
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
    },  
  changeDisplay(value){
      this.willChange = {}
      this.isDisplay = value
  },
  changeProductIDToDelete(id) {
    this.product_id_to_del = id
  },
  changeDisplayConfirmModal(value) {
    this.product_id_to_del = ''
    this.isDisplayConfirmModal = value
  }      
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

.modal-confirm {		
	color: #636363;
	width: 400px;
}
.modal-confirm .modal-content {
	padding: 20px;
	border-radius: 5px;
	border: none;
	text-align: center;
	font-size: 14px;
}
.modal-confirm .modal-header {
	border-bottom: none;   
	position: relative;
}
.modal-confirm h4 {
	text-align: center;
	font-size: 26px;
	margin: 30px 0 -10px;
}
.modal-confirm .close {
	position: absolute;
	top: -5px;
	right: -2px;
}
.modal-confirm .modal-body {
	color: #999;
}
.modal-confirm .modal-footer {
	border: none;
	text-align: center;		
	border-radius: 5px;
	font-size: 13px;
	padding: 10px 15px 25px;
}
.modal-confirm .modal-footer a {
	color: #999;
}		
.modal-confirm .icon-box {
	width: 80px;
	height: 80px;
	margin: 0 auto;
	border-radius: 50%;
	z-index: 9;
	text-align: center;
	border: 3px solid #f15e5e;
}
.modal-confirm .icon-box i {
	color: #f15e5e;
	font-size: 46px;
	display: inline-block;
	margin-top: 13px;
}
.modal-confirm .btn, .modal-confirm .btn:active {
	color: #fff;
	border-radius: 4px;
	background: #60c7c1;
	text-decoration: none;
	transition: all 0.4s;
	line-height: normal;
	min-width: 120px;
	border: none;
	min-height: 40px;
	border-radius: 3px;
	margin: 0 5px;
}
.modal-confirm .btn-secondary {
	background: #c1c1c1;
}
.modal-confirm .btn-secondary:hover, .modal-confirm .btn-secondary:focus {
	background: #a8a8a8;
}
.modal-confirm .btn-danger {
	background: #f15e5e;
}
.modal-confirm .btn-danger:hover, .modal-confirm .btn-danger:focus {
	background: #ee3535;
}
.trigger-btn {
	display: inline-block;
	margin: 100px auto;
}  
</style>