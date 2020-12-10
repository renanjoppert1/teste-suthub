import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "SUA_CHAVE_DO_GOOGLE_API_KEY_AQUI",
    libraries: "places" // necessary for places input
  }
});
