import axios from 'axios';

const state = () => ({
    order_items: [],
    order_items_listback: [],
    orders : [],
    clonedOrders: [],
    // total_orders: 0,
    // total_revenue: 0,
    order: {},
    lastest_order: {},
    order_in_table: {}
    // productsCart: [],
    // searchWord: null,
    // clonedProducts: null,
});

const actions = {
      getAllOrders: async ({commit}) => {
        try {
            const res = await axios.get("/orders")
            commit("GET_ORDERS", res.data)
            console.log(res.data)
        } catch (e) {
            console.log(e);
        }
    },
    getOrderItemsByOrderID: async ({commit}, order_id) => {
        try {
            const res = await axios.get(`/orderitems/orderid/${order_id}`)
            commit("GET_ORDER_ITEMS_LISTBACK", res.data)
            console.log(res.data)
        } catch (e) {
            console.log(e);
        }
    },
    getOrderByTableIDWithState: async ({commit}, table_id) => {
        try {
            const res = await axios.get(`/orders/tableid/${table_id}`)
            commit("GET_ORDER_IN_TABLE", res.data)
        } catch (e) {
            console.log(e);
        }
    },
    // filteringProducts ({ commit }, searchWord) {
    //     commit('SEARCH_PRODUCT', searchWord)
    //   },
    deleteLastestOrder: async ({commit}, id) => {
        try {
          await axios.delete(`orders/${id}`, {withCredentials: false})
          await commit('DELETE_LASTEST_ORDER', id)
        } catch (e) {
          console.log(e)
        }
      },

    getLastestOrder: async ({commit}) => {
        try {
            const res = await axios.get(`/orders/lastest`)
            commit("GET_LASTEST_ORDER", res.data)
            console.log(res.data)
        } catch (e) {
            console.log(e);
        }
    },

    createOrder: async ( {commit}, order) => {
        try {
          const res = await axios.post("/orders", order, {withCredentials: false})
          commit("CREATE_ORDER", res.data)
          console.log(res)
        } catch (e) {
          console.log(e)
        }
      },
    createOrderItem: async ( {commit}, order_item) => {
        try {
          const res = await axios.post("/orderitems", order_item, {withCredentials: false})
          commit("CREATE_ORDER_ITEM", res.data)
          console.log(res)
        } catch (e) {
          console.log(e)
        }
      },       
    updateOrder: async ( {commit}, payload) => {
        try {
          const res = await axios.put(`/orders/${payload.id}`,payload.order, {withCredentials: false})
          await commit("UPDATE_ORDER",res.data)
        } catch (e) {
          console.log(e)
        }
      }             
    // getProductsCart ({commit}) {
    //   commit('GET_PRODUCT_CART')
    // },
    // addToCart({commit}, product) {
    //   commit('ADD_TO_CART', product)
    // }    
};

const mutations = {
    GET_ORDERS(state, orders) {
      state.orders = orders;
      state.clonedOrders = orders;
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
    CREATE_ORDER_ITEM(state, order_item) {
      state.order_items = [order_item, ...state.order_items]
    },    
    UPDATE_ORDER(state, updatedOrder) {
      state.lastest_order = updatedOrder;
    },
    GET_FILTERED_ORDERS(state, clonedOrders) {
      state.clonedOderss = clonedOrders
    },    
    FILTER_ORDERS(state, range) {
        let fil_orders = state.orders.filter((order) => {
          order.day_month_year >= range.start &&
          order.day_month_year <= range.end;
      });
      state.clonedOrders = fil_orders;
      console.log(state.clonedOrders);
    },
    FORM_ORDERS(state, value) {
      if (value === "in place") {
        let in_place = state.orders.filter((order) => {
          return order.form === "in place";
        });
        state.clonedOrders = in_place;        
      }
      if (value === "takeaway") {
        let takeaway = state.orders.filter((order) => {
          return order.form === "takeaway";
        });
        state.clonedOrders = takeaway;     
      }
      if(value === "") {
        state.clonedOrders = state.orders;
      }
    }
    
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}