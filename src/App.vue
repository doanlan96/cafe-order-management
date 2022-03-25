<template>
  <LoginPage v-if="!isLoginSuccess"/>
  <ion-app v-else>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay" style="max-width: 15%;">
        <ion-content>
          <ion-list id="inbox-list" >
            <ion-list-header>T-Hi</ion-list-header>
            <ion-note>Lemon Tea Cafe</ion-note>
  
            <ion-menu-toggle auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
          <ion-list>
              <ion-menu-toggle auto-hide="false" >
                <a type="button" href="/folder/Login Page" @click="logout()" style="text-decoration: none">               
                  <ion-item lines="none" detail="false" class="hydrated">
                    <ion-icon slot="start" :ios="exitOutline" :md="exitSharp"></ion-icon>
                    <ion-label>Đăng xuất</ion-label>
                  </ion-item>
                </a>                     
              </ion-menu-toggle> 
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content" ></ion-router-outlet>
    </ion-split-pane>
  </ion-app >
</template>

<script lang="ts">
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterOutlet, IonSplitPane} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import {keyOutline, keySharp, exitOutline, exitSharp, personAddOutline, personAddSharp, clipboardOutline, clipboardSharp, archiveOutline, archiveSharp, bookmarkOutline, bookmarkSharp, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import { mapState, mapMutations } from "vuex";
import LoginPage from './pages/LoginPage.vue';

export default defineComponent({
  name: 'App',
  components: {
    LoginPage,
    IonApp, 
    IonContent, 
    IonIcon, 
    IonItem, 
    IonLabel, 
    IonList, 
    IonListHeader, 
    IonMenu, 
    IonMenuToggle, 
    IonNote, 
    IonRouterOutlet, 
    IonSplitPane,
  },
  created() {
    this.getUserExists();
  },
  computed: {
    ...mapState("users", ["user", "isLoginSuccess"]),
  },
  setup() {
    const selectedIndex = ref(0);
    const appPages = [
      {
        title: 'Dashboard',
        url: '/folder/Dashboard',
        iosIcon: clipboardOutline,
        mdIcon: clipboardSharp
      },
      {
        title: 'Order',
        url: '/folder/Order',
        iosIcon: mailOutline,
        mdIcon: mailSharp
      },
      {
        title: 'Đơn hàng App',
        url: '/folder/Online Delivery',
        iosIcon: paperPlaneOutline,
        mdIcon: paperPlaneSharp
      },
      {
        title: 'Báo cáo thống kê',
        url: '/folder/Statistic',
        iosIcon: heartOutline,
        mdIcon: heartSharp
      },
      {
        title: 'Quản lí món',
        url: '/folder/Manage Shop',
        iosIcon: archiveOutline,
        mdIcon: archiveSharp
      },
      {
        title: 'Thêm nhân viên mới',
        url: '/folder/Register Staff',
        iosIcon: personAddOutline,
        mdIcon: personAddSharp
      },     
      {
        title: 'Cài đặt',
        url: '/folder/Settings',
        iosIcon: trashOutline,
        mdIcon: trashSharp
      },
      {
        title: 'About',
        url: '/folder/About',
        iosIcon: warningOutline,
        mdIcon: warningSharp
      },
      {
        title: 'Đổi mật khẩu',
        url: '/folder/Change Password',
        iosIcon: keyOutline,
        mdIcon: keySharp
      },      
    ];
    const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
    
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      selectedIndex.value = appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    
    const route = useRoute();
    

    return { 
      selectedIndex,
      appPages, 
      labels,
      keyOutline,
      keySharp,
      exitOutline,
      exitSharp,
      personAddOutline,
      personAddSharp,
      clipboardSharp,
      clipboardOutline,
      archiveOutline, 
      archiveSharp, 
      bookmarkOutline, 
      bookmarkSharp, 
      heartOutline, 
      heartSharp, 
      mailOutline, 
      mailSharp, 
      paperPlaneOutline, 
      paperPlaneSharp, 
      trashOutline, 
      trashSharp, 
      warningOutline, 
      warningSharp,
      // animationCtrl,
      isSelected: (url: string) => url === route.path ? 'selected' : ''
    }
  },
  methods: {
    ...mapMutations("users", ["getUserExists", "logout"]),
  }
});
</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
