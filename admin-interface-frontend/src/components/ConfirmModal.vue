<template>
    <vl-layout>
        <vl-grid mod-stacked>
            <vl-column>
                <vl-modal id="confirm-modal">
                    <vl-form-grid>
                        <vl-column>
                            <vl-form-message-label>
                                Do you really want to remove the event stream?
                            </vl-form-message-label>
                        </vl-column>

                        <vl-column>
                            <vl-action-group mod-align-right>
                                <vl-button v-vl-modal-toggle="'confirm-modal'">No</vl-button>
                                <vl-button v-vl-modal-toggle="'confirm-modal'" mod-secondary>Yes</vl-button>
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
    name: "ConfirmModal",
    methods: {
        //TODO: send remove to backend and go to home page
    }
};
</script>

<style scoped>

</style>
