<template>
<div>
    <button type="button" class="backbtn" @click="goBackAndDeleteLastestOrder(); $router.go(-1);">Trở lại</button>
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
                        <input id="searchbox" class="searchbar" type="text" placeholder="Tìm kiếm sản phẩm theo tên..." v-model="searchWordd" required />
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
                            <div class="tableContainer" @click="addProductToListOrderItems(product); changeDisplayToppingModal(true);">
                            <!-- <div class="tableContainer" @click="changeDisplayToppingModal(true); changeOrderItem(product);">     -->
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
                <div class = "tableTag" style="width: 120px;">
                    <div class="fa-solid fa-xmark btndelete"></div>
                    <h4>Mang về</h4>
                </div>

                <!-- order -->
                <div class="order">
                    <div class="table">
                        <!--        order 1      -->
                        <div class="row" v-for="order_item in order_items" :key="order_item.name">
                            <div class="fa-solid fa-trash-can deleteIcon" type="button" @click="removeOrderItemfromListOrderItems(order_item)" style="top: 0px;"></div>
                            <div class="td">{{order_item.name}}
                                <div v-for="topping in order_item.toppings" :key="topping.name" style="font-size: 13px; margin-top: 10px;">
                                    <div class="fa-solid fa-plus fa-xs"></div> {{topping.name}}
                                </div>    
                            </div>
                            <div class="td" style="top: 0px;">
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
                            <div class="td" style="font-size: 20px;">{{order_item.price * order_item.quantity}}
                                <div v-for="topping in order_item.toppings" :key="topping.name" style="font-size: 13px; margin-top: 10px;">
                                    {{topping.price * order_item.quantity}}
                                </div>                                 
                            </div> 

                            <!-- <div></div>
                            <div class="td">
                                <div class="fa-solid fa-plus fa-xs"></div>Tra Chanh</div>
                                <div class="td" style="font-size: 20px;">{{order_item.price}}</div>   -->
                        </div>


                            <div class="btnMenu">
                                <button class="form__button" @click="changePaymentMethod('cash')">Tiền mặt</button>
                                <button class="form__button" @click="changePaymentMethod('bank')">Chuyển khoản</button>
                            </div>
                        <!-- phan thanh toan -->
 

                    </div>
                        <div class="footer">
                            <div class="sum">
                                <h4>Tổng tiền</h4>
                                <!-- <input id="tong" type="text" class="m-sum" :value="order_items" disabled> -->
                                <h5 class="money">{{subTotal}}</h5>
                            </div>
                            <div class="p-method" v-show="payment_method==='cash'">
                                <div class="c-pay">
                                    <h4> Tiền khách đưa </h4>
                                    <div class="searchContainer">
                                        <input id="searchbox" class="searchbar" type="number" v-model.number="customer_pay" required>
                                    </div> 
                                </div>
                                <div class="remainer">   
                                    <h4> Tiền trả lại</h4>
                                    <input id="searchbox" class="searchbar" type="number" v-model="moneyReturned" disabled>      
                                </div>                
                            </div>    
                            <div class="payment" v-show="payment_method!=='' && customer_pay >= subTotal">
                                <!-- <button class="bill"><i class="fa-solid fa-receipt billIcon"></i>In hoa don</button> -->
                                <button class="pay" @click="changeDisplayConfirmModal(true)">Thanh toán</button>
                            </div>
                        </div>
                </div>
            </div>
        </section>

                    <ConfirmOrderPayModal :order_items="order_items" 
                                          :payment_method="payment_method" 
                                          :customer_pay="customer_pay" 
                                          :subTotal="subTotal" 
                                          :moneyReturned="moneyReturned" 
                                          @close="changeDisplayConfirmModal" v-if="isDisplayConfirmModal" />  
                                          
                    <ChooseToppingModal   @addTopping="addToppingToOrderItems"
                                          @close="changeDisplayToppingModal" v-if="isDisplayToppingModal" />                                             

</div> 
</template>

<script>
import {mapActions, mapState} from 'vuex';
import ConfirmOrderPayModal from "../components/ConfirmOrderPayModal.vue";
import ChooseToppingModal from "../components/ChooseToppingModal.vue";

export default {
    name: "OrderTakeAway",
    components: {
        ConfirmOrderPayModal,
        ChooseToppingModal
    },
    data() {
        return {
            isDisplayConfirmModal: false,
            isDisplayToppingModal: false,            
            order_items : [],
            customer_pay: 0,
            payment_method: ''
            // money_returned: 0
        }
    },
    created() {
        this.$store.dispatch("products/getProducts")         
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
            let totalTopping = 0;
            for (let i = 0; i < this.order_items.length; i++) {
                        if(this.order_items[i].toppings) {                   
                            for (let j = 0; j < this.order_items[i].toppings.length; j++) {
                                    totalTopping += this.order_items[i].toppings[j].price * this.order_items[i].quantity;
                            }
                        }
                subTotal += this.order_items[i].price * this.order_items[i].quantity;
            }
            return subTotal + totalTopping;
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
        ...mapActions("products", ["getProducts", "filteringProducts"]),
        ...mapActions("orders", ["createOrder", "createOrderItem", "getLastestOrder", "deleteLastestOrder", "updateOrder"]),
        changeDisplayConfirmModal(value) {
            this.isDisplayConfirmModal = value
        },
        changeDisplayToppingModal(value) {
            this.isDisplayToppingModal = value
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
        addProductToListOrderItems(product) {
                let order_item = {
                    product_id : product.id,
                    name : product.name,
                    quantity: 1,
                    price: product.price,
                    toppings: []
                };
                this.order_items = [order_item, ...this.order_items];
            
        },
        addToppingToOrderItems(toppings) {
           let last_order_item = this.order_items[0];
           last_order_item.toppings = toppings;
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
    text-align: center;
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
      grid-column-gap: 20px;
      grid-row-gap: 0;
      margin: auto;
      grid-template-columns: [first] 40px [line2] 200px [line3] auto [col4-start] 100px [end];
      border: 0.5px solid #cbcbcb;
      align-items: center;
  }
        /*        layout data trong order       */
  .table .td{
      display: table-cell;
      padding-bottom: 0.5rem; 
  }
        /*        edit product name in order      */
  .td:nth-child(2) {
      padding-left: 1.5rem;
      padding-top: 0.5rem;
      font-size: 18px;
  }

  .td:nth-child(4n+2):not(:nth-child(2)) {
      display: flex;
      padding-left: 1.5rem;
      align-items: center;
      font-size: small;
      justify-content: center;
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
      display: grid;
      border-top: 5px solid black;
      /* flex-wrap: wrap;
      justify-content: flex-end; */
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
      justify-content: flex-end;
      align-items: center;
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
  
  .p-method {
      display: inline;
    }

    .p-method h4 {
        text-align: center;
    }

    .c-pay {
        display: grid;
        justify-items: center;
    }

    .searchbar {
        display: inline;
    }

    .remainer {
        display: inline;
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
      font-family: Trebuchet MS, sans-serif;
      font-weight: 600;
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