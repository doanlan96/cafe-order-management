import {createStore} from 'vuex';
import products from './modules/products.module';
import users from './modules/users.module';

const store = createStore({
    modules: {
        products,
        users
    }
});

export default store;