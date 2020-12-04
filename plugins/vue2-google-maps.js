import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDeYPpuurW2wUxGfLTp0WiWLnltmx_ag24",
    libraries: "places" // necessary for places input
  }
});