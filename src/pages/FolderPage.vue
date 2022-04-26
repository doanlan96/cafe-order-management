<template>
  <ion-page>
    <ion-header :translucent="true" style="display:flex; justify-content:space-between">
      <ion-toolbar>
        <ion-title></ion-title>
        <!-- <ion-title>{{ $route.params.id }}</ion-title> -->
      </ion-toolbar>
        <div style="width:20%; display: flex; justify-content:space-around; padding-top: 10px;" v-if="!isLoginSuccess">
          <router-link to="Login Page">   
            <button type="button" class="btn btn-success">Đăng nhập</button>
          </router-link>  
        </div>
        <div style="width:20%; display: flex; justify-content:space-around; padding-top: 10px;" v-else>
            <!-- <a type="button" class="btn btn-danger" href="/folder/Login Page" @click="logout()">Đăng xuất</a> -->
          <div>
            | Hello, {{user.full_name}}
          </div>    
        </div>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <DashBoard v-if="$route.params.id=='Dashboard'" />
      <ManageShop v-if="user.role==='admin' && $route.params.id=='Manage Shop'"/>
      <ManageOrder v-if="$route.params.id=='Order'"/>
      <OrderChooseTables v-if="$route.params.id=='Order Choose Tables'"/>
      <OrderTakeAway v-if="$route.params.id=='Order Take Away'"/>
      <RegisterStaff v-if="user.role==='admin' && $route.params.id=='Register Staff'"/>
      <ChangePassword v-if="$route.params.id=='Change Password'" />
      <StatisticS v-if="$route.params.id=='Statistic'" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { mapState, mapMutations } from "vuex";
import { defineComponent } from 'vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import ManageOrder from "./ManageOrder.vue";
import ManageShop from './ManageShop.vue';
import DashBoard from './Dashboard.vue';
import OrderChooseTables from './OrderChooseTables.vue';
import OrderTakeAway from './OrderTakeAway.vue';
import ChangePassword from './ChangePassword.vue';
import RegisterStaff from './RegisterStaff.vue';
import StatisticS from './Statistic.vue';

export default defineComponent({
  name: 'FolderPage',
  components: {
    StatisticS,
    ChangePassword,
    RegisterStaff,
    OrderTakeAway,
    OrderChooseTables,
    DashBoard,
    ManageOrder,
    ManageShop,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  },
  created() {
    this.getUserExists();
  },
  computed: {
    ...mapState("users", ["user", "isLoginSuccess"]),
  },
  methods: {
    ...mapMutations("users", ["logout", "getUserExists"]),
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
