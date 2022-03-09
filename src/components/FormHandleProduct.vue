<template>
  <div id="myModal" class="modal">
    <div class="modal-content">
      <h1>{{product.id ? currentProduct.name : 'Add new product'}}</h1>
      <div class="row">
        <div class="col-4">
          <div class="profile-img">
            <h4>{{currentProduct.picture ? '' :'Product\'s picture'}}</h4>
            <img :src="currentProduct.picture" alt=""/>
          </div>
        </div>
        <div class="col-8">
          <div class="container">
            <Form :validation-schema="schema">
              <div  class="bo4 of-hidden size15 m-b-5">
                <Field
                    v-model="currentProduct.name"
                    name="name"
                    type="text"
                    placeholder="Product's name"
                    class="sizefull s-text7 p-l-22 p-r-22"
                />
              </div>
              <ErrorMessage name="name" class="fs-18 text-danger d-block" />

              <div class="bo4 of-hidden size15 m-b-5">
                <Field
                    v-model="currentProduct.picture"
                    name="picture"
                    type="text"
                    placeholder="Product's picture"
                    class="sizefull s-text7 p-l-22 p-r-22"
                />
              </div>
              <ErrorMessage name="picture" class="fs-18 text-danger d-block" />
              <div class="row">
                <div class="col-6">
                  <div class="bo4 of-hidden size15 m-b-5">
                    <Field
                        v-model="currentProduct.price"
                        name="price"
                        type="number"
                        placeholder="Product's price"
                        class="sizefull s-text7 p-l-22 p-r-22"
                    />
                  </div>
                  <ErrorMessage name="price" class="fs-18 text-danger d-block" />
                </div>
              </div>
              <div class="row m-b-5">
                <div class="col-4">
                  <Select
                      :options="[
                      { value: '1', label: 'Đồ uống' },
                      { value: '2', label: 'Thức ăn' },
                    ]"
                      @change="categoryUpdate"
                      :value="currentProduct.currentCategory"
                  />
                </div>
              </div>
              <div style="margin-top: 20px" class="button row m-t-30" >
                <div class="col-6">
                  <button class="btn btn-outline-secondary" @click="close()">Back</button>
                </div>
                <div class="col-6">
                  <button class="btn btn-outline-success" @click.prevent="submit()">Submit</button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>


    </div>

  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Select from "./Select";
import {mapActions} from "vuex";

export default {
  name: "FormHandleProduct",
  components:{
    Form,
    Field,
    ErrorMessage,
    Select
  },
  mounted() {
      if (this.product.category_id === 1) {
        this.currentProduct.currentCategory = { value: "1", label: 'Đồ uống' }
      } else if (this.product.category_id === 2) {
        this.currentProduct.currentCategory =  { value: "2", label: 'Thức ăn' }
      }
  },
  props: ['product'],
  data() {
    const schema = yup.object().shape({
      name: yup
          .string()
          .required("Product's name is required"),
      picture: yup
          .string()
          .required("Product's picture is required"),
      price: yup
          .number()
          .required("Product's price is required"),
    })
    return {
      schema,
      currentProduct: {
        name: this.product.name || '',
        price: this.product.price || 0 ,
        picture: this.product.picture || '',
        currentCategory: { value: '1', label: 'Đồ uống' },
      },
    }
  },
  methods: {
    ...mapActions("products", ["createProduct", "getProducts", "updateProduct"])
    ,
    submit() {
      const productSubmitted = {
        name: this.currentProduct.name,
        price: this.currentProduct.price,
        picture: this.currentProduct.picture,
        category_id: this.currentProduct.currentCategory.value,
      }
      if (this.product.id) {
        if (productSubmitted.name != '' && productSubmitted.price != '' && productSubmitted.picture != '') {
        this.updateProduct({id: this.product.id, product: productSubmitted})
        this.close();
        }
      } else {
        if (productSubmitted.name != '' && productSubmitted.price != '' && productSubmitted.picture != '') {
        this.createProduct(productSubmitted)
        this.close();
        }
      }
    },
    close: function () {
      this.$emit("close", false)
    },
    categoryUpdate(value) {
      this.currentProduct.currentCategory = value
    },
    // brandUpdate(value) {
    //   this.currentBrand.currentBrand = value
    // },
    // statusUpdate(value) {
    //   this.currentStatus.currentStatus = value
    // }

  }
}
</script>

<style scoped>
.button {
  display: flex;
  justify-content: space-between;
}
[type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled), button:not(:disabled) {
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  width: 40%;
}
.modal {
  text-align: center;
  font-size: 20px;
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.bo4 {
  display: flex;
  border: 0.5px solid #aaaaaa;
  border-radius: 5px;
}
.sizefull {
  border: none;
  width: 100%;
  margin: 10px;
}
</style>