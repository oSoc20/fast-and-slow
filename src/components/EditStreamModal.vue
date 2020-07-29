<template>
  <vl-layout>
    <vl-grid mod-stacked>
      <vl-column>
        <vl-modal id="editstream-modal">
          <vl-form-grid>
            <vl-form-validation-observer slim v-slot="{handleSubmit, errors, invalid}">
              <vl-column>
                <vl-form-message-label for="input-field-stream-name">
                  Do you want to rename the event
                  stream?
                </vl-form-message-label>

                <vl-form-validation
                  rules="required"
                  name="New event strean name"
                  v-slot="{errors, classes}"
                >
                  <vl-form-message-error v-if="errors">{{errors[0]}}</vl-form-message-error>
                  <vl-input-field
                    v-model="newName"
                    :class="classes"
                    id="input-field-stream-name"
                    name="input-field-stream-name"
                    mod-block
                  ></vl-input-field>
                </vl-form-validation>

                <vl-form-message-annotation>
                  This will change the name for every fragmentation. The old
                  URI
                  will still work.
                </vl-form-message-annotation>
              </vl-column>

              <vl-column>
                <vl-action-group mod-space-between>
                  <vl-action-group>
                    <vl-button mod-tertiary mod-narrow v-vl-modal-toggle="'confirm-modal'">Delete</vl-button>
                  </vl-action-group>
                  <vl-action-group mod-align-right>
                    <vl-button
                      @click="emptyFields"
                      mod-secondary
                      v-vl-modal-toggle="'editstream-modal'"
                    >Cancel</vl-button>
                    <vl-button
                      v-if="invalid"
                      mod-disabled
                      v-vl-modal-toggle="'editstream-modal'"
                    >Save</vl-button>
                    <vl-button
                      v-else
                      @click="updateStreamName"
                      v-vl-modal-toggle="'editstream-modal'"
                    >Save</vl-button>
                  </vl-action-group>
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
  name: "EditStreamModal",
  components: {},
  data() {
    var newName = "";
    return {
      newName,
    };
  },
  methods: {
    /**
     *
     * @returns {Promise<void>}
     */
    updateStreamName: async function () {
      const getStream = await fetch(
        `${process.env.VUE_APP_BACKEND_DOMAIN || "http://localhost:3000"}/streams/${this.$route.query.eventStreamName}`
      );
      const getStreamData = await getStream.json();

      if (getStreamData) {
        const response = await fetch(`${process.env.VUE_APP_BACKEND_DOMAIN || "http://localhost:3000"}/streams/`, {
          method: "post",
          body: JSON.stringify({
            name: this.newName,
            url: getStreamData.sourceURI,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const encodedUrl = "/event-stream?eventStreamName=" + this.newName;
        await this.$router.push(encodedUrl);
        window.location.reload();
      } else {
        console.log("An error occurred when adding the data stream");
      }

      // Empty the fields
      this.emptyFields();
    },
    /**
     *
     */
    emptyFields: function () {
      this.newName = "";
    },
  },
};
</script>

<style scoped>
</style>
