<template>
    <ul v-if="data.length > 0" class="list-unstyled mb-0">
        <li v-for="(c, i) in data"
            :key="c.login.uuid"
            class="media w-75 mx-auto"
            :class="i > 0 && 'mt-3' | cn"
            :style="{ cursor: 'pointer' }"
            @click="gotoprofile(c)"
        >
            <img class="mr-3 rounded-circle" :src="c.picture.thumbnail" />
            <div class="media-body text-left overflow-hidden">
                <h5 class="mt-0 mb-0 text-nowrap text-truncate">{{ c | fullname }}</h5>
                <small class="text-mute">{{ c | dob }}</small>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    name: "Contacts",
    props: { data: Array },
    methods: {
        gotoprofile(contact) {
            const { username } = contact.login;

            this.$router.push({
                name: 'details',
                params: { username }
            });
        }
    }
};
</script>
