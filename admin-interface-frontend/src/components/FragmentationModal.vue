<template>
    <vl-layout>
        <vl-grid mod-stacked>
            <vl-column>
                <vl-modal id="fragmentation-modal">
                    <vl-form-grid>
                        <vl-column>
                            <vl-title tag-name="h2">New Fragmentation</vl-title>
                            <vl-form-message-label for="input-field-stream-name">What name do you want to give the
                                Fragmentation?
                            </vl-form-message-label>
                            <br>
                            <span>{{domainName}}</span>
                            <vl-input-field id="input-field-fragmentation-name" name="input-field-fragmentation-name"
                                            v-model="fragmentationName"></vl-input-field>
                        </vl-column>

                        <vl-column>
                            <vl-form-message-label>Fragmentation strategy</vl-form-message-label>
                            <vl-radio-tile v-for="(strategy, index) in strategies" :key="strategy"
                                           v-model="selectedStrategy"
                                           :name="'radio-tile-name-strategy' + index"
                                           :value="strategy"
                                           :id="'vl-radio-tile-strategy' + index"
                                           :title="strategy"
                            >
                            </vl-radio-tile>
                        </vl-column>

                        <vl-column>
                            <vl-form-message-label>Property</vl-form-message-label>
                            <vl-radio-tile v-for="(property, index) in properties" :key="property.text"
                                           v-model="selectedProperty"
                                           :name="'radio-tile-name-property' + index"
                                           :value="property.value[property.value.length - 1]"
                                           :id="'vl-radio-tile-property' + index"
                                           :title="property.text"
                            >
                            </vl-radio-tile>
                        </vl-column>

                        <vl-column>
                            <vl-action-group mod-align-right>
                                <vl-button mod-secondary v-vl-modal-toggle="'fragmentation-modal'">Cancel</vl-button>
                                <vl-button @click="addFragmentation" v-vl-modal-toggle="'fragmentation-modal'">Add
                                </vl-button>
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
        name: "FragmentationModal",
        data() {
            var domainName = "";
            var fragmentationName;
            var properties = [];
            var strategies = [
                "Strategy1",
                "Strategy2",
                "wa4tgb43ag4nghj,8k8r67kwetwetewtwtwetwetwetsxdgb",
                "Strategy4",
                "sey54ery7u5rt4eu8787niewtewtewweewttwtewezsxse34",
            ];
            var selectedProperty;
            var selectedStrategy;
            return {
                domainName,
                fragmentationName,
                properties,
                strategies,
                selectedProperty,
                selectedStrategy
            };
        },
        created() {
            this.loadProperties(this.$route.query.eventStreamName)
            this.loadDomain()
        },
        methods: {
            loadDomain: async function () {
                const response = await fetch(
                    `http://localhost:3000/domain`
                );
                const data = await response.json();
                console.log(data)
                this.domainName = data
            },
            loadProperties: async function (name) {
                const response = await fetch(
                    `http://localhost:3000/streams/${name}`
                );
                const data = await response.json();
                console.log(data)
                data.properties.forEach(prop => {
                    this.properties.push({text: prop.text, value: prop.value});
                });
            },
            addFragmentation: async function () {
                console.log(`http://localhost:3000/streams/${this.$route.query.eventStreamName}/fragmentations?
                    name=${this.fragmentationName}&property=${encodeURIComponent(this.selectedProperty)}&strategy=${this.selectedStrategy}`)
            //     const response = await fetch(`http://localhost:3000/streams/${this.$route.query.eventStreamName}/fragmentations?
            //         name=${this.fragmentationName}&property=${this.selectedProperty}&strategy=${this.selectedStrategy}`, {
            //         method: "post",
            //     });
            //     const data = await response.json();
            //     console.log(data)
            //     if (!data.status === "success") {
            //         console.log("An error occurred when adding the fragmentation");
            //     } else {
            //         this.fragmentationName = ""
            //         this.selectedProperty = ''
            //         this.selectedStrategy = ''
            //     }
            //
            //     await this.$emit("getFragmentations", this.$route.query.eventStreamUrl)
            },

        },
    }
</script>

<style scoped>

</style>
