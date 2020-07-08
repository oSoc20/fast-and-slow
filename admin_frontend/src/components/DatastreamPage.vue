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
    import rdfDereferencer from "rdf-dereference";
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
            this.fetchStream(this.$route.query.url)
        },
        methods: {
            fetchStream: async function (url) {
                this.isBusy = true
                console.log(url)
                try {
                    const {quads} = await rdfDereferencer.dereference(url)
                    quads.on('data', (quad) => {
                        if (quad.predicate.value === 'https://www.w3.org/ns/shacl#path' && quad.object.value.includes('sosa')) {
                            console.log(quad)
                            const splitted = quad.object.value.split('/')
                            this.feature_options.push({text: splitted[splitted.length - 1], value: quad.object.value})
                        }
                        //remove spinner
                        this.isBusy = false;
                    })
                } catch (e) {
                    console.error(e)
                }
            },
        }
    }

</script>

<style scoped>

</style>
