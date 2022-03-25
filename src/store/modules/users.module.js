
import axios from "axios";

const state = () => ({
  user: {},
  isLoginSuccess: false,
  loginMessage: "",
  isRegisterSuccess: false,
//   isUpdateSuccess: false,
  isChangePassSuccess: false,
  registerMessage: "",
//   updateMessage: "",
  changePassMessage: "",
//   isShowUserDropdown: false,
  isDisplayForm: false,
});

const getters = {};

const actions = {
//   async getUserExits({commit}) {
//     try {
//       const res = await axios.get("user", {withCredentials: false})
//       commit("setLoginSuccess", true);
//       commit("setUser", res.data );
//     } catch (e) {
//       console.log(e)
//     }
//   },
  async login({ commit }, login_form) {
    try {
      const res = await axios.post("/login", login_form, {withCredentials: false})
      if (res.data === "") throw new Error("User name or password is wrong!");
      commit("setLoginSuccess", true);
      commit("setLoginMessage", "");
      commit("setUser", res.data);
      localStorage.setItem("User Infor", JSON.stringify(res.data));
    } catch (error) {
      console.log(error)
      commit("setLoginSuccess", false);
      commit(
          "setLoginMessage", "User name or password is wrong!"
      );
    }
  },

  async register({ commit }, register_form) {
    try {
      const res = await axios.post('/register', register_form, {withCredentials: false})
      console.log(res.data);
      commit("setRegisterSuccess", true);
      commit("setRegisterMessage", "");
    } catch (e) {
      console.log(e)
      commit("setRegisterMessage", e.message === "Request failed with status code 400" ? "Username is already in use" : "Create new account is failed");
      commit("setRegisterSuccess", false);
    }
  },

  async changePassword({commit}, payload) {
    try {
        const res = await axios.put(`/changepass/${payload.id}`, payload.passwords, {withCredentials: false});
        console.log(res);
        commit("setChangePassSuccess", true);
        commit("setChangePassMessage", "Thay đổi mật khẩu thành công!");
    } catch (e) {
      // console.log(e)
      commit("setChangePassMessage", e.message === "Request failed with status code 400" ? "Mật khẩu hiện tại không đúng" : "Change password is failed");
      commit("setChangePassSuccess", false);
    }
  }
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  SET_USERS(state, users) {
    state.users = users;
  },

  setLoginSuccess(state, status) {
    state.isLoginSuccess = status;
  },

  setLoginMessage(state, message) {
    state.loginMessage = message;
  },

  setChangePassSuccess(state, status) {
    state.isChangePassSuccess = status;
  },

  setChangePassMessage(state, message) {
    state.changePassMessage = message;
  },

  setRegisterSuccess(state, status) {
    state.isRegisterSuccess = status;
  },

  setRegisterMessage(state, message) {
    state.registerMessage = message;
  },

  logout(state) {
    state.user = {};
    state.isLoginSuccess = false;
    state.isRegisterSuccess = false;
    localStorage.removeItem("User Infor");
  },
  getUserExists(state) {
    let user = JSON.parse(localStorage.getItem("User Infor"));
    if (user !== null) {
        state.user = user;
        state.isLoginSuccess = true;
    }
  },
  displayForm(state) {
   if(state.isDisplayForm == false) {
    state.isDisplayForm = true;
   }else {
     state.isDisplayForm = false;
   }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};