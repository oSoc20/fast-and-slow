<template>
    <div>
        <b-row class="justify-content-md-center mb-5">
            <b-col cols="5">
                <b-input-group size="lg">
                    <b-form-input></b-form-input>
                </b-input-group>
            </b-col>
            <b-col cols="3">
                <b-input-group size="lg">
                    <b-form-input></b-form-input>
                </b-input-group>
            </b-col>
            <b-col cols="2">
                <b-button size="lg" variant="primary">Add</b-button>
            </b-col>
        </b-row>

        <b-row class="justify-content-md-center mb-5">
            <!-- V-slot to provide custom rendering for particular field -->
            <b-col cols="5">
                <b-table :fields="fields" :items="items">
                    <template v-slot:cell(streams) = "row">
                        {{ row.item.name }}
                    </template>
                    <template v-slot:cell(action) = "row">
                        <b-button size="sm" @click="remove(row.item, row.index, $event.target)" class="mr-1">
                            Remove
                        </b-button>
                    </template>
                </b-table>
            </b-col>

            <b-col cols="5">
                <b-form-checkbox-group :options="options">
                </b-form-checkbox-group>
            </b-col>

        </b-row>
        <b-row class="justify-content-md-center mb-5">
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
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "DatastreamInput",
        data() {
            return {
                items: [
                    {name: "Datastream 1"},
                    {name: "Datastream 2"},
                    {name: "Datastream 3"},
                    {name: "Datastream 4"}
                ],
                options: [
                    {text: "Datastream 1", value:"Datastream 1"},
                    {text: "Datastream 2", value:"Datastream 2"},
                    {text: "Datastream 3", value:"Datastream 3"},
                    {text: "Datastream 4", value:"Datastream 4"}
                ],
                fragment_status: [
                    {URI: "Datastream 1", status:"Done"},
                    {URI: "Datastream 2", status:"In progress"},
                    {URI: "Datastream 3", status:"Queued"},
                    {URI: "Datastream 4", status:"Queued"}
                ],
                fields: [
                    { key: 'streams', label: 'Datastreams' },
                    { key: 'action', label: 'Action' }
                ]
            }
        },
    }
</script>

<style scoped>

</style>