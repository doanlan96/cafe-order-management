<template>
  <ion-page>
    <ion-header :translucent="true" style="display:flex; justify-content:space-between">
      <ion-toolbar>
        <ion-title></ion-title>
        <!-- <ion-title>{{ $route.params.id }}</ion-title> -->
      </ion-toolbar>
        <div>
            User setting
        </div>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <DashBoard v-if="$route.params.id=='Dashboard'" />
      <ManageShop v-if="$route.params.id=='Manage Shop'"/>
      <ManageOrder v-if="$route.params.id=='Order'"/>
      <OrderInPlace v-if="$route.params.id=='Order In Place'"/>
      <OrderTakeAway v-if="$route.params.id=='Order Take Away'"/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import ManageOrder from "./ManageOrder.vue";
import ManageShop from './ManageShop.vue';
import DashBoard from './Dashboard.vue';
import OrderInPlace from './OrderInPlace.vue';
import OrderTakeAway from './OrderTakeAway.vue';

export default defineComponent({
  name: 'FolderPage',
  components: {
    OrderTakeAway,
    OrderInPlace,
    DashBoard,
    ManageOrder,
    ManageShop,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
