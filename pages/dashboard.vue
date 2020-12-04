<script>
import SearchResult from "../components/SearchResult.vue";
export default {
  components: { SearchResult },
  name: "Dashboard",
  layout: "admin",
  // carrega a middleware em middleware/auth.js
  middleware: ["auth"],
  data() {
    return {
      search: "",
      paises: [],
      mapSellected: {},
      loading: true
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Nome",
          align: "start",
          sortable: true,
          value: "name"
        },
        {
          text: "Capital",
          sortable: true,
          value: "capital"
        }
      ];
    },
    searchWatcher: function() {
      return this.$store.state.search.value;
    }
  },
  methods: {
    openMap(e) {
      this.mapSellected = e;
    }
  },
  mounted() {
    this.$axios
      .$get("https://restcountries.eu/rest/v2/region/Americas")
      .then(res => {
        this.paises = res;
      })
      .catch(err => {
        this.$toast.error(
          "Houve um erro ao buscar os países no banco de dados"
        );
      });
  },
  watch: {
    searchWatcher: function(to) {
      console.log(to);
    }
  }
};
</script>

<template>
  <div id="dashboard">
    <v-row
      id="dashboard"
      v-if="this.searchWatcher == '' || this.searchWatcher == null"
    >
      <v-col>
        <v-card>
          <h2>Países da América</h2>
          <v-data-table
            id="countriesList"
            :headers="headers"
            :items="paises"
            item-key="name"
            class="elevation-1 table_tr_hover"
            @click:row="openMap"
            hide-default-footer
            disable-pagination
          >
          </v-data-table>
        </v-card>
      </v-col>
      <CountryMap :country="mapSellected" />
    </v-row>
    <v-row
      id="searchContent"
      v-if="this.searchWatcher != '' && this.searchWatcher != null"
    >
      <search-result></search-result>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
#dashboard {
  .v-sheet.v-card {
    padding: 25px;
  }
}

.table_tr_hover:hover{
  cursor: pointer!important;
}
</style>
