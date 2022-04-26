import {createStore} from 'vuex';
import products from './modules/products.module';
import users from './modules/users.module';
import tables from './modules/tables.module';
import orders from './modules/orders.module';
import toppings from './modules/toppings.module';

const store = createStore({
    modules: {
        products,
        users,
        tables,
        orders,
        toppings
    }
});

export default store;