<template>
    <vl-layout>
        <vl-grid mod-stacked v-vl-equal-height:container>
            <vl-column>
                <!-- <vl-title tag-name="h1">Fast and Slow</vl-title> -->
                <vl-content-header
                        mod-large
                        mod-show-mobile
                        :background="{
                        src: 'https://source.unsplash.com/random/660x400',
                        srcset: 'https://source.unsplash.com/random/1800x500 1x, https://source.unsplash.com/random/3100x1000 2x',
                        alt: 'Content Header',
                    }">
                    <div class="vl-content-header__logo-wrapper">
                        <vl-content-header-entity
                                prefix="Vlaanderen"
                                title="Informatie Vlaanderen"
                                logo="true"
                                mod-small/>
                    </div>
                    <vl-content-header-title
                            title="Fast and Slow"
                            tag-name="h1"/>
                </vl-content-header>
            </vl-column>

            <vl-column>
                <vl-infoblock
                        icon="hourglass"
                        title="Event streams in progress">
                </vl-infoblock>
            </vl-column>

            <!-- TODO: a better key can be used here -->
            <vl-column width="4" v-for="line of inProgress" :key="line.name + line.fragmentation">
                <vl-info-tile
                        v-vl-equal-height
                        tag-name="div"
                        :title="line.name"
                        :subtitle="line.description">

                    <strong>Is loaded: </strong>
                    <vl-icon v-if="line.loaded" icon="check-circle" mod-large/>
                    <vl-icon v-else icon="ban" mod-large/>
                    <br>
                    <strong>Fragmentation: </strong> {{line.fragmentation}}
                </vl-info-tile>
            </vl-column>


            <vl-column width="10">
                <vl-infoblock
                        icon="compass"
                        title="Event stream overview">
                </vl-infoblock>
            </vl-column>
            <vl-column width="2">
                <vl-button v-vl-modal-toggle="'stream-modal'" icon="add" mod-icon-before
                           mod-narrow class="new_button">
                    Add new
                </vl-button>
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
                            <vl-icon v-if="stream.loaded" icon="check-circle" mod-large/>
                            <vl-icon v-else icon="ban" mod-large/>
                        </td>
                        <td>
                            <vl-button @click="viewDetails(stream.url)" mod-narrow> View details</vl-button>
                        </td>
                    </tr>
                    </tbody>
                </vl-data-table>
            </vl-column>
            <vl-column>
                <DatastreamModal @getAllStreams="getAllStreams"/>
            </vl-column>
        </vl-grid>
    </vl-layout>
</template>

<script>
    import DatastreamModal from "../components/DatastreamModal";

    export default {
        name: "Home",
        components: {DatastreamModal},
        data() {
            return {
                streams: [],
                inProgress: [
                    {
                        name: "Address",
                        description: "This event stream contains all the base registers of Flanders",
                        loaded: true,
                        fragmentation: "Time",

                    },
                    {
                        name: "SensorObservations",
                        description: "This event streams contains air quality data",
                        loaded: false,
                        fragmentation: "Geospatial",

                    },
                    {
                        name: "Address",
                        description: "This event stream contains all the base registers of Flanders",
                        loaded: true,
                        fragmentation: "Text",
                    }
                ]
            }
        },
        created() {
            this.getAllStreams()
        },
        methods: {
            setIcon: async function () {
                this.inProgress.forEach(item => {
                    if (item.loaded) {
                        item.template = "<strong>Description: </strong>" + item.description + "<br>" + "<strong>Is loaded: </strong>" + '<vl-icon icon="check-circle" mod-large> </vl-icon>' + '<br>' + "<strong>Fragmentation: </strong>" + item.fragmentation;
                    } else {
                        item.template = "<strong>Description: </strong>" + item.description + "<br>" + "<strong>Is loaded: </strong>" + '<vl-icon icon="alert-circle" mod-large </vl-icon>' + "<br>" + "<strong>Fragmentation: </strong>" + item.fragmentation;
                    }
                })
            },
            getAllStreams: async function () {
                const response = await fetch('http://localhost:3000/streams')
                const data = await response.json()

                this.streams = []
                for (const item in data) {
                    this.streams.push({
                        name: data[item].name,
                        url: data[item].url,
                        online: 10,
                        progress: 10,
                        loaded: true,
                    })
                }
                await this.setIcon()
            },
            viewDetails: function (url) {
                const encodedUrl = "/streams?eventStreamUrl=" + encodeURIComponent(url)
                this.$router.push(encodedUrl)
            }
        }
    }
</script>

<style lang="scss">

    @media screen and (min-width: 768px) {
        .new_button {
            margin-top: 4rem;
        }
    }

</style>
