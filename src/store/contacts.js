
import {
    dataUrl,
    requestTimeout
} from '../config';

export default {
    namespaced: true,
    state: { data: [] },
    getters: {
        isempty: state => state.data.length === 0,
        getByUsername: state => $ => state.data.find(({ login: { username } }) => $ === username)
    },
    mutations: {
        set (state, data) { state.data = data || [] },
        clear (state) { state.data = [] },
        removeById (state, id) { state.data = state.data.filter(({ id: _id }) => _id !== id); }
    },
    actions: {
        fetch ({ commit }) {
            commit('startLoading', null, { root: true });

            return Promise
                .race([
                    fetch(dataUrl).then(res => res.json()),
                    new Promise((_, reject) => setTimeout(reject, requestTimeout, new Error('Request timeout')))
                ])
                .then(data => commit('set', data.results))
                .catch(error => commit('setError', error, { root: true }))
                .then(() => commit('endLoading', null, { root: true }))
        }
    }
};

