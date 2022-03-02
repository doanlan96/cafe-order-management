<template>
  <ion-page>   
        <div class="container text-center">
            <h1 class="bg-light py-4 text-info">Product Manage</h1>
        </div>
        
        <div class="d-flex justify-content-center">
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
    <!--Create, update, read and delete button-->
        <div class="d-flex justify-content-center">
            <button class="btn btn-success" @click="addNewProduct()" id="btn-create">Create</button>
        </div>

        <div class="container" style="margin-left: -50px;">
            <table class="table">
                <thead>
                  <tr>
                    <!-- <th scope="col">ID</th> -->
                    <th scope="col">Image</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Price</th>
                    <th scope="col" colspan="2" style="text-align:center">Edit</th>
                    <!-- <th scope="col">Delete</th> -->
                  </tr>
                </thead>
                <tbody  v-for="item in products" :key="item.id">
                  <tr>
                    <!-- <th colspan="1" scope="row">{{item.id}}</th> -->
                    <td><img id="theImage" :src="'https://cdn.tgdd.vn/2021/03/CookProduct/Bac-xiu-la-gi-nguon-goc-va-cach-lam-bac-xiu-thom-ngon-don-gian-tai-nha-0-1200x676.jpg'"></td>
                    <td>{{item.name}}</td>
                    <td v-if="item.category_id==1">Đồ uống</td>
                    <td v-if="item.category_id==2">Thức ăn</td>
                    <td>{{item.price}}</td>
                    <td class="btnedit" style="text-align:center"><button type="button" class="btn btn-primary">Edit</button></td>
                    <td class="btndelete" @click="deleteProduct(item.id)" style="text-align:center"><button type="button" class="btn btn-danger">Delete</button></td>
                  </tr>
                  
                </tbody>
              </table>
        </div>
  </ion-page>      
</template>

<script>
import axios from 'axios'

const baseURL = "http://localhost:8080/api/v1/products"
const imageURL = "http://localhost:8080"

export default {
  name: 'ManageShop',
  data() {
    return {
      products: []
    }
  },
  async created() {
    try {
      const result = await axios.get(baseURL);
      this.products = result.data.content
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async addNewProduct() {
      let bodyFormData = new FormData();
      let picture = document.getElementById("newProductImage").files[0];
      let name = document.getElementById("newProductName").value;
      let price = document.getElementById("newProductPrice").value;
      let type = document.getElementById("newProductType").value;
      let category_id;
      if (type == "Đồ uống") {
        category_id = 1;
      }
      bodyFormData.append("name", name);
      bodyFormData.append("picture", picture);
      bodyFormData.append("price", price);
      bodyFormData.append("category_id", category_id);
      console.log(bodyFormData);
      try {
      const res = await axios.post(baseURL, bodyFormData, {withCredentials: false})
      console.log(res)
      let product = {};
      product.name = name;
      product.picture = picture;
      product.price = price;
      product.category_id = category_id;
      this.products.push(product);
    } catch (e) {
      console.log(e)
    }
    },
    async deleteProduct(id) {
      try {
      const res = await axios.delete(baseURL + "/" + id, {withCredentials: false})
      console.log(res)
      const productIndex = this.products.findIndex(p => p.id === id)
      this.products.splice(productIndex, 1)
      alert("Product deleted");
      } catch (e) {
      console.log(e)
      }
    },
    async getPicture(link) {
      try {
      const res = await axios.get(imageURL + "/" + link, {withCredentials: false})
      // console.log(res.data)
      return res.data;
      } catch (e) {
      console.log(e)
      }  
    }
   }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #theImage {
      display: block;
      max-width:300px;
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