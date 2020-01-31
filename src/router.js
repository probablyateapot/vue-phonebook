
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from './pages/Home';
import Entry from './pages/Entry';
import BigPicture from './pages/BigPicture';
import NotFound from './pages/404';

import store from './store';

import { baseUrl } from './config';

const getByUsername = store.getters["contacts/getByUsername"];

const userGuard = (to, from, next) => {
    const { username } = to.params;

    if (getByUsername(username) !== null) {
        next();
    } else {
        next({ name: "notfound" });
    }
};

export default new VueRouter({
    base: baseUrl,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/details/:username',
            name: 'details',
            props: true,
            component: Entry,
            beforeEnter: userGuard
        },
        {
            path: '/details/:username/picture',
            name: 'contactpicture',
            props: true,
            component: BigPicture,
            beforeEnter: userGuard
        },
        {
            path: '*',
            name: 'notfound',
            component: NotFound
        }
    ]
});

