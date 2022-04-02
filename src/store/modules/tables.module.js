import axios from 'axios';

const state = () => ({
    tables: [],
    table: {},
    // productsCart: [],
    // searchWord: null,
    // clonedProducts: null,
});

const actions = {
    getTables: async ({commit}) => {
        try {
            const res = await axios.get("/tables")
            commit("GET_TABLES", res.data)
            console.log(res.data)
        } catch (e) {
            console.log(e);
        }
    },
    getTable: async ({commit}, id) => {
        try {
            const res = await axios.get(`/tables/${id}`)
            commit("GET_TABLE", res.data)
        } catch (e) {
            console.log(e);
        }
    },
    // deleteProduct: async ({commit}, id) => {
    //     try {
    //       await axios.delete(`products/${id}`, {withCredentials: false})
    //       await commit('DELETE_PRODUCT', id)
    //     } catch (e) {
    //       console.log(e)
    //     }
    //   },
    // createProduct: async ( {commit}, product) => {
    //     try {
    //       const res = await axios.post("products", product, {withCredentials: false})
    //       commit("CREATE_PRODUCT", res.data)
    //       console.log(res)
    //     } catch (e) {
    //       console.log(e)
    //     }
    //   }, 
    updateTable: async ( {commit}, payload) => {
        try {
          const res = await axios.put(`/tables/${payload.id}`,payload.table, {withCredentials: false})
          await commit("UPDATE_TABLE",res.data)
        } catch (e) {
          console.log(e)
        }
      }               
};

const mutations = {
    GET_TABLES(state, tables) {
        state.tables = tables
    },
    GET_TABLE(state, table) {
        state.table = table
    },
    // DELETE_PRODUCT (state, id) {
    //     const index = state.products.findIndex(product => product.id === id)
    //     state.products.splice(index, 1)
    //     state.clonedProducts.splice(index, 1)
    // },
    // CREATE_PRODUCT(state, product) {
    //     state.products = [product, ...state.products]
    //     state.clonedProducts = [product, ...state.clonedProducts]
    // },
    UPDATE_TABLE(state, updatedTable) {
      const index = state.tables.findIndex(table => table.id === updatedTable.id)
      state.tables[index] = updatedTable;
    //   state.clonedProducts[index] = updatedProduct;
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