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
        created() {
            this.loadProperties(this.$route.query.url)
        },
        methods: {
            loadProperties: async function(url) {
                const response = await fetch(`http://localhost:3000/streams/properties?url=${encodeURIComponent(url)}`)
                const data = await response.json()
                console.log(data)
                data.forEach(prop => {
                    this.feature_options.push({text: prop.text, value: prop.value})
                })
            }
        }
    }

</script>

<style scoped>

</style>
