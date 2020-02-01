<template>
    <div id="app">
        <div class="alert alert-danger" v-if="error">
            {{ error.message }}
            <button class="btn btn-link" @click="setError(null)">OK</button>
        </div>
        <RouterView v-else />
        <div class="navbar fixed-bottom">
            <div class="ml-auto mr-2 mb-2 text-center">
                <a v-if="repoUrl" :href="repoUrl">
                    <img width="60" height="60" src="./assets/github.png" />
                </a>
                <small v-if="buildDesc" class="d-block text-muted mt-1">{{ buildDesc }}</small>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

import { repoUrl, buildDesc } from './config';

export default {
    name: 'app',
    errorCaptured(err) { this.setError(err); },
    computed: mapState([ 'error' ]),
    methods: mapMutations([ 'setError' ]),
    data() { 
        return { repoUrl, buildDesc };
    }
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
