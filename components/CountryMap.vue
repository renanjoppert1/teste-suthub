<script>
export default {
  props: {
    country: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      countryData: {
        name: "",
        latlng: []
      },
      zoom: 6
    };
  },
  watch: {
    country: function(to) {
      console.log(to.area);
      if (to.area < 150) {
        this.zoom = 10;
      } else if (to.area < 10000) {
        this.zoom = 11;
      }else if (to.area < 14000) {
        this.zoom = 8;
      } else if (to.area < 3000000) {
        this.zoom = 4;
      }else{
        this.zoom = 4
      }
      this.countryData = to;
    }
  }
};
</script>

<template>
  <v-col md="6" id="map" v-if="this.countryData.latlng.length > 0">
    <v-card>
      <h2>{{ countryData.name }}</h2>
      <div style="width: 100%; position: relative;">
        <gmap-map
          v-if="this.countryData.latlng.length > 0"
          :center="{
            lat: this.countryData.latlng[0],
            lng: this.countryData.latlng[1]
          }"
          :zoom="zoom"
          style="height: 400px;"
        >
        </gmap-map>
      </div>
    </v-card>
  </v-col>
</template>

<style lang="scss" scoped>
#map {
  position: relative;

  .v-sheet.v-card {
    padding: 25px;
  }

  .vue-map {
    max-width: 100%;
  }
}
</style>
