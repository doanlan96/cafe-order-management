<template>
  <div id="myModal" class="modal">
    <div class="modal-content">
      <h1>Bạn chắc chắn chứ ?</h1>
      <p>Xóa sản phẩm khỏi hệ thống của cửa hàng!</p>
      <div class="row">
        <div class="col-12">
          <div class="container">
            <Form >
              <div style="margin-top: 20px" class="button row m-t-30" >
                <div class="col-6">
                  <button class="btn btn-outline-secondary" @click="close()">Trở lại</button>
                </div>
                <div class="col-6">
                  <button class="btn btn-outline-danger" @click.prevent="close(); deleteProduct(product_id)">Xóa</button>
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
import { Form, } from "vee-validate";
import {mapActions} from 'vuex';

export default {
  name: "ConfirmDeleteModal",
  components:{
    Form,
  },
  props: ['product_id'],
  methods: {
    ...mapActions("products", ["deleteProduct"]),  
    close: function () {
      this.$emit("close", false)
    },

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
  width: 60%;
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
  width: 40%;
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