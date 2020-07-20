<template>
    <vl-region>
        <router-view />
    </vl-region>
</template>



<script>

export default {
    name: 'App',
    components: {
    }
}
</script>



<style lang="scss">
    $vl-icon-font-location: "assets/";
    @import "~@govflanders/vl-ui-core/src/scss/core";
    @import "~@govflanders/vl-ui-titles/src/scss/titles";
    @import "~@govflanders/vl-ui-input-field/src/scss/input-field";
    @import "~@govflanders/vl-ui-checkbox/src/scss/checkbox";
    @import "~@govflanders/vl-ui-data-table/src/scss/data-table";
    @import "~@govflanders/vl-ui-button/src/scss/button";
    @import "~@govflanders/vl-ui-input-group/src/scss/input-group";
    @import "~@govflanders/vl-ui-form-message/src/scss/form-message";
    @import "~@govflanders/vl-ui-util/src/scss/util";
    @import "~@govflanders/vl-ui-action-group/src/scss/action-group";
    @import "~@govflanders/vl-ui-dropdown-navigation/src/scss/dropdown-navigation";
    @import "~@govflanders/vl-ui-link-list/src/scss/link-list";
    @import "~@govflanders/vl-ui-link/src/scss/link";
    @import "~@govflanders/vl-ui-icon/src/scss/icon";
    @import "~@govflanders/vl-ui-popover/src/scss/popover";
    @import "~@govflanders/vl-ui-modal/src/scss/modal";
    @import "~@govflanders/vl-ui-info-tile/src/scss/info-tile";
    @import "~@govflanders/vl-ui-infoblock/src/scss/infoblock";
    @import "~@govflanders/vl-ui-radio/src/scss/radio";
    @import "~@govflanders/vl-ui-content-header/src/scss/content-header";
    @import "~@govflanders/vl-ui-dynamic-label/src/scss/dynamic-label";
    @import "~@govflanders/vl-ui-properties/src/scss/properties";
    @import "~@govflanders/vl-ui-input-addon/src/scss/input-addon";
    @import "~@govflanders/vl-ui-tooltip/src/scss/tooltip";
</style>
