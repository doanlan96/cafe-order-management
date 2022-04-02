import {createStore} from 'vuex';
import products from './modules/products.module';
import users from './modules/users.module';
import tables from './modules/tables.module';
import orders from './modules/orders.module';

const store = createStore({
    modules: {
        products,
        users,
        tables,
        orders
    }
});

export default store;