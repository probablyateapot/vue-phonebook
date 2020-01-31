<template>
    <div>
        <div class="row mb-3">
            <div class="col-8 offset-2">
                <div class="input-group mb">
                    <input type="text" class="form-control"
                        placeholder="Search by name..."
                        v-model="query"
                        @input="search"
                    />
                    <div class="input-group-append">
                        <button class="btn btn-primary" @click="search">
                            <span class="oi oi-magnifying-glass" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div v-if="advanced" class="px-1 mb-2 row">
                <div class="input-group input-group-sm col-5 offset-1">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Sort by</span>
                    </div>
                    <select v-model="sortbyfield" class="custom-select">
                        <option value="name">Name</option>
                        <option value="dob">Birthday</option>
                    </select>
                    <div class="input-group-append">
                        <button @click="toggleAsc"
                            class="btn btn-outline-secondary"
                            :class="sortorder === 'asc' && 'active' | cn"
                        >
                            <span class="oi oi-sort-ascending" />
                        </button>
                        <button @click="toggleDes"
                            class="btn btn-outline-secondary"
                            :class="sortorder === 'des' && 'active' | cn"
                        >
                            <span class="oi oi-sort-descending" />
                        </button>
                    </div>
                </div>
                <div class="input-group input-group-sm col-5">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Birthday</span>
                    </div>
                    <input type="date" class="form-control" :max="dob_to" v-model="dob_from" />
                    <input type="date" class="form-control" :min="dob_from" v-model="dob_to" />
                </div>
            </div>
        </div>
        <div class="text-center">
            <a href="#" @click.prevent="advanced = !advanced">
                {{ !advanced? 'Advanced options' : 'Hide' }}
            </a>
        </div>
        <hr />
        <slot v-if="mangled.length > 0" :data="mangled" />
        <div v-else class="lead text-center">Nothing found</div>
    </div>
</template>

<script>
import Fuse from 'fuse.js';

const fieldaccessor = {
    "name": d => [ d.name.first, d.name.last ].join(" "),
    "dob": d => d.dob.date
};

export default {
    name: "MangleData",
    props: {
        data: Array,
        debounce: {
            type: Number,
            default: 300
        },
        fuseOpts: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            query: "",
            dob_to: "",
            dob_from: "",
            advanced: false,
            debounce_timeout: null,
            frame: this.data.slice(0),
            sortbyfield: "name",
            sortorder: null
        };
    },
    computed: {
        fuse() { return new Fuse(this.data, this.fuseOpts); },
        mangled () {
            const from = new Date(this.dob_from !== ""? this.dob_from : "1900-01-01");
            const to = this.dob_to !== "" ? new Date(this.dob_to) : new Date();

            const filtered = this.frame.filter(d => {
                const date = new Date(d.dob.date);
                return from <= date && date <= to;
            });

            return this.sortorder === null
                ? filtered
                : filtered.sort((a, b) => {
                    const _a = fieldaccessor[this.sortbyfield](a);
                    const _b = fieldaccessor[this.sortbyfield](b);

                    const res = this.sortorder === "asc" ? _b < _a : _a < _b;
                    return res ? 1 : -1;
                });
        }
    },
    methods: {
        toggleAsc() { this.sortorder = this.sortorder === "asc" ? null : "asc"; },
        toggleDes() { this.sortorder = this.sortorder === "des" ? null : "des"; },
        search() {
            if (this.debounce_timeout) {
                clearTimeout(this.debounce_timeout);

                if (this.query === "") {
                    this.frame = this.data;
                    return;
                }
            }

            this.debounce_timeout = setTimeout(() => {
                this.frame = this.query !== ""
                    ? this.fuse.search(this.query)
                    : this.data.slice(0);
            }, this.debounce);
        }
    }
};
</script>
