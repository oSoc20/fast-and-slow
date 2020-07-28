<template>
    <vl-layout>
        <vl-grid mod-stacked>
            <vl-column>
                <vl-content-header
                        mod-large
                        mod-show-mobile
                        :background="{
                        src: 'https://source.unsplash.com/random/660x400',
                        srcset: 'https://source.unsplash.com/random/1800x500 1x, https://source.unsplash.com/random/3100x1000 2x',
                        alt: 'Content Header',
                    }"
                >
                    <div class="vl-content-header__logo-wrapper">
                        <vl-content-header-entity
                                prefix="Vlaanderen"
                                title="Informatie Vlaanderen"
                                logo="true"
                                mod-small
                        />
                    </div>
                    <div @click="goBack()" class="Back">
                        <vl-content-header-title title="Fast and Slow" tag-name="h1"/>
                    </div>
                </vl-content-header>
            </vl-column>

            <vl-column>
                <vl-button @click="goBack()" class="Go-Back" mod-secondary mod-narrow>Back</vl-button>
            </vl-column>

            <vl-column>
                <template v-if="errorHasOccured">
                    <vl-column>
                        <vl-alert
                            icon='warning'
                            close-text='close warning'
                            title="An error has occured while handling your request, please verify!"
                            mod-naked
                            mod-error>
                            {{errorMessage}}
                        </vl-alert>
                    </vl-column>
                </template>
            </vl-column>

            <vl-column>
                <vl-infoblock icon="list-bullets" title="Collections"></vl-infoblock>
            </vl-column>
            <vl-column width="9">
                <vl-action-group>
                    <vl-dropdown-navigation :label="selectedStream">
                        <vl-link-list>
                            <vl-link-list-item v-for="(stream, index) in streams" :key="stream.name">
                                <vl-link @click="changeStream(index)" mod-block href="#">{{stream.name}}</vl-link>
                            </vl-link-list-item>
                        </vl-link-list>
                    </vl-dropdown-navigation>
                    <vl-button
                            icon="file-edit"
                            mod-icon-before
                            mod-narrow
                            v-vl-modal-toggle="'editstream-modal'"
                            class="edit-button"
                    >Edit
                    </vl-button>
                </vl-action-group>
            </vl-column>
            <vl-column width="3">
                <vl-button
                        icon="add"
                        mod-icon-before
                        mod-narrow
                        v-vl-modal-toggle="'fragmentation-modal'"
                        v-vl-positioning:float-right
                >New fragmentation
                </vl-button>
            </vl-column>
            <vl-column>
                <strong>Datastream:</strong> <vl-link :href="this.streamURL" target="_blank">{{decodeURI(this.streamURL)}}</vl-link>
            </vl-column>
            <vl-column>
                <vl-data-table mod-line>
                    <thead>
                    <tr>
                        <th>Fragmentation strategy</th>
                        <th>Property</th>
                        <th>Endpoint</th>
                        <th>Enabled</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(fragmentation, index) of fragmentations" :key="fragmentation.name">
                        <td>{{fragmentation.strategy}}</td>
                        <td>{{fragmentation.property}}</td>
                        <td>
                            <vl-link :href="fragmentation.endpoint" target="_blank">{{decodeURI(fragmentation.endpoint)}}</vl-link>
                        </td>
                        <td v-if="!fragmentation.loading">
                            <vl-checkbox
                                    :id="'checkbox-' + fragmentation"
                                    :name="'checkbox-name-' + fragmentation"
                                    v-model="fragmentation.enabled"
                                    :val="fragmentation.enabled"
                                    mod-switch
                                    @input="enableFragmentation(fragmentation.enabled, fragmentation.name)"
                            ></vl-checkbox>
                        </td>
                        <td v-else>Loading</td>
                        <td>
                            <vl-button @click="deleteFragmentation(index)" mod-narrow>Delete</vl-button>
                        </td>
                    </tr>
                    </tbody>
                </vl-data-table>
            </vl-column>
            <vl-column>
                <EditStreamModal @getAllStreams="getAllStreams"></EditStreamModal>
            </vl-column>
            <vl-column>
                <FragmentationModal @getFragmentations="getFragmentations"></FragmentationModal>
            </vl-column>
            <vl-column>
                <ConfirmModal></ConfirmModal>
            </vl-column>
        </vl-grid>
    </vl-layout>
</template>

<script>
    import EditStreamModal from "../components/EditStreamModal";
    import FragmentationModal from "../components/FragmentationModal";
    import ConfirmModal from "../components/ConfirmModal";

    export default {
        name: "Datastream",
        components: {EditStreamModal, FragmentationModal, ConfirmModal},
        data() {
            return {
                streams: [],
                fragmentations: [],
                selectedStream: "",
                errorHasOccured: false,
                errorMessage: "",
                fragInterval: null,
                streamURL: ""

            }
        },
        created() {
            this.streamURL = encodeURI(`${process.env.VUE_APP_BACKEND_DOMAIN || "http://localhost:3000"}/data/${this.$route.query.eventStreamName}`)
            this.getAllStreams(decodeURIComponent(this.$route.query.eventStreamName));
            this.getFragmentations(decodeURIComponent(this.$route.query.eventStreamName));
            this.fragInterval = setInterval(() => this.getFragmentations(decodeURIComponent(this.$route.query.eventStreamName)), 1000 * 15);

        },
        beforeDestroy() {
            clearInterval(this.fragInterval)
        },
        methods: {
            deleteFragmentation(index) {
                this.fragmentations.splice(index, 1);
            },
            changeStream(index) {
                this.selectedStream = this.streams[index].name;
                const encodedUrl = encodeURI("/event-stream?eventStreamName=" + this.selectedStream)
                return this.$router.push(encodedUrl)
            },
            goBack() {
                return this.$router.push('/');
            },

            getFragmentations: async function (name) {
                const response = await fetch(
                    `${process.env.VUE_APP_BACKEND_DOMAIN || "http://localhost:3000"}/streams/${encodeURIComponent(name)}/fragmentations`
                );
                const data = await response.json();
                console.log(data)
                this.fragmentations = [];
                data.forEach(frag => {
                    let endpoint = `${process.env.VUE_APP_BACKEND_DOMAIN || "http://localhost:3000"}/data/${encodeURIComponent(name)}/${encodeURIComponent(frag.name)}`

                    if(frag.status ==="failure"){
                            this.errorHasOccured = true;
                            this.errorMessage = frag.msg;
                        }

                    this.fragmentations.push({
                        endpoint: endpoint,
                        strategy: frag.kind,
                        name: frag.name,
                        property: frag.params.propertyLabel,
                        enabled: (frag.status === "ENABLED"),
                        loading: frag.status === "LOADING"
                    });
                });
            },
            enableFragmentation: async function (state, fragName) {
                console.log(state, fragName)
                const response = await fetch(
                    `${process.env.VUE_APP_BACKEND_DOMAIN || "http://localhost:3000"}/streams/${encodeURIComponent(this.$route.query.eventStreamName)}/fragmentations/${encodeURIComponent(fragName)}/enable`,
                    {
                        method: "post",
                        body: JSON.stringify({
                            enabled: String(state)
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
                const data = await response.json();
                console.log(data)
                if (!data.status === "success") {
                    console.log(
                        "An error occurred changing the status of the fragmentation"
                    );
                }
                await this.getFragmentations(decodeURIComponent(this.$route.query.eventStreamName))
            },
            getAllStreams: async function (name) {
                const response = await fetch(`${process.env.VUE_APP_BACKEND_DOMAIN || "http://localhost:3000"}/streams`);
                const data = await response.json();
                this.streams = [];
                for (const item in data) {

                    if(data[item].status === "failure"){
                        this.errorHasOccured = true;
                        this.errorMessage = data[item].msg;
                        break;
                    }

                    let add_stream = {
                        name: data[item].name,
                        url: data[item].sourceURI
                    }
                    this.streams.push(add_stream);
                    if (add_stream.name === name) {
                        this.selectedStream = add_stream.name
                    }
                }
            },
            toggleInput: function (id) {
                this.$refs[id][0].$vnode.elm.disabled = false;
            }
        }
    };
</script>

<style lang="scss">
    span.vl-icon.vl-vi.vl-vi-up-down-arrows {
        justify-content: start !important;
    }

    .Go-Back {
        margin-top: 1.5rem;
    }

    .Go-Back {
        margin-top: 1.5rem;
    }

    div.Back:hover {
        cursor: pointer;
    }

    .edit-button {
        margin-top: -3rem;
    }
</style>
