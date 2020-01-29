
import Vue from 'vue';
import cn from 'classnames';

import { dateOpts } from './config';

export const fullname = e => [ e.name.first, e.name.last ]
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

export const dob = e => {
    const d = new Date(e.dob.date);
    return d.toLocaleDateString(undefined, dateOpts);
}

Vue.filter('fullname', fullname);
Vue.filter('dob', dob);
Vue.filter('cn', cn);

