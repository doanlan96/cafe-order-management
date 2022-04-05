<template>
  <div id="myModal" class="modal">
    <div class="modal-content">
      <!-- <h1>Thông tin Order: </h1>
      <p v-for="order_item in order_items" :key="order_item.name">{{order_item.name}} || {{order_item.quantity}} || {{order_item.price}}</p>
      <p>{{payment_method}}</p>
      <p>{{subTotal}}</p>
      <p>{{customer_pay}}</p>
      <p>{{moneyReturned}}</p>                  -->
      
    <button class="btn btn-outline-secondary" @click="getOrderItemsByOrderID(order_in_table.id)" style="margin-left: auto; margin-right: auto;">Hiển thị món của bàn</button>

                        <div class="btnMenu">
                                <button class="form__button" @click="changePaymentMethod('cash')" style="width: 30%;">Tiền mặt</button>
                                <button class="form__button" @click="changePaymentMethod('bank')" style="width: 30%;">Chuyển khoản</button>
                            </div>
                        <!-- phan thanh toan -->
                        <div class="footer">
                            <!-- <div class="sum">
                                <h4>Tong tien</h4>
                                <h5 class="money">{{subTotal}}</h5>
                            </div> -->
                            <div v-show="payment_method==='cash'">
                                <h4> Tiền khách đưa </h4>
                                <div class="searchContainer">
                                    <input id="searchbox" class="searchbar" type="number" v-model.number="customer_pay" required>
                                </div>                                  
                            </div>    
                        </div>

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
                HÓA ĐƠN THANH TOÁN
            </div>
            <div class="des">
                <p class="code">Số HĐ: {{order_in_table.id}}</p>
                <p class="date">Tạo vào: <span>{{order_in_table.day_month_year}}</span></p>
                <p class="date">Giờ vào: <span>{{order_in_table.time_in}}</span></p>
                <p class="date">Giờ ra: <span>{{order_in_table.time_out}}</span></p>                                
            </div>
        </div>

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
                    <div class="seat-detail">Bàn số: {{table_to_confirm.table_name}}</div>
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
                <tr v-for="order_item in order_items_listback" :key="order_item.name">
                    <th>{{order_item.product_name}}</th>
                    <th>{{order_item.quantity}}</th>
                    <th>{{order_item.product_price}}</th>
                    <th>{{order_item.quantity * order_item.product_price}}</th>
                </tr>
            </table>
        </div>

        <div class="total">
            <div class="title">
                Thành tiền: 
            </div>
            <div class="des">
                <p class="money">{{order_in_table.sum}}</p>
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
                {{order_in_table.sum}}
                <p class="money-charge">{{customer_pay}}</p>
                <p class="money-charge">{{moneyReturned}}</p>
                {{payment_method}}
            </div>
        </div>

        <div class="bottom-section">
            <p>----------------------------------------------------------</p>
            <p>Cảm ơn Quý Khách!</p>
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
                <!-- <div class="col-6" v-show="customer_pay < order_in_table.sum"> 
                  <button class="btn btn-outline-danger" style="width: 100%;">Xác nhận và in HĐ</button>
                </div> -->
                <div class="col-6" v-show="customer_pay >= order_in_table.sum"> 
                  <button class="btn btn-outline-success" @click.prevent="close(); print(); submitUpdateTable(); submitUpdateOrder(); $router.go(-1);" style="width: 100%;">Xác nhận và in HĐ</button>
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
  name: "ConfirmOrderPayModal",
  data() {
        return {          
            order_items : [],
            customer_pay: 0,
            payment_method: ''
        }
  },
  components:{
    Form,
  },
  created() {
        this.getUserExists();
        // this.getOrderItemsByOrderID(this.order_in_table.id);    
  },
  props: ['table_to_confirm', 'order_in_table'],
  computed: {
        ...mapState("orders", ["order_items_listback"]),
        ...mapState("users", ["user"]),
        ...mapState("products", ["product"]),
        moneyReturned() {
            let money_returned = 0;
            money_returned = this.customer_pay - this.order_in_table.sum;
            if (money_returned < 0) {
                money_returned = 0;
            }
            return money_returned;
        },
  },
  methods: {
    ...mapActions("orders", ["createOrderItem", "updateOrder", "getOrderItemsByOrderID"]),
    ...mapMutations("users", ["getUserExists"]),
    ...mapMutations("orders", ["DELETE_ORDER_ITEMS_LISTBACK"]),
    ...mapActions("tables", ["updateTable"]),
    ...mapActions("products", ["getProduct"]),    
    close() {
      this.DELETE_ORDER_ITEMS_LISTBACK();
      this.$emit("close", false);
    },
    print() {
        this.$htmlToPaper('printMe')
    },
    changePaymentMethod(method) {
        if (method === "cash") {
            this.payment_method = "cash";
        } else if (method === "bank") {
            this.payment_method = "bank";
            this.customer_pay = this.order_in_table.sum;
        }
    },    
    submitUpdateOrder() { 
            const updated_order = {
                form : this.order_in_table.form,
                time_in: this.order_in_table.time_in,
                day_month_year: this.order_in_table.day_month_year,
                table_id: this.order_in_table.table_id,
                sum: this.order_in_table.sum,
                customer_pay: this.customer_pay,
                money_returned: this.moneyReturned,
                user_id: this.order_in_table.user_id,
                payment_method: this.payment_method,
                state: "paid"
            };
            this.updateOrder({id: this.order_in_table.id, order: updated_order});
    },
    submitUpdateTable() { 
        const updated_table = {
            table_name : this.table_to_confirm.table_name,
            status : "empty"
        };
        this.updateTable({id: this.table_to_confirm.id, table: updated_table});
    }    
  }
}
</script>

<style scoped>
  .btnMenu {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 1rem;
  }
        /*      Cac nut sort     */
  .form__button {
      padding: 0.2rem 1rem;
      margin: 10px;
      background-color: white;
      border: 1px solid #8d8d8d94;
      border-radius: 4px;
      cursor: pointer;
  }

 .searchContainer {
    display: flex;
    flex: 1 1 300px;
    position: relative;
    border: 1px solid #c9c4c4;
    border-radius: 10px;
    overflow: hidden;
    width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .searchContainer:hover {
      border-color: #000000;
  }

  /*      search bar      */
  #searchbox {
    width: 100%;
    border: none;
    border-radius: 0px 10px 10px 0px;
    outline: none;
    font-size: 16px;
  }
  
  input[type="number"] {
      background: transparent;
      border-top: none;
      border-right: none;
      border-left: none;
      outline: none;
      font-size: 16px;
      text-align: right;
  }
/* Hide number arrow */
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

.button {
  display: flex;
  justify-content: space-between;
}
[type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled), button:not(:disabled) {
  border-radius: 10px;
  cursor: pointer;
  height: 50px;
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