<template>
    <div>
        <b-form>
            <b-row class="justify-content-md-center mb-5">
                <label><h1>Datastream</h1></label>
            </b-row>
            <b-row class="justify-content-md-center mb-5">
                <b-col>
                    <label><b>Strategies</b></label>
                    <b-form-radio-group :options="fragmentation_options" required></b-form-radio-group>
                </b-col>
                <b-col>
                    <b-form-group>
                        <label><b>Feature options</b></label>

                        <!-- show spinner if loading -->
                        <b-form-checkbox-group :options="feature_options" required>
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
        async created() {
            // functions are correct but not waiting for each other
            await this.loadProperties(this.$route.query.url)
            await this.addFragmentation()
            await this.getFragmentations(this.$route.query.url)
            await this.enableFragmentation();
        },
        methods: {
            loadProperties: async function (url) {
                const response = await fetch(`http://localhost:3000/streams/properties?url=${encodeURIComponent(url)}`)
                const data = await response.json()
                console.log("properties: ", data)
                data.forEach(prop => {
                    this.feature_options.push({text: prop.text, value: prop.value})
                })
            },
            getFragmentations: async function (url) {
                const response = await fetch(`http://localhost:3000/streams/fragmentation?url=${encodeURIComponent(url)}`)
                const data = await response.json()
                const fragmentations = data.fragmentations
                console.log("fragmentations: ", fragmentations)
                fragmentations.forEach(frag => {
                    console.log(frag)
                })
            },
            addFragmentation: async function () {
                const response = await fetch('http://localhost:3000/fragmentation', {
                    method: 'post',
                    body: JSON.stringify({
                        "url": "testconfig",
                        "stream": "http://base-registries-stream.osoc.be/address?page=1",
                        "strategy": "teststrategy",
                        "property": "testproperty"
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                if (!data.status === 'success') {
                    console.log("An error occurred when adding the fragmentation")
                }
            },
            enableFragmentation: async function() {
                const response = await fetch('http://localhost:3000/fragmentation/enable', {
                    method: 'post',
                    body: JSON.stringify({
                        "url": "http://example.com/fragmentations/testconfig",
                        "enabled": false
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                if (!data.status === 'success') {
                    console.log("An error occurred changing the status of the fragmentation")
                }
            }
        }
    }

</script>

<style scoped>

</style>
