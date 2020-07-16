<template>
    <vl-layout>
        <vl-grid mod-stacked>
            <vl-column>
                <vl-modal id="stream-modal">
                    <vl-form-grid>
                        <vl-column>
                            <vl-title tag-name="h2">Event stream</vl-title>
                            <vl-form-message-label for="input-field-stream-name">What name do you want to give the event
                                stream?
                            </vl-form-message-label>
                            <vl-input-field v-model="newStream.name" id="input-field-stream-name" name="input-field-stream-name"
                                            mod-block></vl-input-field>
                        </vl-column>

                        <vl-column>
                            <vl-form-message-label for="input-field-datastream-uri">What is the datastream URL?
                            </vl-form-message-label>
                            <vl-input-field v-model="newStream.url" id="input-field-datastream-uri" name="input-field-datastream-uri"
                                            mod-block></vl-input-field>
                        </vl-column>

                        <vl-column>
                            <vl-action-group mod-align-right>
                                <vl-button mod-secondary v-vl-modal-toggle="'stream-modal'">Cancel</vl-button>
                                <vl-button @click="submitStream" v-vl-modal-toggle="'stream-modal'">Add</vl-button>
                            </vl-action-group>
                        </vl-column>
                    </vl-form-grid>
                </vl-modal>
            </vl-column>
        </vl-grid>
    </vl-layout>
</template>

<script>
    export default {
        name: "DatastreamModal",
        data() {
            return {
                newStream: {
                    name: "",
                    url: ""
                }
            }
        },
        methods: {
            submitStream: async function (evt) {
                evt.preventDefault()

                const response = await fetch('http://localhost:3000/streams', {
                    method: 'post',
                    body: JSON.stringify({name: this.newStream.name, url: this.newStream.url}),
                    headers: {
                        'Content-Type': 'application/json'
                    }

                })
                const data = await response.json()
                if (!data.status === 'success') {
                    console.log("An error occurred when adding the data stream")
                }
                await this.$emit("getAllStreams")

            },
        }
    }
</script>

<style scoped>

</style>
