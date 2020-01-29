<template>
    <div v-if="contact" class="modal d-block">
        <div class="modal-content h-100">
            <div class="modal-header">
                <h5 class="modal-title">{{ contact | fullname }}</h5>
                <button class="close" @click="$router.go(-1)">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body h-100">
                <img class="border h-100" :src="contact.picture.large" />
            </div>
        </div>
    </div>
    <NotFound v-else />
</template>

<script>
import { mapGetters } from 'vuex';

import NotFound from './404';

export default {
    name: "BigPicture",
    components: {
        NotFound
    },
    props: {
        username: String
    },
    computed: {
        contact() { return this.getByUsername(this.username); },
        ...mapGetters('contacts', [ 'getByUsername' ])
    },
}
</script>
