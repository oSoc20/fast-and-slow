<template>
    <div id="app">
        <Navbar class="mb-4"/>

        <b-container>
            <router-view />
<!--            <DatastreamInput/>-->
        </b-container>

    </div>
</template>

<script>
    import Navbar from "./components/Navbar";
    // import DatastreamInput from "./components/DatastreamInput";

    export default {
        name: 'App',
        components: {
            // DatastreamInput,
            Navbar,
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
