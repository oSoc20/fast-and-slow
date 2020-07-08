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
            path: '/stream/:id',
            component: () =>
                import('./components/DatastreamInput')
        }
    ]
});

export default router