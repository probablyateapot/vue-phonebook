
import Vue from 'vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';

import './filters';

import App from './App';

import router from './router';
import store from './store';

Vue.config.productionTip = false

export default new Vue({
    render: h => h(App),
    router,
    store,
    el: '#app'
});

