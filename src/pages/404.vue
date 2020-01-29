<template>
    <div>
        <h1 class="mb-4">Not Found!</h1>
        <button class="btn btn-link" @click="$router.replace({ name: 'home' })">Go to main page</button>
    </div>
</template>

<script>
export default { name: 'NotFound' }
</script>

