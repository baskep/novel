<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app'
};
</script>

<style lang="scss">
@import './assets/css/reset.css';
@import './assets/css/common.css';

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #dadada; 
    opacity:1; 
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #dadada;
    opacity:1;
}

input:-ms-input-placeholder{
    color: #dadada;
    opacity:1;
}

input::-webkit-input-placeholder{
    color: #dadada;
    opacity:1;
}
</style>
