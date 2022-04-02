import axios from 'axios';

const state = () => ({
    order_items: [],
    order_items_listback: [],
    order: {},
    lastest_order: {},
    order_in_table: {}
    // productsCart: [],
    // searchWord: null,
    // clonedProducts: null,
});

const actions = {
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
//     GET_PRODUCT_CART(state, productsCart) {
//       state.productsCart = productsCart
//   },
    // GET_SEARCH_WORD(state, searchWord) {
    //     state.searchWord = searchWord
    // },
    // GET_FILTERED_PRODUCTS(state, clonedProducts) {
    //     state.clonedProducts = clonedProducts
    // },
    // // ADD_TO_CART(state, product) {     
    // //       state.productsCart.push(product);
    // // },
    // SORT_PRODUCT(state, value) {
    //   if (value === "upward"){
    //     let up =  state.clonedProducts.sort((a, b) => {
    //       return a.price - b.price;
    //     });
    //     state.clonedProducts = up;
    //   }
    //   if (value === "downward") {
    //     let down = state.clonedProducts.sort((a, b) => {
    //       return b.price - a.price;
    //     });
    //     state.clonedProducts = down;
    //   }
    //   if (value === "nameup") {
    //     let nameup = state.clonedProducts.sort((a, b) => {
    //       return a.name.localeCompare(b.name);
    //     });
    //     state.clonedProducts = nameup;
    //   }
    //   if (value === "namedown") {
    //     let namedown = state.clonedProducts.sort((a, b) => {
    //       return b.name.localeCompare(a.name);
    //     });
    //     state.clonedProducts = namedown;
    //   }
    //   if (value === "") {
    //     let blank =  state.clonedProducts.sort((a, b) => {
    //       return a.id - b.id;
    //     });
    //     state.clonedProducts = blank;
    //   }
    // },
    // CATEGORY_PRODUCT(state, value) {
    //   if (value === "Đồ uống"){
    //     let drink = state.products.filter((product) => {
    //       return product.category_id === 1;
    //     });
    //     state.clonedProducts = drink
    //   }
    //   if (value === "Thức ăn"){
    //     let food = state.products.filter((product) => {
    //       return product.category_id === 2;
    //     });
    //     state.clonedProducts = food
    //   }
    //   if(value === "") {
    //       state.clonedProducts = state.products
    //   }
    // },
    // SEARCH_PRODUCT(state, value) {
    //     state.searchWord = value;
    //     state.clonedProducts = state.products.filter(product => {
    //         return product.name.toLowerCase().match(value.toLowerCase())
    //       }) 
    // },
    
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}