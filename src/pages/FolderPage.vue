<template>
  <ion-page>
    <ion-header :translucent="true" style="display:flex; justify-content:space-between">
      <ion-toolbar>
        <ion-title></ion-title>
        <!-- <ion-title>{{ $route.params.id }}</ion-title> -->
      </ion-toolbar>
        <div style="width:20%; display: flex; justify-content:space-around; padding-top: 10px;" v-if="!isLoginSuccess">
          <router-link to="Login Page">   
            <button type="button" class="btn btn-success">Đăng nhập / Đăng kí</button>
          </router-link>  
        </div>
        <div style="width:20%; display: flex; justify-content:space-around; padding-top: 10px;" v-else>
          <router-link to="Profile Page">   
            <button type="button" class="btn btn-success">Edit hồ sơ</button>
          </router-link>
          <!-- <router-link to="Dashboard"> -->
            <a type="button" class="btn btn-danger" href="/" @click="logout()">Đăng xuất</a>
          <!-- </router-link>   -->
          <div>
            | Hello, {{user.full_name}}
          </div>    
        </div>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <DashBoard v-if="$route.params.id=='Dashboard'" />
      <ManageShop v-if="$route.params.id=='Manage Shop'"/>
      <ManageOrder v-if="$route.params.id=='Order'"/>
      <OrderInPlace v-if="$route.params.id=='Order In Place'"/>
      <OrderTakeAway v-if="$route.params.id=='Order Take Away'"/>
      <LoginPage v-if="$route.params.id=='Login Page'" />
      <RegisterPage v-if="$route.params.id=='Register Page'" />
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
import OrderInPlace from './OrderInPlace.vue';
import OrderTakeAway from './OrderTakeAway.vue';
import LoginPage from './LoginPage.vue';
import RegisterPage from './RegisterPage.vue';

export default defineComponent({
  name: 'FolderPage',
  components: {
    RegisterPage,
    LoginPage,
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
