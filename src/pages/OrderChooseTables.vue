<template>
    <template v-if="!isDisplayChooseDishes">
   <!--     section search bar     -->
    <div class = "search">
        <div class = "s-title">
            <h3>Bàn</h3>
        </div>
    </div>
   <!--     section chon ban`     -->
    <div class="container">
           <!--     text bar     -->
        <div class="place">
            <h3 class="location">Ngoài sân</h3>
        </div>

           <!--     layout      -->
        <div class="tb">
               <!--     table 1    -->
            <div class="table" v-for="table in tables.slice(1, 9)" :key="table.id">
                   <!--     content trong 1 table     -->
                <div class="tableContainer" type="button" v-if="table.status==='full'" style="background-color: #f1f1f1;" @click="changeDisplayConfirmPayModal(true); changeTableToConfirm(table); getOrderByTableIDWithState(table.id);">
                    <div class="icon">
                        <i class="fa-solid fa-store storeIcon fa-5x"></i>
                    </div>
                    <!--     table number    -->
                    <div class="tableNum">
                        <h3>{{table.table_name}}</h3>
                    </div>
                </div>                   
                <div class="tableContainer" type="button" @click="changeDisplay(true); changeTable(table); submitOrder(table);" v-else>
                    <div class="icon">
                        <i class="fa-solid fa-store storeIcon fa-5x"></i>
                    </div>
                    <!--     table number    -->
                    <div class="tableNum">
                        <h3>{{table.table_name}}</h3>
                    </div>
                </div>
            </div>
        </div>

        <div class="place">
            <h3 class="location2">Trong nhà</h3>
        </div>
        <div class="tb">
            <div class="table" v-for="table in tables.slice(9, 13)" :key="table.id">
                <div class="tableContainer" type="button" v-if="table.status==='full'" style="background-color: #f1f1f1;" @click="changeDisplayConfirmPayModal(true); changeTableToConfirm(table); getOrderByTableIDWithState(table.id);">
                    <div class="icon">
                        <i class="fa-solid fa-store storeIcon fa-5x"></i>
                    </div>
                    <!--     table number    -->
                    <div class="tableNum">
                        <h3>{{table.table_name}}</h3>
                    </div>
                </div>                   
                <div class="tableContainer" type="button" @click="changeDisplay(true); changeTable(table); submitOrder(table);" v-else>
                    <div class="icon">
                        <i class="fa-solid fa-store storeIcon fa-5x"></i>
                    </div>
                    <!--     table number    -->
                    <div class="tableNum">
                        <h3>{{table.table_name}}</h3>
                    </div>
                </div>
            </div>
    </div>
    </div>
    </template>

        <OrderChooseDishes :table="table" @close="changeDisplay" v-else/>
        <ConfirmOrderInTablePayModal :table_to_confirm="table_to_confirm" :order_in_table="order_in_table" @close="changeDisplayConfirmPayModal" v-if="isDisplayConfirmPayModal"/>   
</template>

<script>
import {mapActions, mapState} from 'vuex';
import OrderChooseDishes from './OrderChooseDishes.vue';
import ConfirmOrderInTablePayModal from "../components/ConfirmOrderInTablePayModal.vue";

export default {
    name: "OrderChooseTables",
    components: {
        OrderChooseDishes,
        ConfirmOrderInTablePayModal
    },
    data() {
        return {
            isDisplayChooseDishes: false,
            isDisplayConfirmPayModal: false,
            table: {},
            table_to_confirm: {}
        }
    },
    created() {
        this.$store.dispatch("tables/getTables")
    },
    computed: {
        ...mapState("tables", ["tables"]),
        ...mapState("orders", ["order_in_table"])
    },
    methods: {
        ...mapActions("tables", ["getTables", "getTable"]),
        ...mapActions("orders", ["createOrder", "getOrderByTableIDWithState"]),        
        changeDisplay(value) {
            this.table = {}
            this.isDisplayChooseDishes = value            
        },
        changeDisplayConfirmPayModal(value) {
            this.table_to_confirm = {}
            this.isDisplayConfirmPayModal = value
        },        
        changeTable(table) {
            this.table = table
        },
        changeTableToConfirm(table) {
            this.table_to_confirm = table;
        },
        submitOrder(table) {
            let user = JSON.parse(localStorage.getItem("User Infor"));
            const order_to_submit = {
                form: "in place",
                table_id : table.id,
                user_id : user.id,
                payment_method: "cash",
                state : "not paid"
            };
            this.createOrder(order_to_submit);          
        },        
    }

}
</script>

<style scoped>
        /*       section search bar       */
.search {
    background-color: white;
    border: 1px solid black;
    display: inline-flex;  
    width: 100%;  
    justify-content: space-around;
    /* flex-wrap: wrap; */

}

body {
    background-color: #e9e6e6;
}
        /*       text       */
 .s-title{
    display: flex;
    align-items: center;
    padding: 0 1rem;
 } 
        /*       search bar container      */
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
        /*       edit text box       */
  input[type="text"] {
    width: 100%;
    border: none;
    border-radius: 0px 10px 10px 0px;
    outline: none;
    font-size: 16px;
  }
        /*      edit search icon       */
  .searchIcon {
    padding: 0.5rem;
  }
          /*       container cua chon ban`      */
  .container {
      display: grid;
      width: 50%;
      margin: 0 auto;
      justify-content: center;
  } 

        /*       edit space cua textbar "Ngoai san" - "Trong nha"       */
  .place {
      text-align: center;
      padding: 2rem 0;
 
  }
        /*       edit content bar "Ngoai san" - "Trong nha"      */
  .location {
      padding: 0.8rem 0;
      background-color: #44d574;
      margin: 0 auto;
      color: white;
      width: 60%;
  }
        /*       edit content bar "Ngoai san" - "Trong nha"      */  
  .location2 {
      padding: 0.8rem 0;
      background-color: #0ea830d9;
      margin: 0 auto;
      color: white;
      width: 60%;
  }
        /*       layout chon ban`     */  
  /* .tb {
      display: flex;
      margin: auto;
      flex-wrap: wrap;
      justify-content: space-evenly;
  } */
  .tb {
      display: grid;
      grid-gap: 20px;
      margin: auto;
      /* margin-left: -80px; */
      grid-template-columns: auto auto auto auto;
  }
        /*       edit khung chua 1 ban`      */  
  .table {
      padding: 1.5rem;
  }
        /*       edit content 1 ban`      */  
  .tableContainer {
      border: 1px solid black;
      display: table-cell; 
      width: 190px;
      height: 190px;
      text-align: center;
      background-color: white;
      cursor: pointer;
      margin: 1.5em;
  }

  .tableNum {
      margin-top: 1rem;
  }

  .tableContainer:hover {
      background-color: #f1f1f1;
  }
        /*       icon cua ban`      */  
  .icon {
      padding-top: 1rem;
  }
        /*       edit h3 chung      */  
  h3 {
      font-family: Franklin Gothic Medium, sans-serif;
      font-size: 22px;
  }


</style>