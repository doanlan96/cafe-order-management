<template>
  <div id="myModal" class="modal">
    <div class="modal-content">
      <h1>{{product.id ? currentProduct.name : 'Thêm sản phẩm mới'}}</h1>
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
                    placeholder="Tên món"
                    class="sizefull s-text7 p-l-22 p-r-22"
                />
              </div>
              <ErrorMessage name="name" class="fs-18 text-danger d-block" />

              <div class="bo4 of-hidden size15 m-b-5">
                <Field
                    v-model="currentProduct.picture"
                    name="picture"
                    type="text"
                    placeholder="Ảnh"
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
                        placeholder="Giá"
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
                      { value: '4', label: 'Trà' },
                      { value: '5', label: 'Sữa chua' },
                      { value: '6', label: 'Đồ uống nóng' },
                      { value: '7', label: 'Nước hoa quả' },
                      { value: '8', label: 'Cafe' },
                      { value: '9', label: 'Đồ ăn vặt' },
                      { value: '10', label: 'Trà sữa' },
                    ]"
                      @change="categoryUpdate"
                      :value="currentProduct.currentCategory"
                  />
                </div>
              </div>
              <div style="margin-top: 20px" class="button row m-t-30" >
                <div class="col-6">
                  <button class="btn btn-outline-secondary" @click="close()">Trở lại</button>
                </div>
                <div class="col-6">
                  <button class="btn btn-outline-success" @click.prevent="submit()">Gửi</button>
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
      if (this.product.category_id === 4) {
        this.currentProduct.currentCategory = { value: "4", label: 'Trà' }
      } else if (this.product.category_id === 5) {
        this.currentProduct.currentCategory =  { value: "5", label: 'Sữa chua' }
      } else if (this.product.category_id === 6) {
        this.currentProduct.currentCategory =  { value: "6", label: 'Đồ uống nóng' }
      } else if (this.product.category_id === 7) {
        this.currentProduct.currentCategory =  { value: "7", label: 'Nước hoa quả' }
      } else if (this.product.category_id === 8) {
        this.currentProduct.currentCategory =  { value: "8", label: 'Cafe' }
      } else if (this.product.category_id === 9) {
        this.currentProduct.currentCategory =  { value: "9", label: 'Đồ ăn vặt' }
      } else if (this.product.category_id === 10) {
        this.currentProduct.currentCategory =  { value: "10", label: 'Trà sữa' }
      }
  },
  props: ['product'],
  data() {
    const schema = yup.object().shape({
      name: yup
          .string()
          .required("Tên món là bắt buộc"),
      picture: yup
          .string()
          .required("Ảnh là bắt buộc"),
      price: yup
          .number()
          .positive("Giá tiền phải là số dương")
          .required("Giá là bắt buộc"),
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