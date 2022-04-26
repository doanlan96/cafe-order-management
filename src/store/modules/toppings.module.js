import axios from 'axios';

const state = () => ({
    toppings: [],
    order_items_listback: [],
    order_items: [],
    topping: {},
    topping_order_items: [],
    order_in_table: {}
    // productsCart: [],
    // searchWord: null,
    // clonedProducts: null,
});

const actions = {

    getToppings: async ({commit}) => {
        try {
            const res = await axios.get("/toppings")
            commit("GET_TOPPINGS", res.data)
            console.log(res.data)
        } catch (e) {
            console.log(e);
        }
    },
    getTopping: async ({commit}, id) => {
        try {
            const res = await axios.get(`/toppings/${id}`)
            commit("GET_TOPPING", res.data)
            console.log(res.data)
        } catch (e) {
            console.log(e);
        }
    },
    deleteTopping: async ({commit}, id) => {
        try {
          await axios.delete(`toppings/${id}`, {withCredentials: false})
          await commit('DELETE_TOPPING', id)
        } catch (e) {
          console.log(e)
        }
    },
    createTopping: async ( {commit}, topping) => {
        try {
          const res = await axios.post("/toppings", topping, {withCredentials: false})
          commit("CREATE_TOPPING", res.data)
          console.log(res)
        } catch (e) {
          console.log(e)
        }
    }, 
    updateTopping: async ( {commit}, payload) => {
        try {
          const res = await axios.put(`toppings/${payload.id}`,payload.topping, {withCredentials: false})
          await commit("UPDATE_TOPPING",res.data)
        } catch (e) {
          console.log(e)
        }
    },
    
    createToppingOrderItem: async ( {commit}, topping_order_item) => {
        try {
          const res = await axios.post("/toppingorderitems", topping_order_item, {withCredentials: false})
          commit("CREATE_TOPPING_ORDER_ITEM", res.data)
          console.log(res)
        } catch (e) {
          console.log(e)
        }
    },        
    getToppingOrderItemsByOrderItemID: async ({commit}, order_item_id) => {
        try {
            const res = await axios.get(`/toppingorderitems/orderitemid/${order_item_id}`)
            commit("GET_ORDER_ITEMS_LISTBACK", res.data)
            console.log(res.data)
        } catch (e) {
            console.log(e);
        }
    },
               
};

const mutations = {

    GET_TOPPINGS(state, toppings) {
        state.toppings = toppings
    },
    GET_TOPPING(state, topping) {
        state.topping = topping
    },
    DELETE_TOPPING (state, id) {
        const index = state.toppings.findIndex(topping => topping.id === id)
        state.toppings.splice(index, 1)
    },
    CREATE_TOPPING(state, topping) {
        state.toppings = [topping, ...state.toppings]
    },
    UPDATE_PRODUCT(state, updatedTopping) {
      const index = state.toppings.findIndex(topping => topping.id === updatedTopping.id)
      state.toppings[index] = updatedTopping;
    },    

    GET_ORDER_ITEMS_LISTBACK(state, order_items) {
        state.order_items_listback = order_items
    },
    DELETE_ORDER_ITEMS_LISTBACK (state) {
      state.order_items_listback = {};
    },
    GET_ORDER_IN_TABLE(state, order_in_table) {
        state.order_in_table = order_in_table
    },
    DELETE_LASTEST_ORDER (state) {
        state.lastest_order = {};
    },
    GET_LASTEST_ORDER(state, order) {
      state.lastest_order = order;
    },
    CREATE_ORDER(state, order) {
        state.order = order
        // state.clonedProducts = [product, ...state.clonedProducts]
    },
    CREATE_TOPPING_ORDER_ITEM(state, order_item) {
      state.order_items = [order_item, ...state.order_items]
    },    
    UPDATE_ORDER(state, updatedOrder) {
      state.lastest_order = updatedOrder;
    },    
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}