import Vue from "vue";
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () =>
                import('./pages/Home')
        },
        {
            path:'/streams',
            name: "EventstreamDetails",
            props: true,
            component: () =>
                import('./pages/Datastream')
        }
    ]
});

export default router
