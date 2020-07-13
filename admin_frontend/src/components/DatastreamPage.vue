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
            /**
             * Combine nested parameters
             * @param features
             * @param nodes
             * @param properties
             * @returns {{}}: parameter: [URI's defining that parameter]
             */
            combine: function (features, nodes, properties) {

                const parameter_list = {}
                for (const key in features) {
                    // Check if feature is not defining
                    if (features[key].grouped === false) {
                        let current = key;
                        let url_list = [features[current].subject]
                        let stop = false
                        // See if features can be linked together
                        while (!stop) {
                            if (current !== key) {
                                features[current].grouped = true
                            }
                            if (current in properties) {
                                if (properties[current] in nodes) {
                                    url_list.push(features[nodes[properties[current]]].subject)
                                    current = nodes[properties[current]]
                                    continue
                                }
                            }
                            stop = true
                        }
                        // Determine show value of a feature
                        let value = this.getShowValue(url_list)
                        parameter_list[value] = url_list
                    }


                }
                return parameter_list
            },

            /**
             * Generate a display name for a list of property URI's
             * @param url_list
             * @returns {string}: name for the parameter
             */
            getShowValue: function (url_list) {
                let returnValue = ""
                // Get parameter from every URI and combine them
                url_list.reverse().forEach(url => {
                    const split_token = (url.includes('#')) ? '#' : '/'
                    const value = url.split(split_token).pop()
                    returnValue = returnValue.concat(value + ' - ')
                })
                return returnValue.substring(0, returnValue.length - 3)
            },

            /**
             * Fetch a specific data stream and add parameters to list
             * @param url: Url that defines the data stream
             * @returns {Promise<void>}
             */
            fetchStream: async function (url) {
                this.isBusy = true
                const features = {}
                const nodes = {}
                const properties = {}
                try {
                    const {quads} = await rdfDereferencer.dereference(url)
                    quads.on('data', (quad) => {
                        if (quad.predicate.value === 'https://www.w3.org/ns/shacl#node') {
                            nodes[quad.object.value] = quad.subject.value
                        } else if (quad.predicate.value === 'https://www.w3.org/ns/shacl#property') {
                            properties[quad.object.value] = quad.subject.value
                        } else if (quad.predicate.value === 'https://www.w3.org/ns/shacl#path') {
                            features[quad.subject.value] = {'subject': quad.object.value, 'grouped': false}
                        }
                    })
                        .on('end', () => {
                            //remove spinner
                            this.isBusy = false;

                            const feature_values = this.combine(features, nodes, properties)
                            console.log(feature_values)
                            for (const feature in feature_values) {
                                this.feature_options.push({text: feature, value: feature_values[feature]})
                            }
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
