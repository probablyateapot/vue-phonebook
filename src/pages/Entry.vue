<template>
    <div v-if="contact" class="card w-50 mx-auto">
        <div class="row p-4">
            <div class="col-4">
                <img
                    class="w-100 border rounded-circle"
                    :style="{ cursor: 'pointer' }"
                    :src="contact.picture.medium"
                    @click="openpicture"
                />
            </div>
            <div class="col-8">
                <h3 class="card-title text-center mt-1">{{ contact | fullname }}</h3>
                <h5 class="card-subtitle text-center">{{ contact | dob }}</h5>
                <hr>
                <div class="row lead text">
                    <div class="col-4 text-right">
                        <span class="oi oi-envelope-open mr-2"/>
                        Email:
                    </div>
                    <div class="col-8 text-left text-nowrap text-truncate">
                        {{ contact.email }}
                    </div>
                </div>
                <div class="row lead">
                    <div class="col-4 text-right">
                        <span class="oi oi-phone mr-2"/>
                        Phone:
                    </div>
                    <div class="col-8 text-left">
                        {{ contact.phone }}
                    </div>
                </div>
                <button @click="$router.go(-1)" class="btn btn-link text-center mt-3">Back</button>
            </div>
        </div>
    </div>
    <NotFound v-else />
</template>

<script>
import { mapGetters } from 'vuex';

import NotFound from './404';

export default {
    name: 'Entry',
    props: {
        username: String
    },
    components: {
        NotFound
    },
    computed: {
        contact() { return this.getByUsername(this.username); },
        ...mapGetters('contacts', [ 'getByUsername' ])
    },
    methods: {
        openpicture() {
            const { username } = this.contact.login;
            this.$router.push({
                name: 'contactpicture',
                params: { username }
            });
        }
    }
}
</script>

