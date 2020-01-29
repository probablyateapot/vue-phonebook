<template>
    <div v-if="data && data.length > 0" class="row">
        <div v-for="(col, index) in cols" :key="index" :class="bscn">
            <slot :data="col" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Columns",
    props: {
        data: Array,
        n: {
            type: Number,
            default: 2,
            validator: v => v >= 1 && v <= 4
        }
    },
    computed: {
        bscn() { return 'col-' + ((12 / this.n) >> 0); },
        cols() {
            const nelements = ((this.data.length + this.n - 1) / this.n) >> 0;

            return Array.from(new Array(this.n))
                .map((_, col) => this.data.slice(col * nelements, (col + 1) * nelements))
        }
    }
}
</script>
