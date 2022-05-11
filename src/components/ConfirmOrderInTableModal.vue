<template>
  <div id="myModal" class="modal">
    <div class="modal-content">

    <div class="page" size="A5">
        <div class="top-section">
            <div class="address">
                <div class="addresss-content">
                    <h2>Tiệm trà chanh T-hi</h2>
                    <p>13 Nguyễn Chí Thanh, Đống Đa, Hà Nội, Việt Nam</p>
                </div>
            </div>

        </div>
    
        <!-- <div class="billing-invoice">
            <div class="title">
                HÓA ĐƠN THANH TOÁN
            </div>
            <div class="des">
                <p class="code">Số HĐ: {{lastest_order.id}}</p>
                <p class="date">Tạo vào: <span>{{lastest_order.day_month_year}}</span></p>
                <p class="date">Giờ vào: <span>{{lastest_order.time_in}}</span></p>
                <p class="date">Giờ ra: <span>{{lastest_order.time_out}}</span></p>                                
            </div>
        </div> -->

        <div class="billing-detail">
            <div class="title">Chi tiết đơn</div>
                <div class="billed-sec">
                    <div class="emp-detail">
                        Thu ngân
                    </div>
                    <p>Tên: {{user.full_name}}</p>
                    <p>Ca:</p>
                </div>

                <div class="billed-sec">
                    <div class="sub-title">Loại đơn: Tại chỗ</div>
                    <div class="seat-detail">Khu vực: Trong nhà/Ngoài sân</div>
                    <div class="seat-detail">Bàn số: {{table.table_name}}</div>
                </div>
        </div>

        <div class="invoice-table">
            <table>
                <tr>
                    <th>Tên món</th>
                    <th>SL</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                </tr>
                <tr v-for="order_item in order_items" :key="order_item.name">
                    <th>{{order_item.name}}</th>
                    <th>{{order_item.quantity}}</th>
                    <th>{{order_item.price}}</th>
                    <th>{{(order_item.quantity * order_item.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}}</th>
                </tr>
            </table>
        </div>

        <div class="total">
            <div class="title">
                Thành tiền: 
            </div>
            <div class="des">
                <p class="money">{{subTotal.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}}</p>
            </div>
        </div>
        

    </div>


      <div class="row">
        <div class="col-12">
          <div class="container">
            <Form >
              <div style="margin-top: 20px" class="button row m-t-30" >
                <div class="col-6">
                  <button class="btn btn-outline-secondary" @click="close()">Trở lại</button>
                </div>
                <div class="col-6">
                  <button class="btn btn-outline-success" @click.prevent="close(); submitUpdateTable(); submitOrderItems(); submitUpdateOrder(); $router.go(-1);">Xác nhận tạo bàn</button>
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
import {mapActions, mapState, mapMutations} from 'vuex';

export default {
  name: "ConfirmOrderInTableModal",
  components:{
    Form,
  },
  created() {
        this.$store.dispatch("orders/getLastestOrder")      
        this.getUserExists();    
  },  
  props: ['order_items', 'payment_method', 'subTotal', 'table'],
  computed: {
        ...mapState("orders", ["lastest_order"]),      
        ...mapState("users", ["user"]), 
  },
  methods: {
    ...mapActions("orders", ["createOrderItem", "updateOrder", "getLastestOrder"]),
    ...mapActions("tables", ["updateTable"]),
    ...mapMutations("users", ["getUserExists"]),      
    close: function () {
      this.$emit("close", false)
    },
    submitOrderItems() {           
           for (let i = 0; i < this.order_items.length; i++) {
                const order_item_to_submit = {
                    orderid : this.lastest_order.id,
                    product_id : this.order_items[i].product_id,
                    product_name: this.order_items[i].name,
                    product_price: this.order_items[i].price,                    
                    quantity : this.order_items[i].quantity
                };
                this.createOrderItem(order_item_to_submit);
           }
    },
    submitUpdateOrder() { 
            const updated_order = {
                form : this.lastest_order.form,
                time_in: this.lastest_order.time_in,
                day_month_year: this.lastest_order.day_month_year,
                table_id: this.lastest_order.table_id,
                sum: this.subTotal,
                customer_pay: 0,
                money_returned: 0,
                user_id: this.lastest_order.user_id,
                payment_method: this.lastest_order.payment_method,
                state: "not paid"
            };
            this.updateOrder({id: this.lastest_order.id, order: updated_order});
    },
    submitUpdateTable() { 
        const updated_table = {
            table_name : this.table.table_name,
            status : "full"
        };
        this.updateTable({id: this.table.id, table: updated_table});
    }     
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

h2, h4, p {
    margin: 0;
}

.page {
    background: #fff;
    display: block;
    margin: 3rem auto 3rem auto;
    position: relative;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.page[size="A4"] {
    width: 21cm;
    height: 29.7cm;
    overflow-x: hidden;
}

.top-section {
    padding: 20px;
    height: 115px;
}

.top-section h2 {
    font-size: 42px;
    margin-bottom: 10px;
    font-weight: 400;
}

.top-section address {
    width: 50%;
    height: 100%;
    float: left;
}

.top-section address {
    max-width: 275px;
}

.billing-invoice {
    padding: 20px;
    margin-bottom: 15px;
}

.billing-invoice .title {
    font-size: 24px;
    font-weight: bold;
    float: left;
}

.billing-invoice .des {
    float: right;
}

.billing-invoice .code {
    font-size: 18px;
    text-align: right; 
}

.billing-invoice .date {
    text-align: right; 
    font-size: 12px;
}

.billing-detail {
    padding: 20px;
    margin-top: 40px;
}

.billing-detail .title {
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 7px;
}

.billing-detail .billed-sec {
    width: 50%;
    float: left;
    font-size: 18px;
    margin-bottom:25px;
}

.billing-detail .sub-title, 
.billing-detail .emp-detail {
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 5px;
}

.billing-detail .seat-detail {
    font-size: 18px;
    max-width: 300px;
}

.invoice-table {
    padding: 0 20px;
}

.invoice-table table tr:first-child {
    color: #fff;
    background-color: #616161;
    text-align: center;
}

.invoice-table tr th:nth-child(5), 
.invoice-table tr td:nth-child(5){
    text-align: right;
}

.invoice-table table {
    width: 100%;
}

.invoice-table table, th, td {
    padding: 5px;
}

.invoice-table tr th {
    font-weight: 200;
    font-size: 18px;
}

.total, .final-total {
    margin-bottom: -30px;
    padding: 30px;
}

.total .title,
.final-total .title {
    font-size: 18px;
    font-weight: bold;
    float: left;
}
.final-total .title .charge {
    font-weight: normal;
}

.total .money,
.final-total .money,
.final-total .des,
.final-total .des .money-charge {
    font-size: 18px;
    text-align: right; 
}


.bottom-section {
    margin-top: 100px;
    text-align: center;
    bottom: 0; 
    left: 0;
    right: 0;
}

</style>