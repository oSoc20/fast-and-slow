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
                <br />
                <span>{{domainName}}</span>
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
                    :key="strategy"
                    :class="classes"
                    v-model="selectedStrategy"
                    :name="'radio-tile-name-strategy' + index"
                    :value="strategy"
                    :id="'vl-radio-tile-strategy' + index"
                    :title="strategy"
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
                    :value="property.text"
                    :id="'vl-radio-tile-property' + index"
                    :title="property.text"
                    ></vl-radio-tile>
                </vl-form-validation>
              </vl-column>

              <vl-column>
                <vl-action-group mod-align-right>
                  <vl-button @click="emptyFields" mod-secondary v-vl-modal-toggle="'fragmentation-modal'">Cancel</vl-button>
                  <template>
                    <vl-button v-if="invalid" mod-disabled v-vl-modal-toggle="'fragmentation-modal'">Add</vl-button>
                    <vl-button
                      v-else
                      @click="addFragmentation"
                      v-vl-modal-toggle="'fragmentation-modal'"
                    >Add</vl-button>
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
    var fragmentationName = "";
    var properties = [];
    var strategies = [
      "Strategy1",
      "Strategy2",
      "wa4tgb43ag4nghj,8k8r67kwetwetewtwtwetwetwetsxdgb",
      "Strategy4",
      "sey54ery7u5rt4eu8787niewtewtewweewttwtewezsxse34"
    ];
    var selectedProperty = "";
    var selectedStrategy = "";
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
    this.loadProperties(this.$route.query.eventStreamUrl);
    this.loadDomain();
  },
  methods: {
    loadDomain: async function() {
      const response = await fetch(`http://localhost:3000/domain`);
      const data = await response.json();
      console.log(data);
      this.domainName = data;
    },
    loadProperties: async function(url) {
      const response = await fetch(
        `http://localhost:3000/streams/properties?url=${encodeURIComponent(
          url
        )}`
      );
      const data = await response.json();
      data.forEach(prop => {
        this.properties.push({ text: prop.text, value: prop.value });
      });
    },
    addFragmentation: async function() {
      const response = await fetch("http://localhost:3000/fragmentation", {
        method: "post",
        body: JSON.stringify({
          url: this.fragmentationName,
          stream: this.$route.query.eventStreamUrl,
          strategy: this.selectedStrategy,
          property: this.selectedProperty
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (!data.status === "success") {
        console.log("An error occurred when adding the fragmentation");
      } else {
        this.emptyFields();
      }

      await this.$emit("getFragmentations", this.$route.query.eventStreamUrl);
    },
    emptyFields: function(){
        this.fragmentationName = "";
        this.selectedProperty = "";
        this.selectedStrategy = "";
    }
  }
};
</script>

<style scoped>
</style>
