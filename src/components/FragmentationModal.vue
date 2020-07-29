<template>
    <vl-layout>
        <vl-grid mod-stacked>
            <vl-column>
                <vl-modal id="fragmentation-modal">
                    <vl-form-grid>
                        <vl-form-validation-observer slim v-slot="{ handleSubmit, errors, invalid}">
                            <vl-column>
                                <vl-title tag-name="h2">New Fragmentation</vl-title>
                                <vl-form-message-label for="input-field-stream-name">
                                    What name do you want to give the
                                    Fragmentation?
                                </vl-form-message-label>
                                <br/>
                                <span>{{domainName}}/data/{{eventStreamName}}/</span>
                                <vl-form-validation
                                        rules="required"
                                        name="fragmentation name"
                                        v-slot="{ errors, classes }"
                                >
                                    <vl-form-message-error v-if="errors">{{errors[0]}}</vl-form-message-error>
                                    <vl-input-field
                                            :class="classes"
                                            id="input-field-fragmentation-name"
                                            name="input-field-fragmentation-name"
                                            v-model="fragmentationName"
                                    ></vl-input-field>
                                </vl-form-validation>
                            </vl-column>

                            <vl-column>
                                <vl-form-message-label>Fragmentation strategy</vl-form-message-label>
                                <vl-form-validation
                                        rules="required"
                                        name="fragmentation strategy"
                                        v-slot="{ errors, classes } "
                                >
                                    <vl-form-message-error v-if="errors">{{ errors[0] }}</vl-form-message-error>
                                    <vl-radio-tile
                                            v-for="(strategy, index) in strategies"
                                            :key="strategy.text"
                                            :class="classes"
                                            v-model="selectedStrategy"
                                            :name="'radio-tile-name-strategy' + index"
                                            :value="strategy.value"
                                            :id="'vl-radio-tile-strategy' + index"
                                            :title="strategy.text"
                                    ></vl-radio-tile>
                                </vl-form-validation>
                            </vl-column>

                            <vl-column>
                                <vl-form-message-label>Property</vl-form-message-label>
                                <vl-form-validation
                                        rules="required"
                                        name="fragmentation property"
                                        v-slot="{ errors, classes } "
                                >
                                    <vl-form-message-error v-if="errors">{{ errors[0] }}</vl-form-message-error>
                                    <vl-radio-tile
                                            v-for="(property, index) in properties"
                                            :key="property.text"
                                            :class="classes"
                                            v-model="selectedProperty"
                                            :name="'radio-tile-name-property' + index"
                                            :value="{uri: property.value[property.value.length - 1], name: property.text}"
                                            :id="'vl-radio-tile-property' + index"
                                            :title="property.text"
                                    ></vl-radio-tile>
                                </vl-form-validation>
                            </vl-column>

                            <vl-column>
                                <vl-action-group mod-align-right>
                                    <vl-button @click="emptyFields" mod-secondary
                                               v-vl-modal-toggle="'fragmentation-modal'">Cancel
                                    </vl-button>
                                    <template>
                                        <vl-button v-if="invalid" mod-disabled
                                                   v-vl-modal-toggle="'fragmentation-modal'">Add
                                        </vl-button>
                                        <vl-button
                                                v-else
                                                @click="addFragmentation"
                                                v-vl-modal-toggle="'fragmentation-modal'"
                                        >Add
                                        </vl-button>
                                    </template>
                                </vl-action-group>
                            </vl-column>
                        </vl-form-validation-observer>
                    </vl-form-grid>
                </vl-modal>
            </vl-column>
        </vl-grid>
    </vl-layout>
</template>

<script>
    export default {
        name: "FragmentationModal",
        data() {
            var domainName = "";
            var fragmentationName;
            var eventStreamName;
            var properties = [];
            var strategies = [
                {text: "PREFIX", value: "PREFIX"},
                {text: "SUFFIX", value: "SUFFIX"},
                {text: "NGRAM - minLength: 2, maxLength: 4", value: "NGRAM"},
                {text: "TIME_INTERVAL - interval: 20 min", value: "TIME_INTERVAL"},
                {text: "XYZ_TILE - minZoom: 13, maxZoom: 15", value: "XYZ_TILE"},
                {text: "IDENTITY", value: "IDENTITY"},
            ];
            var selectedProperty;
            var selectedStrategy;
            return {
                domainName,
                fragmentationName,
                eventStreamName,
                properties,
                strategies,
                selectedProperty,
                selectedStrategy
            };
        },
        /**
         * Called on mount of component
         * Sets the domain name to be used
         */
        mounted() {
            this.loadProperties(this.$route.query.eventStreamName)
            this.domainName = process.env.VUE_APP_BACKEND_DOMAIN
            this.eventStreamName = this.$route.query.eventStreamName
        },
        methods: {
            /**
             * Load all the properties present in the current eventstream
             * @param name: name of the eventstream
             * @returns {Promise<void>}
             */
            loadProperties: async function (name) {
                const response = await fetch(
                    `${process.env.VUE_APP_BACKEND_DOMAIN || "http://localhost:3000"}/streams/${name}`
                );
                const data = await response.json();
                console.log(data)
                data.properties.forEach(prop => {
                    this.properties.push({text: prop.text, value: prop.value});
                });
            },
            /**
             * Add a fragmentation for the current eventstream
             * @returns {Promise<void>}
             */
            addFragmentation: async function () {
                const response = await fetch(`${process.env.VUE_APP_BACKEND_DOMAIN || "http://localhost:3000"}/streams/${this.$route.query.eventStreamName}/fragmentations`, {
                    method: "post",
                    body: JSON.stringify({
                        name: this.fragmentationName,
                        strategy: this.selectedStrategy,
                        property: this.selectedProperty.uri,
                        propertyLabel: this.selectedProperty.name
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                console.log(data)
                if (!data.status === "success") {
                    console.log("An error occurred when adding the fragmentation");
                } else {
                    this.emptyFields();
                }

                await this.$emit("getFragmentations", this.$route.query.eventStreamName)
            },
            /**
             * Empty the form input fields
             */
            emptyFields: function () {
                this.fragmentationName = ""
                this.selectedProperty = ''
                this.selectedStrategy = ''
            }

        },
    };
</script>

<style scoped>
</style>
