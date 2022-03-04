import axios from 'axios';

const state = () => ({
    products: [],
    product: {},
    productsCart: [],
    searchWord: null,
    filteredProducts: null,
});

const actions = {
    getProducts: async ({commit}) => {
        try {
            const res = await axios.get("/products")
            commit("GET_PRODUCTS", res.data.content)
            console.log(res.data.content)
        } catch (e) {
            console.log(e);
        }
    },
    getProduct: async ({commit}, id) => {
        try {
            const res = await axios.get(`products/${id}`)
            commit("GET_PRODUCT", res.data)
        } catch (e) {
            console.log(e);
        }
    },
    filteredProducts ({ commit }, searchWord) {
        commit('SEARCH_PRODUCT', searchWord)
      },
    deleteProduct: async ({commit}, id) => {
        try {
          await axios.delete(`products/${id}`, {withCredentials: false})
          await commit('DELETE_PRODUCT', id)
        } catch (e) {
          console.log(e)
        }
      },
    createProduct: async ( {commit}, product) => {
        try {
          const res = await axios.post("products", product, {withCredentials: false})
          commit("CREATE_PRODUCT", res.data)
          console.log(res)
        } catch (e) {
          console.log(e)
        }
      }, 
    updateProduct: async ( {commit}, payload) => {
        try {
          const res = await axios.put(`products/${payload.id}`,payload.product, {withCredentials: false})
          await commit("UPDATE_PRODUCT",res.data)
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
    GET_PRODUCTS(state, products) {
        state.products = products
    },
    GET_PRODUCT(state, product) {
        state.product = product
    },
    DELETE_PRODUCT (state, id) {
        const index = state.products.findIndex(product => product.id === id)
        state.products.splice(index, 1)
    },
    CREATE_PRODUCT(state, product) {
        state.products = [product, ...state.products]
    },
    UPDATE_PRODUCT(state, updatedProduct) {
      const index = state.products.findIndex(product => product.id === updatedProduct.id)
      state.products[index] = updatedProduct;
    },
//     GET_PRODUCT_CART(state, productsCart) {
//       state.productsCart = productsCart
//   },
    GET_SEARCH_WORD(state, searchWord) {
        state.searchWord = searchWord
    },
    GET_FILTERED_PRODUCTS(state, filteredProducts) {
        state.filteredProducts = filteredProducts
    },
    // ADD_TO_CART(state, product) {     
    //       state.productsCart.push(product);
    // },
    SORT_PRODUCT(state, value) {
      if (value === "upward"){
        let up =  state.products.sort((a, b) => {
          return a.price - b.price;
        });
        console.log(up);
        return up;
      }
      if (value === "downward")
        return state.products.sort((a, b) => {
          return b.price - a.price;
        });
      if (value === "nameup")
        return state.products.sort((a, b) => {
            console.log(a)
          return a.title.localeCompare(b.title);
        });
      if (value === "namedown")
        return state.products.sort((a, b) => {
          return b.title.localeCompare(a.title);
        });
      if (value === "")
        return state.products.sort((a, b) => {
          return a.id - b.id;
        });
    },
    CATEGORY_PRODUCT(state, value) {
      if (value === "top"){
        let top =  state.products.filter((product) => {
          return product.category_id === 1;
        });
        state.filteredProducts = top
      }
      if (value === "bottom"){
        let bottom = state.products.filter((product) => {
          return product.category_id === 2;
        });
        // return bottom
        state.filteredProducts = bottom
      }
      if(value === "") {
          state.filteredProducts = state.products
      }
    },
    SEARCH_PRODUCT(state, value) {
        state.searchWord = value;
        state.filteredProducts = state.products.filter(product => {
            return product.title.toLowerCase().match(value.toLowerCase())
          })
    },
    
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}