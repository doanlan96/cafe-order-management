<template>
<div id="printMe" class="page" size="A5">
<div class="reportContainer">
       <section class="left">
           <div class="r-place">
               <div class="place" @click="changeButtonStatus(); formOrders('')" v-show="!clicked">Tất cả</div>
               <div class="place1" @click="changeButtonStatus(); formOrders('')" v-show="clicked">Tất cả</div>
               <div class="place" @click="changeButtonStatus1(); formOrders('in place')" v-show="!clicked1">Tại chỗ</div>
               <div class="place1" @click="changeButtonStatus1(); formOrders('in place')" v-show="clicked1">Tại chỗ</div>
               <div class="place" @click="changeButtonStatus2(); formOrders('takeaway')" v-show="!clicked2">Mang về</div>
               <div class="place1" @click="changeButtonStatus2(); formOrders('takeaway')" v-show="clicked2">Mang về</div>
           </div>
           <div class="r-title">
               <p>Báo cáo thống kê</p>
           </div>
           <div class="statistic" style="display: flex;">
               <div class="r-stat">Tổng số đơn: {{totalOrders}} đơn</div>
               <div class="r-stat">Đơn tiền mặt: {{totalCashOrders}} đơn</div>
               <div class="r-stat">Đơn chuyển khoản: {{totalBankOrders}} đơn</div>
               <div class="r-stat">Tổng doanh thu: {{totalRevenue}} VND</div>
           </div>
       </section>

       <section class="right">
           <!-- <div class="r-display">Showing 10 - 3 of 64 results</div> -->
           <div class="date">
                <v-date-picker v-model="range" is-range>
                <template v-slot="{ inputValue, inputEvents }">
                    <div class="flex justify-center items-center">
                    Từ ngày:     
                    <input
                        :value="inputValue.start"
                        v-on="inputEvents.start"
                        class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
                    />
                    Đến ngày: 
                    <input
                        :value="inputValue.end"
                        v-on="inputEvents.end"
                        class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
                    />
                    </div>
                </template>
                </v-date-picker>
           </div>
           <div class="r-function">
               <div class="function" @click="filterOrders(range)">
                    <div class="fa-solid fa-filter fIcon fa-lg"></div>
                    <p>Lọc</p>
               </div>
               <div class="function" @click="print();">
                    <div class="fa-solid fa-file-export fIcon fa-lg"></div>
                    <p>Xuất file</p>
               </div>
           </div>
       </section>

   </div>

   <div class="tableContainer" v-if="filteredOrders.length > 0">
       <div class="table">
            <div class="thead">
                <div class="th">Số hóa đơn</div>
                <div class="th">Ngày</div>
                <div class="th">Giờ tạo</div>
                <div class="th">Thanh toán</div>
                <div class="th">Tổng tiền</div>
                <div class="th"></div>
            </div>
            <div class="row" v-for="order in filteredOrders" :key="order.id">
                <div class="td">#{{order.id}}</div>
                <div class="td">{{order.day_month_year}}</div>
                <div class="td">{{order.time_in}}</div>
                <div class="td" v-show="order.payment_method==='cash'">Tiền mặt</div>
                <div class="td" v-show="order.payment_method==='bank'">Chuyển khoản</div>
                <div class="td">{{order.sum}}</div>
                <div class="td" @click="changeDisplay(true); getOrderItemsByOrderID(order.id); changeOrder(order);">Xem chi tiết</div>
            </div> 
       </div>
       
   </div>

        <div class="tableContainer" style="text-align: center; font-size: 30px;  " v-else>
          Không có order nào !
        </div>

   <!-- <div class="pageContainer">
       <div class="fa-solid fa-arrow-left arrow fa-lg"></div>
       <div class="pageNum">1</div>
       <div class="pageNum">2</div>
       <div class="pageNum">3</div>
       <div class="pageNum">4</div>
       <div class="pageNum">5</div>
       <div class="pageNum">...</div>
       <div class="pageNum">64</div>
       <div class="fa-solid fa-arrow-right arrow fa-lg"></div>
   </div> -->

                    <OrderDetailModal     :order_items="order_items_listback"  
                                          :order="orderr" 
                                          @close="changeDisplay" v-if="isDisplay" />  
</div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import OrderDetailModal from "../components/OrderDetailModal.vue";
// import { DatePicker } from "v-calendar";

export default {
    name: "StatisticS",
    components: {
        OrderDetailModal,
        // DatePicker
    },
    data() {
        return {
            show_orders: [],
            isDisplay: false,
            clicked: true,
            clicked1: false,
            clicked2: false,
            order_items: [],
            orderr: {},
            range: {
                start: new Date(),
                end: new Date()
            }
        }
    },
    created() {
        this.$store.dispatch("orders/getAllOrders");
    },
    computed: {
        ...mapState("orders", ["orders", "order_items_listback", "clonedOrders"]),
        filteredOrders () {
        let a = (this.clonedOrders || this.orders)
        return a
        },                            
        totalOrders() {
            let total_orders = 0;
            for (let i = 0; i < this.filteredOrders.length; i++) {
                    total_orders += 1;
            }
            return total_orders;
        },
        totalCashOrders() {
            let total_orders = 0;
            for (let i = 0; i < this.filteredOrders.length; i++) {
                if (this.filteredOrders[i].payment_method === "cash") {
                    total_orders += 1;
                }
            }
            return total_orders;
        },
        totalBankOrders() {
            let total_orders = 0;
            for (let i = 0; i < this.filteredOrders.length; i++) {
                if (this.filteredOrders[i].payment_method === "bank") {
                    total_orders += 1;
                }
            }
            return total_orders;
        },                
        totalRevenue() {
            let total_revenue = 0;
            for (let i = 0; i < this.filteredOrders.length; i++) {
                    total_revenue += this.filteredOrders[i].sum;
            }
            return total_revenue;
        },
        },
    methods: {
    ...mapActions("orders", ["getAllOrders", "getOrderItemsByOrderID"]),
    changeDisplay(value){
        this.orderr = {};
        // this.order_items = [];
        this.isDisplay = value;
    },
    changeOrder(order) {
      this.orderr = order;
    },
    changeButtonStatus() {
        if (this.clicked) {
            this.clicked = false;
        } else {
            this.clicked = true;
            this.clicked1 = false;
            this.clicked2 = false
        }
    },
        changeButtonStatus1() {
        if (this.clicked1) {
            this.clicked1 = false;
        } else {
            this.clicked1 = true;
            this.clicked = false;
            this.clicked2 = false;
        }
    },
        changeButtonStatus2() {
        if (this.clicked2) {
            this.clicked2 = false;
        } else {
            this.clicked2 = true;
            this.clicked = false;
            this.clicked1 = false;
        }
    },    
    mouseover: function () {
        document.getElementById("calendar1").style.display = "block";
    },
    mouseleave: function () {
        document.getElementById("calendar1").style.display = "none";
    },
    filterOrders(value) {
        this.$store.commit('orders/FILTER_ORDERS', value)
    },
    formOrders(value) {
        this.$store.commit('orders/FORM_ORDERS', value)
    },
    print() {
        this.$htmlToPaperr('printMe')
    },     
    }            
}

</script>

<style scoped>
.reportContainer {
    display: flex;
    margin: 1rem;
    align-items: center;
}

section {
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
}

.right {
    align-items: flex-end;
    padding-right: 5rem;
}

.r-place {
    display: flex;
    padding: 1rem;
    width: 40%;
    justify-content: space-around;
}

.place {
    display: inline;
    padding: 1rem 1rem 0 1rem;
    /* color: #44d574; */
    height: auto;
    position: relative;
    background: #ffffff;
    width: auto;
    /* border-bottom: 2px solid #0004ff; */
}

.place1 {
    display: inline;
    padding: 1rem 1rem 0 1rem;
    color: #44d574;
    height: auto;
    position: relative;
    width: auto;
    background: #ffffff;
    border-bottom: 3px solid #44d574;    
}

/* .place:first-child:before {
    content: "";
    position: absolute;
    top: 20px;
    right: 10px;
    bottom: 0;
    width: 75%;
    border-bottom: 3px solid #44d574;
    /* left: 25px; */
    /* height: 15px;

} */

/* .place:first-child {
    display: inline;
    padding: 1rem 1rem 0 1rem;
    color: #44d574;
    height: auto;
    position: relative;
    background: #ffffff;
} */

.place:hover {
    cursor: pointer;
    color: #44d574;
}

/* .place:last-child {
    display: inline;
}  */

.r-title {
    display: inline;
    font-size: 26px;
    font-family: Trebuchet MS, sans-serif;
    font-weight: 600;
}

.statistic {
    display: flex;
    flex-direction: column;
}

.r-stat {
    display: inline;
}

/* section right */
.r-display {
    display: flex;
    width: 100%;
    justify-content: space-around;
}

.date {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* width: 50%; */
    justify-content: space-evenly;
    padding: 1rem 5rem;
}

.r-date {
    display: flex;
    align-items: center;
    border: 1.5px solid black;
    border-radius: 5px;
}

.r-date:hover {
    cursor: pointer;
    color: #44d574;
}

.date p{
    display: inline;
    margin: 0;
    padding: 0.5rem 1rem;
    font-size: 17px;
}

.calenIcon {
    padding: 0.5rem;
}

.r-function {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding: 0.5rem 5rem;
}

.function {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    margin: 0 1rem;
    border: 1px solid black;
    border-radius: 5px;
}

.function:hover {
    cursor: pointer;
    color: #44d574;
}

.function p {
    display: inline;
    margin: 0;
    font-size: 14px;
    font-style: italic;
    font-weight: 600;
    /* padding: 0 0.5rem;   */
}

.fIcon {
    padding: 1rem 0.3rem;
}

    /*      table       */
.tableContainer {
    display: table;
    width: 100%;
    padding: 0 1rem;
}

.table {
    display: flex;
    flex-direction: column;
}

.thead {
    display: grid;
    grid-template-columns: [first] 150px [line2] 180px [line3] 180px [line4] 230px [line5] 230px [line6] auto [end];
    background: #d5e9e9;
    justify-items: center;
    padding: 0.5rem 0;
    align-items: center;
}

.th {
    /* background-color: #44d574; */
   
}  

.sortIcon {
    padding: 0 0.5rem;
    cursor: pointer;
} 

.row {
    display: grid;
    grid-template-columns: [first] 150px [line2] 180px [line3] 180px [line4] 230px [line5] 230px [line6] auto [end];
    justify-items: center;
    align-items: center;
    margin: 0;
}

.td {
    display: inline-grid;
    padding: 0.5rem 0.7rem 0.5rem 0;
    justify-content: space-around;
}

.td:nth-child(4n) {
    padding-left: 1rem;
}

        /*       PageNum         */
.pageContainer {
    display: inline-flex;
    padding-right: 3rem;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
}

.pageNum {
    display: inline;
    padding: 0.8rem;
    cursor: pointer;
}

.pageNum:hover {
    color: #44d574;
    font-size: 22px;
    font-weight: 600;
}

.arrow {
    padding: 0.5rem;
    cursor: pointer;
}

.arrow:hover {
    color: #44d574;
}
</style>