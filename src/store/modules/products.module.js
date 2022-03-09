import axios from 'axios';

const state = () => ({
    products: [],
    product: {},
    productsCart: [],
    searchWord: null,
    clonedProducts: null,
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
    filteringProducts ({ commit }, searchWord) {
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
        state.clonedProducts = products
    },
    GET_PRODUCT(state, product) {
        state.product = product
    },
    DELETE_PRODUCT (state, id) {
        const index = state.products.findIndex(product => product.id === id)
        state.products.splice(index, 1)
        state.clonedProducts.splice(index, 1)
    },
    CREATE_PRODUCT(state, product) {
        state.products = [product, ...state.products]
        state.clonedProducts = [product, ...state.clonedProducts]
    },
    UPDATE_PRODUCT(state, updatedProduct) {
      const index = state.products.findIndex(product => product.id === updatedProduct.id)
      state.products[index] = updatedProduct;
      state.clonedProducts[index] = updatedProduct;
    },
//     GET_PRODUCT_CART(state, productsCart) {
//       state.productsCart = productsCart
//   },
    GET_SEARCH_WORD(state, searchWord) {
        state.searchWord = searchWord
    },
    GET_FILTERED_PRODUCTS(state, clonedProducts) {
        state.clonedProducts = clonedProducts
    },
    // ADD_TO_CART(state, product) {     
    //       state.productsCart.push(product);
    // },
    SORT_PRODUCT(state, value) {
      if (value === "upward"){
        let up =  state.clonedProducts.sort((a, b) => {
          return a.price - b.price;
        });
        state.clonedProducts = up;
      }
      if (value === "downward") {
        let down = state.clonedProducts.sort((a, b) => {
          return b.price - a.price;
        });
        state.clonedProducts = down;
      }
      if (value === "nameup") {
        let nameup = state.clonedProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        state.clonedProducts = nameup;
      }
      if (value === "namedown") {
        let namedown = state.clonedProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
        state.clonedProducts = namedown;
      }
      if (value === "") {
        let blank =  state.clonedProducts.sort((a, b) => {
          return a.id - b.id;
        });
        state.clonedProducts = blank;
      }
    },
    CATEGORY_PRODUCT(state, value) {
      if (value === "Đồ uống"){
        let drink = state.products.filter((product) => {
          return product.category_id === 1;
        });
        state.clonedProducts = drink
      }
      if (value === "Thức ăn"){
        let food = state.products.filter((product) => {
          return product.category_id === 2;
        });
        state.clonedProducts = food
      }
      if(value === "") {
          state.clonedProducts = state.products
      }
    },
    SEARCH_PRODUCT(state, value) {
        state.searchWord = value;
        state.clonedProducts = state.products.filter(product => {
            return product.name.toLowerCase().match(value.toLowerCase())
          }) 
    },
    
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}