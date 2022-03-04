import {createStore} from 'vuex';
import products from './modules/products.module';

const store = createStore({
    modules: {
        products,
    }
});

export default store;