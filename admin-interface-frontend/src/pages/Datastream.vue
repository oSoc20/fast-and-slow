<template>
    <vl-layout>
        <vl-grid mod-stacked>
            <vl-column>
                <vl-title tag-name="h1">Fast and Slow</vl-title>
            </vl-column>

            <vl-column>
                <vl-dropdown-navigation label="Collections">
                    <vl-link-list>
                        <vl-link-list-item>
                                test
                        </vl-link-list-item>
                        <vl-link-list-item>
                                test2
                        </vl-link-list-item>
                    </vl-link-list>
                </vl-dropdown-navigation>
            </vl-column>

            <vl-column>
                <vl-data-table mod-line>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Endpoint</th>
                        <th>Fragmentations</th>
                        <th>Enabled?</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(fragmentation, index) of fragmentations" :key="fragmentation.name">
                            <td>{{fragmentation.name}}</td>
                            <td>{{fragmentation.endpoint}}</td>
                            <td>{{fragmentation.fragmentations}}</td>
                            <td><vl-checkbox :id="'checkbox-' + fragmentation" name="checkbox-name-" v-model="fragmentation.enabled" :val="fragmentation.enabled" mod-switch></vl-checkbox></td>
                            <td><vl-button @click="deleteFragmentation(index)" mod-narrow>Delete</vl-button></td>
                        </tr>
                    </tbody>
                </vl-data-table>
            </vl-column>
        </vl-grid>
    </vl-layout>
</template>

<script>
    export default {
    name: "Datastream",
        data () {
        return{
            streams:[
                {
                    name: "Address",
                    url: 'http://base-registries-stream.osoc.be/address'
                },
                {
                    name: "Observations",
                    url: 'http://streams.datapiloten.be/observations'
                }
            ],
            fragmentations:[
                {
                  name: 'Geospatial',
                  endpoint: 'http://base-registries-stream.osoc.be/address',
                  fragmentations: [],
                  enabled: true
              },
              {
                  name: 'SensorObservations',
                  endpoint: 'http://streams.datapiloten.be/observations',
                  fragmentations: [],
                  enabled: false
              },
            ]
        }
    },
    methods: {
        deleteFragmentation(index){
            this.fragmentations.splice(index, 1);
        }
    }
}
</script>

<style scoped>

</style>
