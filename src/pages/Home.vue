<template>
    <div>
        <div v-if="loading">
            Loading...
        </div>
        <div v-else class="card rounded w-50 mx-auto">
            <div class="card-body">
                <h2 class="card-title mb-4">Phonebook</h2>
                <Mangle v-slot="mangle"
                    :data="contacts"
                    :fuseOpts="fuseOpts"
                >
                    <Pagination :data="mangle.data">

                        <template #toolbar>
                            <div class="btn-group ml-auto">
                                <button
                                    v-for="num in 4"
                                    :key="num"
                                    class="btn btn-sm btn-outline-secondary"
                                    :class="num === ncols && 'active' | cn"
                                    @click="ncols = num"
                                    >{{ num }}</button>
                            </div>
                        </template>

                        <template #default="page">
                            <div v-if="mangle.data.length > 10" class="text-center lead mb-4">
                                {{ mangle.data.length }} contacts
                            </div>
                            <Columns :n="ncols" :data="page.data" v-slot="column">
                                <Contacts :data="column.data" />
                            </Columns>
                        </template>

                    </Pagination>
                </Mangle>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

import Contacts from '../components/Contacts';
import Columns from '../components/Columns';
import Pagination from '../components/Pagination';
import Mangle from '../components/Mangle';

import { fuseOpts } from '../config';

export default {
    name: 'Home',
    data() {
        return {
            ncols: 2,
            fuseOpts
        };
    },
    created() {
        if (this.isempty) {
            this.fetch();
        }
    },
    components: { Pagination, Columns, Contacts, Mangle },
    computed: {
        ...mapState([ 'loading' ]),
        ...mapState({ contacts: s => s.contacts.data }),
        ...mapGetters('contacts', [ 'isempty' ])
    },
    methods: {
        ...mapMutations('contacts', [ 'clear' ]),
        ...mapActions('contacts', [ 'fetch' ])
    }
}
</script>

