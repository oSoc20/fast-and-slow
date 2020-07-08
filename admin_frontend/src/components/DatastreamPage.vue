<template>
  <div>
    <b-form>
      <b-row class="justify-content-md-center mb-5">
        <label><h1>Datastream</h1></label>
      </b-row>
      <b-row class="justify-content-md-center mb-5">
        <b-col>
          <label><b>Features</b></label>
          <b-form-radio-group :options="fragmentation_options" required></b-form-radio-group>
        </b-col>
        <b-col>
          <label><b>Fragmentation strategies</b></label>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>

</script>

<style scoped>

</style>
