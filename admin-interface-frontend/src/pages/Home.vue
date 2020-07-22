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
                        title="Fragmentations in progress">
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
                    <br>
                    <strong>Property: </strong> {{line.property}}
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
                            <vl-button @click="viewDetails(stream.name)" mod-narrow> View details</vl-button>
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
                inProgress: [],
                interval: null
            }
        },
        created() {
            this.getAllStreams()
            this.interval = setInterval(() => this.getAllStreams(), 1000*15);
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
                this.inProgress = []
                for (const item in data) {
                    const streamResponse = await fetch(`http://localhost:3000/streams/${data[item].name}/fragmentations`)
                    const streamData = await streamResponse.json()
                    let available = 0
                    let loading = 0

                    streamData.forEach(frag => {
                        console.log(frag)
                        if (frag.status === "LOADING"){
                            loading += 1
                            this.inProgress.push({
                                name: frag.name,
                                description: "",
                                loaded: false,
                                fragmentation: frag.kind,
                                property: frag.params.propertyLabel

                            })
                        } else if (data[item].status !== "ENABLED" && frag.status === "DISABLED") {
                            loading += 1
                            this.inProgress.push({
                                name: frag.name,
                                description: "",
                                loaded: false,
                                fragmentation: frag.kind,
                                property: frag.params.propertyLabel

                            })

                        } else if (frag.status === "ENABLED") {
                            available += 1
                        }
                    })
                    this.streams.push({
                        name: data[item].name,
                        url: data[item].sourceURI,
                        online: available,
                        progress: loading,
                        loaded: (data[item].status === "ENABLED"),
                    })

                }
                await this.setIcon()
            },
            viewDetails: function (name) {
                const encodedUrl = "/streams?eventStreamName=" + name
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
