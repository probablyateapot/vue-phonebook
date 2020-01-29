<template>
    <li class="page-item"
        :class="[ disabled && 'disabled', !disabled && active && 'active' ] | cn">
        <a class='page-link' href='#' @click.prevent="$emit('click')">
            <slot>{{ to }}</slot>
        </a>
    </li>
</template>

<script>
export default {
    name: "PageLink",
    props: {
        active: Boolean,
        disabled: Boolean,
        to: Number,
    }
};
</script>
