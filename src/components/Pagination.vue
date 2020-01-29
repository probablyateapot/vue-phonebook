<template>
    <div>
        <nav class="btn-toolbar mb-4">
            <div class="input-group input-group-sm">
                <div class='input-group-prepend'>
                    <span class='input-group-text'>Show per page</span>
                </div>
                <select class='btn custom-select' :value="preset" @change="reset">
                    <option v-for="val in presets" :key="val" :value="val">{{ val }}</option>
                </select>
            </div>
            <slot name="toolbar" />
            <ul v-if="data.length > preset" class="pagination pagination-sm mb-0 ml-auto">
                <PageLink :disabled="page <= 1" :to="page - 1" @click="page--">
                    <span aria-hidden="true">&laquo;</span>
                </PageLink>
                <PageLink v-if="page >= 3" :to="1" @click="page = 1" />
                <PageLink v-if="page > 3" disabled>
                    <span aria-hidden="true">&hellip;</span>
                </PageLink>
                <PageLink v-if="page > 1" :to="page - 1" @click="page--" />
                <PageLink :to="page" active />
                <PageLink v-if="page < total" :to="page + 1" @click="page++" />
                <PageLink v-if="page < total - 2" disabled>
                    <span aria-hidden="true">&hellip;</span>
                </PageLink>
                <PageLink v-if="page <= total - 2" :to="total" @click="page = total"/>
                <PageLink :disabled="page >= total" :to="page + 1" @click="page++">
                    <span aria-hidden="true">&raquo;</span>
                </PageLink>
            </ul>
        </nav>
        <slot :data="frame" />
    </div>
</template>

<script>
import PageLink from './PageLink';

export default {
    name: "Pagination",
    components: { PageLink },
    data () {
        return {
            preset: this.presets[this.presets.length >> 1],
            page: 1
        };
    },
    props: {
        data: Array,
        presets: {
            type: Array,
            default: () => [ 10, 20, 30, 50 ],
            validator: a => a.every(n => typeof n === 'number')
        }
    },
    computed: {
        total() {
            const n = parseInt(this.preset);
            return ((this.data.length + n - 1) / n) >> 0;
        },
        frame() {
            return this.data.slice((this.page - 1) * this.preset, this.page * this.preset);
        }
    },
    methods: {
        reset(e) {
            const newValue = parseInt(e.target.value);
            const oldValue = this.page;

            this.preset = newValue;
            this.page = ((this.page - 1) * oldValue / newValue + 1) >> 0;
        }
    }
};
</script>
