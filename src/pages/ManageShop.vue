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

      <!-- filter components -->
        <div class="filter">
        <div class="sorter">
          <form action="/action_page.php">
            <label for="cars">Sort products:</label>
            <select name="sorts" id="sorts" @change="sortProducts($event.target.value)">
              <option value="">---Sort---</option>
              <option value="upward">Price: Low to High</option>
              <option value="downward">Price: High to Low</option>
              <option value="nameup">Name: A -> Z</option>
              <option value="namedown">Name: Z -> A</option>
            </select>
          </form>
        </div>
        <div class="searcher">
          <form action="/action_page.php">
            <label for="productss">Danh mục:</label>
            <select name="categories" id="categories" @change="categoryProducts($event.target.value)">
              <option value="">---Chọn danh mục---</option>
              <option value="Đồ uống">Đồ uống</option>
              <option value="Thức ăn">Thức ăn</option>
            </select>
          </form>
        </div>
        
            <div class="search">
              <a
                class="button"
                id="searchIcon"
                data-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <strong
                  ><i class="fa fa-search" style="font-size: 33px"></i
                ></strong>
              </a>
            </div>  
      </div>

      <div class="collapse" id="collapseExample">
      <!-- <label class="header">Tìm kiếm sản phẩm theo tên... </label> -->
      <div class="wrap">
        <div class="search">
          <input
            type="text"
            class="searchTerm"
            placeholder="Type to search for products..."
            v-model="searchWordd" required
          />
        </div>
      </div>
    </div>

    <!-- Table list -->
        <div class="container" v-if="filteredProducts.length > 0">
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
                  <tr v-for="product in filteredProducts" :key="product.id">
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

        <div class="container" style="text-align: center; font-size: 30px;  " v-else>
          No item matched
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
    ...mapState("products", ["products", "clonedProducts", "searchWord"]),
    filteredProducts () {
      let a = (this.clonedProducts || this.products)
      return a
    },
    searchWordd: {
      get () {
        return this.searchWord
      },
      set (value) {
        this.$store.dispatch('products/filteringProducts', value)
      }
    }    
  },
  methods: {
  ...mapActions("products", ["getProducts", "deleteProduct", "filteringProducts"]),
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
  },
  sortProducts(value) {
    this.$store.commit('products/SORT_PRODUCT', value)
  },
  categoryProducts(value) {
    this.$store.commit('products/CATEGORY_PRODUCT', value)
  },      
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.filter {
  padding-top: 30px;
  margin: 0 auto;
  max-width: 80%;
}

.collapse {
  margin: auto;
  max-width: 80%;
  height: 10%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f4fab9;
}
.search {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}
.searchTerm {
  width: 100%;
  border: 3px solid #d88d00;
  padding: 5px;
  height: 40px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9dbfaf;
}
.searchButton {
  width: 40px;
  height: 40px;
  border: 1px solid #d88d00;
  background: #d88d00;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}

/*Resize the wrap to see the search bar change!*/
.wrap {
  // margin-top: 30px;
  width: 30%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
  .events {
    margin-top: 100px;
    text-align: center;
  }
  .filter {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 30px;
  }


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

  // .container table {
  //     margin: 1em 3em;
  // }

  table .btnedit {
      color: lightgreen;
      cursor: pointer;
  }

  table .btndelete {
      color: red;
      cursor: pointer;
  }

.trigger-btn {
	display: inline-block;
	margin: 100px auto;
}  
</style>