
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import contacts from './contacts';

export default new Vuex.Store({
    state: {
        loading: false,
        error: null
    },
    mutations: {
        startLoading (state) { state.loading = true; },
        endLoading (state) { state.loading = false; },
        setError (state, error) { state.error = error; },
        clearError (state) { state.error = null; }
    },
    modules: {
        contacts
    }
});

