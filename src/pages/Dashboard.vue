<template>
<ion-page>
<div class="container" style="display:center;">
    <ion-grid>
        <ion-row name="first-row">
            <ion-col size="9">
                <ion-card >
                    <ion-card-header>
                    <ion-card-title>Thu nhập</ion-card-title>
                    </ion-card-header>

                    <ion-card-content>
                    Keep close to Nature's heart... and break clear away, once in awhile,
                    and climb a mountain or spend a week in the woods. Wash your spirit clean.
                    Keep close to Nature's heart... and break clear away, once in awhile,
                    and climb a mountain or spend a week in the woods. Wash your spirit clean.
                    Keep close to Nature's heart... and break clear away, once in awhile,
                    and climb a mountain or spend a week in the woods. Wash your spirit clean.
                    Keep close to Nature's heart... and break clear away, once in awhile,
                    and climb a mountain or spend a week in the woods. Wash your spirit clean.
                    Keep close to Nature's heart... and break clear away, once in awhile,
                    and climb a mountain or spend a week in the woods. Wash your spirit clean.
                    Keep close to Nature's heart... and break clear away, once in awhile,
                    and climb a mountain or spend a week in the woods. Wash your spirit clean.
                    Keep close to Nature's heart... and break clear away, once in awhile,
                    and climb a mountain or spend a week in the woods. Wash your spirit clean.
                    Keep close to Nature's heart... and break clear away, once in awhile,
                    and climb a mountain or spend a week in the woods. Wash your spirit clean.
                    
                    </ion-card-content>
                </ion-card>
            </ion-col>
            <ion-col size="3">
                <ion-card>
                    <ion-card-header>
                    <ion-card-title>Lịch</ion-card-title>
                    </ion-card-header>

                    <ion-card-content class = ion-justify-content-center>
                    <v-date-picker v-model="date" />
                    </ion-card-content>
                </ion-card>
            </ion-col>
        </ion-row>

        <ion-row name="second-row">
            <ion-col size="4">
                <ion-card>
                    <ion-card-header>
                    <ion-card-title>Tổng số order</ion-card-title>
                    </ion-card-header>

                    <ion-card-content class = ion-justify-content-between style="font-size: 40px; color:black">
                    {{totalOrders}} <ion-icon style= "color: deepskyblue" :md="documentTextOutline"></ion-icon>
                    </ion-card-content>
                </ion-card>


            </ion-col>
            <ion-col size="4">
                <ion-card>
                    <ion-card-header>
                    <ion-card-title>Tổng số đơn ship</ion-card-title>
                    </ion-card-header>

                    <ion-card-content class = ion-justify-content-between style="font-size: 40px; color:black">
                    0 <ion-icon style= "color: gold" :md="carOutline"></ion-icon> 
                    </ion-card-content>
                </ion-card>
            </ion-col>
            <ion-col size="4">
                <ion-card>
                    <ion-card-header>
                    <ion-card-title>Tổng thu nhập (VND)</ion-card-title>
                    </ion-card-header>

                    <ion-card-content class = ion-justify-content-between style="font-size: 40px; color:black">
                    {{totalRevenue}} <ion-icon style= "color: green" :md="cashOutline"></ion-icon> 
                    </ion-card-content>
                </ion-card>
            </ion-col>
        </ion-row>

        <ion-row name="third-row">
            <ion-col size="9">
                <ion-card>
                    <ion-card-header>
                    <ion-card-title>Lượng order</ion-card-title>
                    </ion-card-header>

                    <ion-card-content>
                    Keep close to Nature's heart... and break clear away, once in awhile,
                    and climb a mountain or spend a week in the woods. Wash your spirit clean.
                    Keep close to Nature's heart... and break clear away, once in awhile,
                    and climb a mountain or spend a week in the woods. Wash your spirit clean.
                    Keep close to Nature's heart... and break clear away, once in awhile,
                    and climb a mountain or spend a week in the woods. Wash your spirit clean.
                    Keep close to Nature's heart... and break clear away, once in awhile,
                    and climb a mountain or spend a week in the woods. Wash your spirit clean.
                    </ion-card-content>
                </ion-card>
            </ion-col>
            <ion-col size="3">
                <ion-card>
                    <ion-card-header>
                    <ion-card-title>Danh sách việc cần làm</ion-card-title>
                    </ion-card-header>

                    <ion-card-content>
                    <div id="myDIV" class="header">
                    <input type="text" id="myInput" placeholder="Ghi chú...">
                    <span onclick="newElement()" class="addBtn">Add</span>
                    </div>
                    </ion-card-content>
                </ion-card>
            </ion-col>
        </ion-row>  
    </ion-grid>
</div>
</ion-page>
</template>

<script>
import { IonIcon } from '@ionic/vue';
import {documentTextOutline, carOutline, cashOutline} from 'ionicons/icons';
import {mapActions, mapState} from 'vuex';

export default {
    name: 'DashBoard',
    components: {
        IonIcon
    },
    data() {
      return  {
          documentTextOutline,
          carOutline,
          cashOutline,
          date: new Date(),
          }  
    },
    created() {
        this.$store.dispatch("orders/getAllOrders");
    },
    computed: {
        ...mapState("orders", ["orders"]),
        totalOrders() {
            let total_orders = 0;
            for (let i = 0; i < this.orders.length; i++) {
                    total_orders += 1;
            }
            return total_orders;
        },
        totalRevenue() {
            let total_revenue = 0;
            for (let i = 0; i < this.orders.length; i++) {
                    total_revenue += this.orders[i].sum;
            }
            return total_revenue;
        },                
    },
    methods: {
        ...mapActions("orders", ["getAllOrders"]),
    }        
}
</script>

<style scoped>
ion-row {
    display: flex;
    justify-content: space-between;
}
ion-card {
    position: relative;
    background: var(--white);
    box-shadow: 0 7px 25px rgba(0,0,0,0.2);
}
ion-card-content {
    display: flex;
}
ion-icon {
    font-size: 50px;
}
input {
  margin: 0;
  border: none;
  border-radius: 0;
  width: 75%;
  padding: 10px;
  float: left;
  font-size: 16px;
}
.addBtn {
  padding: 10px;
  width: 25%;
  background: limegreen;
  color: rgb(0, 0, 0);
  float: left;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 0;
}

.addBtn:hover {
  background-color: #bbb;
}
</style>