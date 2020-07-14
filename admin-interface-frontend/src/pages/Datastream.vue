<template>
  <vl-layout>
    <vl-grid mod-stacked>
      <vl-column>
        <vl-title tag-name="h1">Fast and Slow</vl-title>
      </vl-column>

      <vl-column>
        <vl-action-group mod-space-between>
          <vl-dropdown-navigation label="Collections">
            <vl-link-list>
              <vl-link-list-item v-for="stream in streams" :key="stream.name">
                <vl-link mod-block href="#">{{stream.name}}</vl-link>
              </vl-link-list-item>
            </vl-link-list>
          </vl-dropdown-navigation>
          <vl-button
            v-vl-positioning:float-right
            icon="file-edit"
            mod-icon-before
            mod-narrow
            v-vl-modal-toggle="'editstream-modal'"
          >Edit</vl-button>
        </vl-action-group>
      </vl-column>
      <vl-column>
        <EditStreamModal></EditStreamModal>
      </vl-column>
      <vl-column>
        <vl-data-table mod-line>
          <thead>
            <tr>
              <th>Fragmentation strategy</th>
              <th>Properties</th>
              <th>Endpoint</th>
              <th>Enabled</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(fragmentation, index) of fragmentations" :key="fragmentation.name">
              <td>{{fragmentation.strategy}}</td>
              <td>{{fragmentation.properties}}</td>
              <td>{{fragmentation.endpoint}}</td>
              <td>
                <vl-checkbox
                  :id="'checkbox-' + fragmentation"
                  name="checkbox-name-"
                  v-model="fragmentation.enabled"
                  :val="fragmentation.enabled"
                  mod-switch
                ></vl-checkbox>
              </td>
              <td>
                <vl-button @click="deleteFragmentation(index)" mod-narrow>Delete</vl-button>
              </td>
            </tr>
          </tbody>
        </vl-data-table>
      </vl-column>
    </vl-grid>
  </vl-layout>
</template>

<script>
import EditStreamModal from "../components/EditStreamModal";
export default {
  name: "Datastream",
  components: { EditStreamModal },
  data() {
    return {
      streams: [
        {
          name: "Address",
          url: "http://base-registries-stream.osoc.be/address"
        },
        {
          name: "Observations",
          url: "http://streams.datapiloten.be/observations"
        }
      ],
      fragmentations: [
        {
          strategy: "Geospatial",
          endpoint: "http://base-registries-stream.osoc.be/address",
          properties: [],
          enabled: true
        },
        {
          strategy: "Time",
          endpoint: "http://streams.datapiloten.be/observations",
          properties: "sensorObservations",
          enabled: false
        }
      ]
    };
  },
  methods: {
    deleteFragmentation(index) {
      this.fragmentations.splice(index, 1);
    }
  }
};
</script>

<style scoped>
</style>
