<template>
    <div id="app">
        <div class="alert alert-danger" v-if="error">
            {{ error.message }}
            <button class="btn btn-link" @click="setError(null)">OK</button>
        </div>
        <RouterView v-else />
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    name: 'app',
    errorCaptured(err) { this.setError(err); },
    computed: mapState([ 'error' ]),
    methods: mapMutations([ 'setError' ])
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>
