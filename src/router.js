import Vue from "vue";
import Router from 'vue-router'
import Home from "./pages/Home";
import Datastream from "./pages/Datastream";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path:'/streams',
            name: "EventstreamDetails",
            props: true,
            component: Datastream
        }
    ]
});

export default router
