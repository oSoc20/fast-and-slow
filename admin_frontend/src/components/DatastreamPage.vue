<template>
    <div>
        <b-form>
            <b-row class="justify-content-md-center mb-5">
                <label><h1>Datastream</h1></label>
            </b-row>
            <b-row class="justify-content-md-center mb-5">
                <b-col>
                    <label><b>Features</b></label>
                    <b-form-radio-group :options="fragmentation_options" required></b-form-radio-group>
                </b-col>
                <b-col>
                    <b-form-group>
                        <label><b>Feature options</b></label>

                        <!-- show spinner if loading -->
                        <template v-if="isBusy">
                            <div>
                                <b-spinner></b-spinner>
                            </div>
                        </template>

                        <b-form-checkbox-group v-else :options="feature_options" required>
                        </b-form-checkbox-group>

                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
    import 'setimmediate';


    export default {
        name: "DatastreamInput",
        data() {
            return {
                fragmentation_options: [
                    {text: "Datastream 1", value: "Datastream 1"},
                    {text: "Datastream 2", value: "Datastream 2"},
                    {text: "Datastream 3", value: "Datastream 3"},
                    {text: "Datastream 4", value: "Datastream 4"}
                ],
                feature_options: [],
                isBusy: false
            }
        },
        created() {
            this.loadProperties(this.$route.query.url)
        },
        methods: {
            loadProperties: async (url) => {
                const response = await fetch('http://localhost:3000/streams', {
                    method: 'get',
                    body: JSON.stringify({url: url}),
                    headers: {
                        'Content-Type': 'application/json'
                    }

                })
                const data = await response.json()
                for (const prop in data) {
                    this.feature_options.push({text: prop, value: data[prop]})
                }
            }
        }
    }

</script>

<style scoped>

</style>
