<template>
  <div id="myModal" class="modal">
    <div class="modal-content">     
    <div id="printMe" class="page" size="A5">
        <div class="top-section">
            <div class="address">
                <div class="addresss-content">
                    <h2>Tiệm trà chanh T-hi</h2>
                    <p>13 Nguyễn Chí Thanh, Đống Đa, Hà Nội, Việt Nam</p>
                </div>
            </div>

        </div>
    
        <div class="billing-invoice">
            <div class="title">
                THÔNG TIN ORDER
            </div>
            <div class="des">
                <p class="code">Số HĐ: {{order.id}}</p>
                <p class="date">Tạo vào: <span>{{order.day_month_year}}</span></p>
                <p class="date">Giờ vào: <span>{{order.time_in}}</span></p>
                <p class="date">Giờ ra: <span>{{order.time_out}}</span></p>                                
            </div>
        </div>

        <div class="billing-detail">
            <div class="title">Chi tiết đơn</div>
                <!-- <div class="billed-sec">
                    <div class="emp-detail">
                        Thu ngân
                    </div>
                    <p>Tên: {{user.full_name}}</p>
                    <p>Ca:</p>
                </div> -->

                <div class="billed-sec">
                    <div class="sub-title" v-show="order.form==='takeaway'">Loại đơn: Mang về</div>
                    <div class="sub-title" v-show="order.form==='in place'">Loại đơn: Tại chỗ</div>
                    <!-- <div class="seat-detail">Khu vực: Trong nhà/Ngoài sân</div> -->
                    <div class="seat-detail" v-show="order.form==='takeaway'">Bàn số: Bàn 0</div>
                    <div class="seat-detail" v-show="order.form==='in place'">Bàn số: Bàn {{order.table_id}}</div>
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
                    <th>{{order_item.product_name}}
                    </th>
                    <th>{{order_item.quantity}}      
                    </th>
                    <th>{{order_item.product_price}}                     
                    </th>
                    <th>{{(order_item.quantity * order_item.product_price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}}                       
                    </th>  
                </tr>
            </table>
        </div>

        <div class="total">
            <div class="title">
                Thành tiền: 
            </div>
            <div class="des">
                <p class="money">{{order.sum.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}}</p>
            </div>
        </div>
        
        <div class="final-total">
            <div class="title">
                Tổng tiền: 
                <p class="charge">+ Thanh toán:</p>
                <p class="charge">+ Tiền trả lại:</p>
                Phương thức:
            </div>
            <div class="des">
                {{order.sum.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}}
                <p class="money-charge">{{order.customer_pay.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}}</p>
                <p class="money-charge">{{order.money_returned.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}}</p>
                {{order.payment_method}}
            </div>
        </div>

    </div>      

      <!-- Form with button to submit -->
      <div class="row">
        <div class="col-12">
          <div class="container">
            <Form >
              <div style="margin-top: 20px" class="button row m-t-30" >
                <div class="col-6">
                  <button class="btn btn-outline-secondary" @click="close()" style="width: 100%;">Trở lại</button>
                </div>
                <div class="col-6">
                  <button class="btn btn-outline-success" @click.prevent="close(); print();" style="width: 100%;">In hóa đơn</button>
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
// import { Form, } from "vee-validate";
import { mapActions, mapMutations } from 'vuex';

export default {
  name: "OrderDetailModal",
//   components:{
//     Form,
//   },
//   created() {
//         this.$store.dispatch("orders/getLastestOrder")
//         this.getUserExists();    
//   },
  props: ['order_items', 'order'],
  methods: {
    ...mapActions("orders", ["getOrderItemsByOrderID"]),
            ...mapMutations("orders", ["DELETE_ORDER_ITEMS_LISTBACK"]),      
    close: function () {
      this.DELETE_ORDER_ITEMS_LISTBACK();
      this.$emit("close", false)
    },
    print() {
        this.$htmlToPaper('printMe')
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