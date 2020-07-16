<template>
  <vl-layout>
    <vl-grid mod-stacked>
      <!-- <vl-column width="1">
        <vl-button @click="goBack()" class="Go-Back" mod-secondary mod-narrow>Back</vl-button>
      </vl-column>
      <vl-column width="11">
        <span @click="goBack()" class="Back">
          <vl-title tag-name="h1">Fast and Slow</vl-title>
        </span>
      </vl-column> -->
      <vl-column>
        <vl-content-header
                    mod-large
                    mod-show-mobile
                    :background="{
                        src: 'https://source.unsplash.com/random/660x400',
                        srcset: 'https://source.unsplash.com/random/1800x500 1x, https://source.unsplash.com/random/3100x1000 2x',
                        alt: 'Content Header',
                    }">
                    <div class="vl-content-header__logo-wrapper">
                        <vl-content-header-entity
                        prefix="Vlaanderen"
                        title="Informatie Vlaanderen"
                        logo="true"
                        mod-small/>
                    </div>
                    <div @click="goBack()" class="Back"> 
                        <vl-content-header-title
                        title="Fast and Slow"
                        tag-name="h1"/>
                    </div>
                    
                </vl-content-header>
      </vl-column>

      <vl-column>
        <vl-button @click="goBack()" class="Go-Back" mod-secondary mod-narrow>Back</vl-button>
      </vl-column>


      <vl-column>
            <vl-infoblock
                icon="list-bullets"
                title="Collections">
            </vl-infoblock>
      </vl-column>
      <vl-column width = "3">
          <vl-dropdown-navigation :label="selectedStream">
            <vl-link-list>
              <vl-link-list-item v-for="(stream, index) in streams" :key="stream.name">
                <vl-link @click="changeStream(index)" mod-block href="#">{{stream.name}}</vl-link>
              </vl-link-list-item>
            </vl-link-list>
          </vl-dropdown-navigation>
      </vl-column>
      <vl-column width="9">
        <vl-action-group mod-space-between>
            <vl-button
            icon="file-edit"
            mod-icon-before
            mod-narrow
            v-vl-modal-toggle="'editstream-modal'"
          >Edit</vl-button>

          <vl-button
          icon="add"
          mod-icon-before
          mod-narrow
          v-vl-modal-toggle="'fragmentation-modal'">
          New fragmentation</vl-button>
        </vl-action-group>
          
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
                  :name="'checkbox-name-' + fragmentation"
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
      <vl-column>
        <EditStreamModal></EditStreamModal>
      </vl-column>
      <vl-column>
        <FragmentationModal></FragmentationModal>
      </vl-column>
    </vl-grid>
  </vl-layout>
</template>

<script>
import EditStreamModal from "../components/EditStreamModal";
import FragmentationModal from "../components/FragmentationModal";
export default {
  name: "Datastream",
  components: { EditStreamModal, FragmentationModal },
  data() {
    var streams =  [
        {
          name: "Address",
          url: "http://base-registries-stream.osoc.be/address"
        },
        {
          name: "Observations",
          url: "http://streams.datapiloten.be/observations"
        }
    ];

    var fragmentations = [
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
    ];
    var selectedStream = streams[0].name;
    return {
      streams,
      fragmentations,
      selectedStream
    };
  },
  props:{
    eventStreamUrl:{
      type: String,
      required: true
    }
  },
  methods: {
    deleteFragmentation(index) {
      this.fragmentations.splice(index, 1);
    },
    changeStream(index){
      this.selectedStream = this.streams[index].name;
    },
    goBack(){
      return this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">

  span.vl-icon.vl-vi.vl-vi-up-down-arrows{
    justify-content: start !important;
  }

  .Go-Back{
    margin-top: 1.5rem;
  }
  div.Back:hover{
    cursor: pointer;
  }

</style>
