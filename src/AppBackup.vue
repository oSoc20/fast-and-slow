<template>
    <vl-region>
        <vl-layout>
            <vl-grid mod-stacked>
                <vl-column>
                    <vl-title tag-name="h1">
                        Fast and slow
                    </vl-title>
                </vl-column>
                <vl-column>
                    <vl-title tag-name="h3">
                        What name do you want to give the event stream?
                    </vl-title>
                    <label class="vl-form__label" for="input-field-1">https://domainName/</label>
                    <vl-input-field v-model="streamNameInputField" id="input-field-1" name="input-field-1" />
                </vl-column>
                <vl-column>
                    <vl-title tag-name="h3">
                        Choose one or more fragmentation strategies for your event stream
                    </vl-title>
                    <span v-for="strategy in fragmentationStrategies" >
                        <vl-checkbox :key="strategy"
                            v-model="selectedChoices"
                            :name="strategy"
                            :value="strategy"
                            mod-block>
                            <label :for="strategy">{{strategy}}</label>
                        </vl-checkbox>
                    </span>
                    <vl-column>
                        <p>Selected fragmentations are: {{selectedChoices}}</p>
                    </vl-column>
                </vl-column>
                <vl-column>
                    <vl-title tag-name="h3">
                        Where can we fetch the event stream?
                    </vl-title>
                    <vl-grid mod-stacked>
                        <vl-column>
                            <vl-input-field v-model="streamEndpointInputField" id="input-field-2" name="input-field-2" mod-block/>
                        </vl-column>
                        <vl-column>
                            <vl-button @click="addStream" mod-narrow>Add stream</vl-button>
                        </vl-column>
                    </vl-grid>
                </vl-column>
                <vl-column>
                    <vl-title tag-name="h3">
                        An overview of the event streams
                    </vl-title>
                    <vl-data-table mod-line>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Endpoint</th>
                            <th>Fragmentations</th>
                            <th>Enabled?</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(stream, index) of streams" :key="stream">
                                <td>{{stream.name}}</td>
                                <td>{{stream.endpoint}}</td>
                                <td>{{stream.fragmentations}}</td>
                                <td><vl-checkbox :id="'checkbox-' + stream" name="checkbox-name-" v-model="stream.enabled" :val="stream.enabled" mod-switch></vl-checkbox></td>
                                <td><vl-button @click="deleteStream(index)" mod-narrow>Delete</vl-button></td>
                            </tr>
                        </tbody>
                    </vl-data-table>
                </vl-column>
            </vl-grid>
        </vl-layout>
    </vl-region>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
      return {
          fragmentationStrategies: ['prefix', 'suffix', 'n-gram', 'geospatial', 'time'],
          selectedChoices: [],
          streams: [
              {
                  name: 'https://domainName.com/address',
                  endpoint: 'http://base-registries-stream.osoc.be/address',
                  fragmentations: [],
                  enabled: true
              },
              {
                  name: 'https://domainName.com/sensorObservations',
                  endpoint: 'http://streams.datapiloten.be/observations',
                  fragmentations: [],
                  enabled: false
              },

          ],
          streamNameInputField: '',
          streamEndpointInputField: ''
      }
  },
  methods: {
      addStream(){
            this.streams.push({name: this.streamNameInputField,
                endpoint: this.streamEndpointInputField,
                fragmentations: this.selectedChoices,
                enabled: true
            });
            this.streamNameInputField = ''
            this.streamEndpointInputField = '';
            this.selectedChoices = [];

      },
      deleteStream(index){
        this.streams.splice(index, 1);
      }
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
</style>
