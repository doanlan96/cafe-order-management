<template>
  <div style="display: block;">
    <!-- Title Page -->
    <section
      class="bg-title-page p-t-40 p-b-50 flex-col-c-m"
      :style="{
        backgroundImage:
          'url(' + require('@/assets/login-background.jpg') + ')',
      }"
    >
      <h2 class="l-text2 t-center">Đăng nhập</h2>
    </section>

    <!-- content page -->
    <section class="bgwhite p-t-66 p-b-60">
      <div class="container">
        <div class="login-form m-auto">
          <Form @submit.prevent="login" :validation-schema="schema">
            <p class="m-b-20 text-center text-danger">
              {{ loginMessage }}
            </p>

            <div class="bo4 of-hidden size15 m-b-10">
              <Field
                  v-model="user.user_name"
                name="user_name"
                type="text"
                placeholder="Tài khoản"
                class="sizefull s-text7 p-l-22 p-r-22"
                :disabled="isLoading"
              />
            </div>

            <ErrorMessage name="user_name" class="text-danger m-b-20 d-block" />

            <div class="bo4 of-hidden size15 m-b-10">
              <Field
                  v-model="user.password"
                name="password"
                type="password"
                placeholder="Mật khẩu"
                class="sizefull s-text7 p-l-22 p-r-22"
                :disabled="isLoading"
              />
            </div>

            <ErrorMessage name="password" class="text-danger m-b-20 d-block" />

            <div class="w-size25 m-auto">
              <button
                  @click="login"
                class="
                  flex-c-m
                  size2
                  bg1
                  bo-rad-23
                  hov1
                  m-text3
                  trans-0-4
                  m-t-20
                "
                :class="{ disabled: isLoading }"
                :disabled="isLoading"
              >
                <span v-show="isLoading" data-loader="ball-scale"></span>
                Đăng nhập
              </button>
            </div>
          </Form>

          <br />
          <hr />

          <p class="text-center">
            <router-link to="Register Page"
              >Đăng kí ngay!
            </router-link>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState} from "vuex";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "LoginPage",

  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    const schema = yup.object().shape({
      user_name: yup
        .string()
        .required("Username is required!"),
      password: yup
        .string()
        .required("Password is required!"),
    });

    return {
      isLoading: false,
      schema,
      user: {
        user_name: '',
        password: ''
      }
    };
  },

  computed: mapState("users", ["isLoginSuccess", "loginMessage", "user"]),

  created() {
    if (this.isLoginSuccess) {
      this.$router.push("/");
    }
  },

  methods: {
    login() {
      this.isLoading = true;
      this.$store.dispatch("users/login", {
        username: this.user.user_name,
        password: this.user.password,
      })
          .then(() => {
        this.isLoading = false;
        if (this.isLoginSuccess) {
          this.$router.push("/");
        }
      })
    },
  },
};
</script>

<style scoped>
.p-b-50 {
    padding-bottom: 50px;
}
.p-t-40 {
    padding-top: 40px;
}
.bg-title-page {
    width: 100%;
    min-height: 239px;
    padding-left: 15px;
    padding-right: 15px;
    background-repeat: no-repeat;
    background-position: center 0;
    background-size: cover;
}
.l-text2 {
    font-family: Montserrat-Bold;
    font-size: 50px;
    color: white;
    line-height: 1.2;
    text-transform: uppercase;
}
.t-center {
    text-align: center;
}
.bgwhite {
    background-color: white;
}
.p-b-60 {
    padding-bottom: 60px;
}
.p-t-66 {
    padding-top: 66px;
}
.login-form[data-v-6fd59704] {
    max-width: 500px;
}
.m-auto {
    margin: auto!important;
}
.bo4 {
    border: 1px solid #e6e6e6;
    border-radius: 2px;
}
.size15 {
    width: 100%;
    height: 50px;
}
.of-hidden {
    overflow: hidden;
}
.m-b-10 {
    margin-bottom: 10px;
}
.w-size25 {
    width: 160px;
}
.s-text7 {
    font-family: Montserrat-Regular;
    font-size: 13px;
    color: #555555;
    line-height: 1.8;
}
.sizefull {
    width: 100%;
    height: 100%;
}
.p-r-22 {
    padding-right: 22px;
}
.p-l-22 {
    padding-left: 22px;
}
p {
    margin-top: 0;
    margin-bottom: 1rem;
    font-family: Montserrat-Regular;
    font-size: 15px;
    line-height: 1.7;
    color: #888888;
    margin: 0px;
}
.bo-rad-23 {
    border-radius: 23px;
}
.bg1 {
    background-color: #76e861;
}
.size2 {
    width: 100%;
    height: 46px;
}
.m-text3 {
    font-family: Montserrat-Regular;
    font-size: 16px;
    color: white;
    text-transform: uppercase;
}

.login-form {
  max-width: 500px;
}
button.disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
button.disabled:hover {
  background-color: #222222;
}



</style>