import Vue from "vue";
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () =>
                import('./components/DatastreamInput')
        },
        {
            path: '/streams/',
            component: () =>
                import('./components/DatastreamPage')
        }
    ]
});

export default router