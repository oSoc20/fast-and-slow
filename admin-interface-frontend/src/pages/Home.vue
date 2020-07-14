<template>
    <vl-layout>
        <vl-grid mod-stacked>
            <vl-column>
                <vl-title tag-name="h1">Fast and Slow</vl-title>
            </vl-column>
            <vl-column>
                <vl-title tag-name="h2">Event stream overview</vl-title>
            </vl-column>
            <vl-column>
                <vl-data-table mod-line>
                    <thead>
                    <tr>
                        <th>Collection</th>
                        <th>Online</th>
                        <th>Progress</th>
                        <th>Hidden</th>
                        <th>Loaded</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="stream of streams" :key="stream.name">
                            <td>{{stream.name}}</td>
                            <td>{{stream.online}}</td>
                            <td>{{stream.progress}}</td>
                            <td>{{stream.hidden}}</td>
                            <td>
                                <vl-icon v-if="stream.loaded" icon="check-circle" mod-large />
                                <vl-icon v-else icon="alert-circle" mod-large />
                            </td>
                            <td>
                                <vl-button icon="nav-right" to="/stream" mod-icon></vl-button>
                            </td>
                        </tr>
                    </tbody>
                </vl-data-table>
            </vl-column>
            <vl-column v-vl-align:center>
                <vl-button v-vl-modal-toggle="'stream-modal'" icon="add" mod-icon></vl-button>
            </vl-column>
            <vl-column>
                <DatastreamModal/>
            </vl-column>
        </vl-grid>
    </vl-layout>
</template>

<script>
import DatastreamModal from "../components/DatastreamModal";
    export default {
    name: "Home",
    components: {DatastreamModal},
    data () {
        return{
            streams:[
                {
                    name: "Address",
                    online: 5,
                    progress: 2,
                    hidden: 0,
                    loaded: true,
                    url: 'http://base-registries-stream.osoc.be/address'
                },
                {
                    name: "Observations",
                    online: 0,
                    progress: 10,
                    hidden: 2,
                    loaded: false,
                    url: 'http://streams.datapiloten.be/observations'
                }
            ],
        }
    }
}
</script>

<style scoped>

</style>