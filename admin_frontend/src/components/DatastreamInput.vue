<template>
    <div>
        <b-form @submit="submitUrl">
            <b-row class="justify-content-md-center mb-5">
                <b-col cols="5">
                    <b-input-group size="lg">
                        <b-form-input v-model="urlForm.url" placeholder="Datastream URI"></b-form-input>
                    </b-input-group>
                </b-col>
                <b-col cols="3">
                    <b-input-group size="lg">
                        <b-form-input v-model="urlForm.name" placeholder="Name"></b-form-input>
                    </b-input-group>
                </b-col>
                <b-col cols="2">
                    <b-button type="submit" size="lg" variant="primary">Add</b-button>
                </b-col>
            </b-row>
        </b-form>

        <b-form>
            <b-row class="justify-content-md-center mb-5">
                <!-- V-slot to provide custom rendering for particular field -->
                <b-col cols="10">
                    <b-table :fields="fields" :items="items">
                        <template v-slot:cell(streams)="row">
                            {{ row.item.name }}
                        </template>
                        <template v-slot:cell(url)="row">
                            {{ row.item.url }}
                        </template>
                        <template v-slot:cell(action)="row">
                            <b-button variant="outline-secondary" size="sm" @click="edit(row.item, row.index)"
                                      class="mr-1">
                                Edit
                            </b-button>
                        </template>
                    </b-table>
                </b-col>

                <!--                <b-col cols="5">-->
                <!--                    <b-row class="justify-content-md-center mb-5">-->
                <!--                        <b-form-group>-->
                <!--                            <label><b>Fragmentation options</b></label>-->
                <!--                            <b-form-radio-group :options="fragmentation_options" required>-->
                <!--                            </b-form-radio-group>-->
                <!--                        </b-form-group>-->
                <!--                    </b-row>-->
                <!--                    <b-row class="justify-content-md-center mb-5">-->
                <!--                        <b-form-group>-->
                <!--                            <label><b>Feature options</b></label>-->

                <!--                            &lt;!&ndash; show spinner if loading &ndash;&gt;-->
                <!--                            <template v-if="isBusy">-->
                <!--                                <div>-->
                <!--                                    <b-spinner ></b-spinner>-->
                <!--                                </div>-->
                <!--                            </template>-->

                <!--                            <b-form-checkbox-group v-else :options="feature_options" required>-->
                <!--                            </b-form-checkbox-group>-->
                <!--                            -->
                <!--                        </b-form-group>-->
                <!--                    </b-row>-->

                <!--                </b-col>-->

            </b-row>
            <!-- <b-row class="justify-content-md-center mb-5">
                <b-col cols="5">
                    <b-button variant="primary">Build fragmentation</b-button>
                </b-col>
                <b-col cols="5">
                    This will display a unique URI
                </b-col>
            </b-row>
            <b-row class="justify-content-md-center mb-5">
                <b-col cols="10">
                    <b-table :items="fragment_status"></b-table>
                </b-col>
            </b-row> -->
        </b-form>
    </div>
</template>

<script>
    import 'setimmediate';

    export default {
        name: "DatastreamInput",
        data() {
            return {
                urlForm: {
                    url: '',
                    name: ''
                },
                items: [],
                fragmentation_options: [
                    {text: "Datastream 1", value: "Datastream 1"},
                    {text: "Datastream 2", value: "Datastream 2"},
                    {text: "Datastream 3", value: "Datastream 3"},
                    {text: "Datastream 4", value: "Datastream 4"}
                ],
                feature_options: [],
                fragment_status: [{URI: "Datastream 1", status: "Done"},
                    {URI: "Datastream 2", status: "In progress"},
                    {URI: "Datastream 3", status: "Queued"},
                    {URI: "Datastream 4", status: "Queued"}],
                fields: [
                    {key: 'streams', label: 'Datastreams'},
                    {key: 'url', label: 'Url'},
                    {key: 'action', label: 'Action'}
                ],
                isBusy: false
            }
        },
        created() {
            this.getAllStreams();
        },
        methods: {
            getAllStreams: async function () {
                const response = await fetch('http://localhost:3000/streams')
                const data = await response.json()

                this.items = []
                for (const item in data) {
                    this.items.push({name: data[item].name, url: data[item].url})
                }
            },
            submitUrl: async function (evt) {
                evt.preventDefault()

                const response = await fetch('http://localhost:3000/streams', {
                    method: 'post',
                    body: JSON.stringify({name: this.urlForm.name, url: this.urlForm.url}),
                    headers: {
                        'Content-Type': 'application/json'
                    }

                })
                const data = await response.json()
                if (!data.status === 'success') {
                    console.log("An error occurred when adding the data stream")
                }
                await this.getAllStreams()

            },
            edit(item, index) {
                const encodedUrl = "/streams/?url=" + encodeURIComponent(this.items[index].url)
                this.$router.push(encodedUrl)
            }
        },

    }
</script>

<style scoped>

</style>