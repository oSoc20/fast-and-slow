<template>
    <vl-layout>
        <vl-grid mod-stacked>
            <vl-column>
                <vl-modal id="editstream-modal">
                    <vl-form-grid>
                        <vl-column>
                            <vl-form-message-label for="input-field-stream-name">Do you want to rename the event stream?</vl-form-message-label>
                            <vl-input-field id="input-field-stream-name" name="input-field-stream-name" mod-block></vl-input-field>
                            <vl-form-message-annotation>This will change the name for every fragmentation. The old URI will still work.</vl-form-message-annotation>
                        </vl-column>
                        <vl-column width="2">
                            <vl-action-group>
                                <vl-button mod-tertiary mod-narrow>Delete</vl-button>
                            </vl-action-group>
                        </vl-column>
                        <vl-column width="10">
                                <vl-action-group mod-align-right>
                                <vl-button mod-secondary v-vl-modal-toggle="'editstream-modal'">Cancel</vl-button>
                                <vl-button>Save</vl-button>
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
    name: "EditStreamModal"
}
</script>

<style scoped>

</style>
