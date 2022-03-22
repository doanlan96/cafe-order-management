<template>
<ion-page>
<div class="container" style="display:center;">
    <ion-grid>
        <ion-row name="first-row">
            <ion-col size="9">
                <ion-card >
                    <ion-card-header>
                    <ion-card-title>Total revenue</ion-card-title>
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
                    <ion-card-title>Date</ion-card-title>
                    </ion-card-header>

                    <ion-card-content>
                    Keep close to Nature's heart... and break clear away, once in awhile,
                    and climb a mountain or spend a week in the woods. Wash your spirit clean.
                    </ion-card-content>
                </ion-card>
            </ion-col>
        </ion-row>
        <ion-row name="second-row" >
            <ion-col size="4">
                <ion-card >
                    <ion-card-header>
                    <ion-card-title>Tổng số đơn</ion-card-title>
                    </ion-card-header>

                    <ion-card-content>
                        <ion-icon :md="documentTextOutline" size="large"></ion-icon> 734
                    </ion-card-content>
                </ion-card>
            </ion-col>
            <ion-col size="4">
                <ion-card>
                    <ion-card-header>
                    <ion-card-title>Tổng số đơn ship</ion-card-title>
                    </ion-card-header>

                    <ion-card-content>
                    <ion-icon :md="carOutline" size="large"></ion-icon> 34
                    </ion-card-content>
                </ion-card>
            </ion-col>
            <ion-col size="4">
                <ion-card>
                    <ion-card-header>
                    <ion-card-title>Tổng thu nhập (VND)</ion-card-title>
                    </ion-card-header>

                    <ion-card-content>
                    <ion-icon :md="cashOutline" size="large"></ion-icon> 10.000.000
                    </ion-card-content>
                </ion-card>
            </ion-col>
        </ion-row>
        <ion-row name="third-row">
            <ion-col size="9">
                <ion-card>
                    <ion-card-header>
                    <ion-card-title>Lịch</ion-card-title>
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
                    <ion-card-title>Lịch</ion-card-title>
                    </ion-card-header>

                    <ion-card-content>
                    Keep close to Nature's heart... and break clear away, once in awhile,
                    and climb a mountain or spend a week in the woods. Wash your spirit clean.
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
export default {
    name: 'DashBoard',
    components: {
        IonIcon
    },
    data() {
      return  {
          documentTextOutline,
          carOutline,
          cashOutline
          }  
    },
}
</script>

<style scoped>
ion-row {
    display: flex;
    justify-content: space-between;
}
ion-card {
    background-color: #D0FBD8;
}
</style>