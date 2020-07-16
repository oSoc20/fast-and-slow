<template>
  <vl-layout>
    <vl-grid mod-stacked>
      <vl-column>
        <vl-content-header
          mod-large
          mod-show-mobile
          :background="{
                        src: 'https://source.unsplash.com/random/660x400',
                        srcset: 'https://source.unsplash.com/random/1800x500 1x, https://source.unsplash.com/random/3100x1000 2x',
                        alt: 'Content Header',
                    }"
        >
          <div class="vl-content-header__logo-wrapper">
            <vl-content-header-entity
              prefix="Vlaanderen"
              title="Informatie Vlaanderen"
              logo="true"
              mod-small
            />
          </div>
          <div @click="goBack()" class="Back">
            <vl-content-header-title title="Fast and Slow" tag-name="h1" />
          </div>
        </vl-content-header>
      </vl-column>

      <vl-column>
        <vl-button @click="goBack()" class="Go-Back" mod-secondary mod-narrow>Back</vl-button>
      </vl-column>

      <vl-column>
        <vl-infoblock icon="list-bullets" title="Collections"></vl-infoblock>
      </vl-column>
      <vl-column width="3">
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
            v-vl-modal-toggle="'fragmentation-modal'"
          >New fragmentation</vl-button>
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
    return {
      streams: [],
      fragmentations: [],
      selectedStream: ""
    }
  },
  created() {
    this.getAllStreams(this.$route.query.eventStreamUrl);
    this.getFragmentations(this.$route.query.eventStreamUrl);
  },
  methods: {
    deleteFragmentation(index) {
      this.fragmentations.splice(index, 1);
    },
    changeStream(index) {
      this.selectedStream = this.streams[index].name;
    },
    goBack() {
      return this.$router.go(-1);
    },

    getFragmentations: async function(url) {
      const response = await fetch(
        `http://localhost:3000/streams/fragmentation?url=${encodeURIComponent(
          url
        )}`
      );
      const data = await response.json();
      const fragmentations = data.fragmentations;
      this.fragmentations = [];
      fragmentations.forEach(frag => {
        this.fragmentations.push({
          endpoint: frag.url,
          strategy: frag.strategy,
          property: frag.property,
          enabled: frag.enabled
        });
      });
    },
    enableFragmentation: async function() {
      const response = await fetch(
        "http://localhost:3000/fragmentation/enable",
        {
          method: "post",
          body: JSON.stringify({
            url: "http://example.com/fragmentations/testconfig",
            enabled: false
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const data = await response.json();
      if (!data.status === "success") {
        console.log(
          "An error occurred changing the status of the fragmentation"
        );
      }
    },
    getAllStreams: async function(url) {
      const response = await fetch("http://localhost:3000/streams");
      const data = await response.json();

      this.streams = [];
      for (const item in data) {
        let add_stream = {
          name: data[item].name,
          url: data[item].url
        }
        this.streams.push(add_stream);
        if (add_stream.url === url) {
          this.selectedStream = this.streams[0].name
        }
      }
    }
  }
};
</script>

<style lang="scss">
span.vl-icon.vl-vi.vl-vi-up-down-arrows {
  justify-content: start !important;
}

.Go-Back {
  margin-top: 1.5rem;
}
div.Back:hover {
  cursor: pointer;
}
</style>
