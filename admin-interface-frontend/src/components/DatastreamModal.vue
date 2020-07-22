<template>
  <vl-layout>
    <vl-grid mod-stacked>
      <vl-column>
        <vl-modal id="stream-modal">
          <vl-form-grid>
            <vl-column>
              <vl-form-validation-observer slim v-slot="{ handleSubmit, errors, invalid}">
                  <vl-column>
                    <vl-title tag-name="h2">Event stream</vl-title>
                    <vl-form-message-label for="input-field-stream-name">
                      What name do you want to give the event
                      stream?
                    </vl-form-message-label>

                    <vl-form-validation
                      rules="required"
                      name="Event stream name"
                      v-slot="{ errors, classes }"
                    >
                      <vl-form-message-error v-if="errors">{{errors[0]}}</vl-form-message-error>
                      <vl-input-field
                        :class="classes"
                        v-model="newStream.name"
                        id="input-field-stream-name"
                        name="input-field-stream-name"
                        mod-block
                      />
                    </vl-form-validation>
                  </vl-column>

                  <!-- regex found on: https://www.w3resource.com/javascript-exercises/javascript-regexp-exercise-9.php -->
                  <vl-column>
                    <vl-form-validation
                      :rules="{required: true, regex: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/ }"
                      name="Event stream URL"
                      v-slot="{errors, classes}"
                    >
                      <vl-form-message-error v-if="errors">{{errors[0]}}</vl-form-message-error>
                      <vl-form-message-label
                        for="input-field-datastream-uri"
                      >What is the datastream URL?</vl-form-message-label>
                      <vl-input-field
                        :class="classes"
                        v-model="newStream.url"
                        id="input-field-datastream-uri"
                        name="input-field-datastream-uri"
                        mod-block
                      ></vl-input-field>
                    </vl-form-validation>
                  </vl-column>

                  <vl-column>
                    <vl-action-group mod-align-right>
                      <vl-button @click="emptyFields" mod-secondary v-vl-modal-toggle="'stream-modal'">Cancel</vl-button>
                      <vl-button v-if="invalid">fouten</vl-button>
                      <vl-button v-if="!invalid" @click="submitStream" v-vl-modal-toggle="'stream-modal'">Add</vl-button>
                    </vl-action-group>
                  </vl-column>
              </vl-form-validation-observer>
            </vl-column>
          </vl-form-grid>
        </vl-modal>
      </vl-column>
    </vl-grid>
  </vl-layout>
</template>

<script>
export default {
  name: "DatastreamModal",
  data() {
    return {
      newStream: {
        name: "",
        url: ""
      }
    };
  },
  methods: {
    submitStream: async function() {
      console.log("called");
      //evt.preventDefault()

      const response = await fetch("http://localhost:3000/streams", {
        method: "post",
        body: JSON.stringify({
          name: this.newStream.name,
          url: this.newStream.url
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (!data.status === "success") {
        console.log("An error occurred when adding the data stream");
      }
      

      await this.$emit("getAllStreams");
      // Empty the fields
      this.emptyFields();
      //window.location.reload();
    },
    emptyFields: function(){
        this.newStream.name = "";
        this.newStream.url = "";
    },
  }
};
</script>

<style scoped>
</style>
