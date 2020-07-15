<template>
    <vl-layout>
        <vl-grid mod-stacked v-vl-equal-height:container>
            <vl-column>
                <vl-title tag-name="h1">Fast and Slow</vl-title>
            </vl-column>


            <vl-column>
                <vl-title tag-name="h2">Event streams in progress</vl-title>
            </vl-column>
            <vl-column width="4" v-for="line of inProgress" :key="line">
                <vl-info-tile
                    v-vl-equal-height
                    tag-name="div"
                    :title="line.name"
                    :subtitle="line.description"
                    class="custom-tile"> 

                    <span class="info-tile-span-custom">
                        <strong>Is loaded: </strong>
                        <vl-icon v-if="line.loaded" icon="check-circle" mod-large />
                        <vl-icon v-else icon="alert-circle" mod-large />
                        <br>
                        <strong>Fragmentation: </strong> {{line.fragmentation}}
                    </span>
                </vl-info-tile>
            </vl-column>
            








            <vl-column width="10">
                <vl-title tag-name="h2">
                    Event stream overview
                </vl-title>
            </vl-column>
            <vl-column width="2">
                <vl-button v-vl-positioning:float-right v-vl-modal-toggle="'stream-modal'" icon="add" mod-icon-before mod-narrow>Add new</vl-button>
            </vl-column>
            <vl-column>
                <vl-data-table mod-line>
                    <thead>
                    <tr>
                        <th>Collection</th>
                        <th>Available fragmentations</th>
                        <th>fragmentations in progress</th>
                        <th>Loaded</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="stream of streams" :key="stream.name">
                            <td>{{stream.name}}</td>
                            <td>{{stream.online}}</td>
                            <td>{{stream.progress}}</td>
                            <td>
                                <vl-icon v-if="stream.loaded" icon="check-circle" mod-large />
                                <vl-icon v-else icon="alert-circle" mod-large />
                            </td>
                            <td>
                                <vl-button to="/stream" mod-narrow> View details</vl-button>
                            </td>
                        </tr>
                    </tbody>
                </vl-data-table>
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
        var streams = [
                {
                    name: "Address",
                    online: 5,
                    progress: 2,
                    loaded: true,
                    url: 'http://base-registries-stream.osoc.be/address'
                },
                {
                    name: "Observations",
                    online: 0,
                    progress: 10,
                    loaded: false,
                    url: 'http://streams.datapiloten.be/observations'
                }
            ];
        var inProgress = [
                {
                    name: "Address",
                    description:"This event stream contains all the base registers of Flanders",
                    loaded: true,
                    fragmentation: "Time",

                },
                {
                    name: "SensorObservations",
                    description:"This event streams contains air quality data",
                    loaded: false,
                    fragmentation: "Geospatial",

                },
                {
                    name: "Address",
                    description:"This event stream contains all the base registers of Flanders",
                    loaded: true,
                    fragmentation: "Text",
                }
            ];
        inProgress.forEach(item => {
            if(item.loaded){
                item.template = "<strong>Description: </strong>" + item.description + "<br>" + "<strong>Is loaded: </strong>" + '<vl-icon icon="check-circle" mod-large> </vl-icon>' + '<br>' + "<strong>Fragmentation: </strong>" + item.fragmentation;
            }
            else{
                item.template = "<strong>Description: </strong>" + item.description + "<br>" + "<strong>Is loaded: </strong>" + '<vl-icon icon="alert-circle" mod-large </vl-icon>' + "<br>" + "<strong>Fragmentation: </strong>" + item.fragmentation;
            }
            
        });

        return {
            streams,
            inProgress
        }
    }
}
</script>

<style lang="scss">

    vl-info-tile.custom-tile{
        position: relative;
    }

    span.info-tile-span-custom{
        position: absolute;
        bottom: 0;
        right: 0;
    }
</style>