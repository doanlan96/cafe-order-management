<template>
<div>
    <button type="button" class="backbtn" @click="goBackAndDeleteLastestOrder(); close();">Trở lại</button>
</div>
<div style="display:flex">
       <!-- section de chia man hinh ra 2 phan left & right -->
       <section class="left">
           <!--        search bar        -->
            <div class="search">
                <div class="s-title">
                    <h3>Menu</h3>
                </div>
                <div class="s-title">
                    <div class="searchContainer">
                        <div class="fa fa-search searchIcon"></div>
                        <input id="searchbox" class="searchbar" type="text" v-model="searchWordd" required>
                    </div>
                </div>
            </div>
            <!--        danh muc san pham    -->
            <div class="menuContainer">
                <form class="form">
                    <!-- Cac nut sort -->
                    <div class="btnMenu">
                        <button class="form__button" @click.prevent="categoryProducts('')">Tất cả</button>
                        <button class="form__button" @click.prevent="categoryProducts('Trà')">Trà</button>
                        <button class="form__button" @click.prevent="categoryProducts('Sữa chua')">Sữa chua</button>                        
                        <button class="form__button" @click.prevent="categoryProducts('Đồ uống nóng')">Đồ uống nóng</button>
                        <button class="form__button" @click.prevent="categoryProducts('Nước hoa quả')">Nước hoa quả</button>
                        <button class="form__button" @click.prevent="categoryProducts('Cafe')">Cafe</button>
                        <button class="form__button" @click.prevent="categoryProducts('Trà sữa')">Trà sữa</button>
                        <button class="form__button" @click.prevent="categoryProducts('Đồ ăn vặt')">Đồ ăn vặt</button>
                    </div>
                    <!-- section liet ke product -->
                    <div class="menu" v-if="filteredProducts.length > 0">
                        <!-- product 1 -->
                        <div class="table" v-for="product in filteredProducts" :key="product.id">
                            <div class="tableContainer" @click="addProductToListOrderItems(product)">
                                <div class="image">
                                    <img :src="product.picture" style="max-height:137.88px;">
                                </div>
                                <div class="p-detail">
                                    <h3 id="p-name">{{product.name}}</h3>
                                    <h3 id="p-price">{{product.price}}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: center; font-size: 25px;  " v-else>
                        Không có món nào thỏa mãn điều kiện !
                    </div>   
                </form>
            </div>
        </section>
        <!-- section ben phai   -->
        <section class="right">
            <div class = "tMenu">
                <!-- The ten cua table -->
                <div class = "tableTag" style="width: 100px;">
                    <div class="fa-solid fa-xmark btndelete"></div>
                    <h4>{{table.table_name}}</h4>
                </div>

                <!-- order -->
                <div class="order">
                    <div class="table">
                        <!--        order 1      -->
                        <div class="row" v-for="order_item in order_items" :key="order_item.name">
                            <div class="fa-solid fa-trash-can deleteIcon" type="button" @click="removeOrderItemfromListOrderItems(order_item)"></div>
                            <div class="td">{{order_item.name}}</div>
                            <div class="td">
                                <div class="flex-w bo5 of-hidden m-l-r-auto w-size17">
                                    <button
                                        class="btn-num-product-down color1 flex-c-m size7 bg8 eff2"
                                    @click="changeQuantity(order_item,'minus')"
                                    >
                                    <i class="fs-12 fa fa-minus" aria-hidden="true"></i>
                                    </button>

                                    <input
                                        class="size8 m-text18 t-center num-product"
                                        type="number"
                                        name="num-product1"
                                        v-model="order_item.quantity"
                                        style="width:30%;"
                                    />

                                    <button
                                        class="btn-num-product-up color1 flex-c-m size7 bg8 eff2"
                                        @click="changeQuantity(order_item,'plus')"                                        
                                    >
                                    <i class="fs-12 fa fa-plus" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="td" style="font-size: 20px;">{{order_item.price}}</div> 
                        </div>


                    </div>
                        <!-- phan thanh toan -->
                        <div class="footer">
                            <div class="sum">
                                <h4>Tổng tiền</h4>
                                <!-- <input id="tong" type="text" class="m-sum" :value="order_items" disabled> -->
                                <h5 class="money">{{subTotal}}</h5>
                            </div>
                            <div class="payment" v-if="order_items.length > 0">
                                <button class="pay" @click="changeDisplayConfirmModal(true)">Tạo bàn</button>
                            </div>
                        </div>
                </div>
            </div>
        </section>

                    <ConfirmOrderInTableModal :order_items="order_items" 
                                          :payment_method="payment_method" 
                                          :table="table" 
                                          :subTotal="subTotal" 
                                          @close="changeDisplayConfirmModal" v-if="isDisplayConfirmModal" />   

</div>        
</template>

<script>
import {mapActions, mapState} from 'vuex';
import ConfirmOrderInTableModal from "../components/ConfirmOrderInTableModal.vue";

export default {
    name: "OrderChooseDishes",
    components: {
        ConfirmOrderInTableModal
    },
    data() {
        return {
            isDisplayConfirmModal: false, 
            order_items : [],
            customer_pay: 0,
            payment_method: ''            
        }
    },
    created() {
        this.$store.dispatch("products/getProducts")
        this.$store.dispatch("orders/getLastestOrder")
    },
    props: ['table'],
    computed: {
        ...mapState("products", ["products", "clonedProducts", "searchWord"]),
        ...mapState("orders", ["order", "lastest_order"]),
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
        },
        subTotal() {
            let subTotal = 0;
            for (let i = 0; i < this.order_items.length; i++) {
                subTotal += this.order_items[i].price * this.order_items[i].quantity;
            }
            return subTotal;
        },
        moneyReturned() {
            let money_returned = 0;
            money_returned = this.customer_pay - this.subTotal;
            if (money_returned < 0) {
                money_returned = 0;
            }
            return money_returned;
        }        
    },
    methods: {
        ...mapActions("products", ["getProducts"]),
        ...mapActions("tables", ["updateTable"]),        
        ...mapActions("orders", ["createOrder", "createOrderItem", "getLastestOrder", "deleteLastestOrder", "updateOrder"]),
        changeDisplayConfirmModal(value) {
            this.isDisplayConfirmModal = value
        },
        changePaymentMethod(method) {
            if (method === "cash") {
                this.payment_method = "cash";
            } else if (method === "bank") {
                this.payment_method = "bank";
                this.customer_pay = this.subTotal;
            }
        },        
        goBackAndDeleteLastestOrder() {
            this.deleteLastestOrder(this.order.id);  
        },         
        close: function () {
        this.$emit("close", false)
        },
        addProductToListOrderItems(product) {
            let order_item = {
                product_id : product.id,
                name : product.name,
                quantity: 1,
                price: product.price
            };
            this.order_items = [order_item, ...this.order_items];
        },
        changeQuantity(order_item, operator) {
            if (operator === "minus") {
                if (order_item.quantity > 0) {
                    order_item.quantity -= 1 ;
                } else {
                    this.removeOrderItemfromListOrderItems(order_item);
                }
            } else if (operator === "plus") {
                order_item.quantity += 1;
            }
        },
        removeOrderItemfromListOrderItems(order_itemm) {
            const index = this.order_items.findIndex(order_item => order_item.name === order_itemm.name)
            this.order_items.splice(index, 1)            
        },
        categoryProducts(value) {
            this.$store.commit('products/CATEGORY_PRODUCT', value)
        },        
    }
}
</script>

<style scoped>
/* section search */
.search {
    background-color: white;
    border: 1px solid black;
    display: flex;    
    flex-wrap: wrap;
    justify-content: space-around;

}

body {
    background-color: #e9e6e6;
    margin-right: 0;
}

.backbtn {
    padding: 0.5rem 1.5rem;
    margin: 10px;
    background-color: white;
    border: 1px solid #8d8d8d94;
    border-radius: 5px;
    cursor: pointer;
}

.backbtn:hover {
    background-color: #2dd36f;
    color: white;
}

/*  Text "Menu"     */
 .s-title{
    display: flex;
    align-items: center;
    padding: 0 1rem;
 } 
/*      search bar area     */
 .searchContainer {
    display: flex;
    flex: 1 1 300px;
    position: relative;
    border: 1px solid #c9c4c4;
    border-radius: 10px;
    overflow: hidden;
    width: 400px;
  }

  .searchContainer:hover {
      border-color: #000000;
  }

  /* edit search icon */
  .searchIcon {
    padding: 0.5rem;
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

/*    layout chung cua 2 man hinh   */
  .container {
      height: 100vh;
      display: flex;
  }
/*      edit 2 man hinh      */
  section {
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
  }

  section .right{
      margin: 0;
  }

  .menuContainer {
      /* display: block; */
  }

  form {
      /* display: inline-table; */
  }
       /*      sector cua button      */
  .btnMenu {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 1rem;
  }
        /*      Cac nut sort     */
  .form__button {
      padding: 0.5rem 1.5rem;
      margin: 10px;
      background-color: white;
      border: 1px solid #8d8d8d94;
      border-radius: 5px;
      cursor: pointer;
  }

  .form__button:hover {
      background-color: #44d574;
      color: white;
  }
        /*      layout display product     */
  .menu {
    display: grid;
    grid-gap: 20px;
    margin: auto;
    grid-template-columns: auto auto auto auto;
  }
   
  .table {
      padding: 1rem;
  }
        /*   product specs    */
  .tableContainer {
      /* border: 1px solid black;
      background-color: #f1f1f1; */
      display: table-cell; 
      width: 150px;
      text-align: center;
      cursor: pointer;
      margin: 1.5em;
  }

  .tableContainer:hover {
      border: 1px groove red;
      background-color: white; 
  }

  .image {
      /* padding-top: 1rem; */
  }
        /*   size img truyen vao    */
  img {
      width: 100%;
      height: 100%;
  }
        /*     product name      */
  #p-name {
      margin: 0;
      text-align: left;
      font-size: medium;
      font-family: Futara, sans-serif;
  }
        /*     product price      */
  #p-price {
      margin: 0;
      text-align: left;
      font-size: medium;
      font-family: Futara, sans-serif;
      color: #00c000;
  }
        /*        layout section ben phai       */
  .tMenu {
    margin-left: 1rem;
    border: 0.5px solid #b0a9a9bf;
    background-color: white;
    height: 100%;
    /* display: inline-flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start; */
  }
        /*        layout the ten cua table      */
  .tableTag {
      border-bottom: 1px groove white;
      border-right: 1px groove white;
      display: inline-flex;
      flex-direction: row-reverse;
      align-items: center;
      height: 5%;
      box-shadow: 3px 2px #cdcdcd;
  }

          /*        icon delete - x     */
  .btndelete {
      padding: 0.5rem 0.2rem 0.5rem 1rem;
      font-size: small;
      cursor: pointer;
  }

        /*        icon them tag "+"     */
  .add {
    display: inline-flex;
    font-size: small;
    padding-left: 0.3rem;
}
        /*        layout muc order      */
  .order {
    display: flex;
    padding-top: 1rem;
    width: 100%;
    flex-direction: column;
  }

  .table {
      display: table;
  }
        /*        layout each order       */
  .table .row{
      display: grid;
      grid-gap: 20px;
      margin: auto;
      grid-template-columns: [first] 40px [line2] 200px [line3] auto [col4-start] 100px [end];
      border: 0.5px solid #cbcbcb;
      align-items: center;
  }
        /*        layout data trong order       */
  .table .td{
      display: table-cell;
      padding: 0.5rem;
  }
        /*        edit product name in order      */
  .td:nth-child(2) {
      padding-left: 1.5rem;
      font-size: 18px;
  }
        /*        edit checkbox      */
  .checkbox {
    transform: scale(1.2);
    cursor: pointer;
  }
        /*        input so luong + price     */
  .quantity {
    display: flex;
    justify-content: flex-end;
  }
        /*        edit length cua input box      */
  .number {
      width: 25%;
  }
        /*        icon delete -  trashbin      */
  .deleteIcon {
    display: table-cell;
    padding: 0.6rem;
    color: red;
    cursor: pointer;
  }
        /*        section thanh toan      */
  .footer {
      display: flex;
      border-top: 5px solid black;
      flex-wrap: wrap;
      justify-content: flex-end;
      /* bottom: 0;
      right: 0;
      position: absolute;
      width: 40%;
      height: 30%;
      align-items: flex-end;
      flex-direction: column;
      margin-bottom: 3rem; */
  }

  .footer::after {
      content: '';
      display: block;
      position: absolute;
      width: 100px;
      top: -5px;
      border: 5px solid white;
  }
        /*        layout cua "Tong tien"     */
  .sum {
      display: inline-flex;
      align-items: center;
      /* padding: 0 2rem 5rem 2rem; 
      width: 60%;
      height: 30%;
      flex-direction: row;
      flex-wrap: nowrap; */
  }
        /*        layout 2 button thanh toan - bill      */
  .payment {
    display: inline-grid;
    margin-bottom: 1rem;
    width: 100%;
    justify-items: center;
  }
        /*        edit input box tong tien     */
  .m-sum {
      width: 18px;
      height: 18px;
      font-size: 14px;
      margin: 2rem 2rem 2rem 0.5rem;
  }
        /*        layout button chung cua thanh toan - bill     */
  .payment button {
      font-size: large;
      width: 160px;
      margin: 1rem;
      padding: 0.5rem 1rem;
  }
        /*        bill button      */
  .bill {
      background-color: #fc8484;
      cursor: pointer;
  }
        /*      button thanh toan        */
  .pay {
      background-color: #91dee0;
      cursor: pointer;
  }
  
  .pay:hover {
      background-color: #44d574;
      color: white;
      }

        /*        icon bill      */
  .billIcon {
      margin-right: 0.5rem;
  }
        /*        edit h3 chung      */
  h3 {
      font-family: Franklin Gothic Medium, sans-serif;
      font-size: 20px;
  }
        /*        edit h4 chung      */
  h4 {
      font-family: Franklin Gothic Medium, sans-serif;
      padding-left: 0.5rem;
      color: #0239ef;
      margin-top: 0.5rem;
  }
        /*        edit h5 chung      */
  h5 {
      font-size: 22px;
      padding: 1rem 1rem 1.5rem 1rem;
  }
        /*        edit text "Tong tien"      */
  .sum h4 {
      font-size: 22px;
      margin: 1rem 0 1rem 1rem;
      padding: 0.5rem;
  }
</style>