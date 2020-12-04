<script>
export default {
  data() {
    return {
      listContent: [],
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Languages", value: "languages" }
      ],
      langSelected: "",
      langNickSelected: "",
      countriesSpeakLang: []
    };
  },
  computed: {
    searchWatcher: function() {
      return this.$store.state.search.value;
    }
  },
  methods: {
    sellectLang(lang) {
      this.langSelected = lang.name;
      this.langNickSelected = lang.iso639_1;
    },
    fetchResults({ query }) {
      if (query == null) {
        return;
      }
      this.$axios
        .$get("https://restcountries.eu/rest/v2/name/" + query)
        .then(res => {
          this.listContent = res;
        })
        .catch(err => {
          this.listContent = [];
        });
    }
  },
  watch: {
    searchWatcher: function(to) {
      if (to == "") {
        this.listContent = [];
        return false;
      }

      this.fetchResults({ query: to });
    },
    langNickSelected: function(to) {
      if (to == "") {
        this.countriesSpeakLang = [];
        return false;
      }

      this.$axios
        .$get("https://restcountries.eu/rest/v2/lang/" + to)
        .then(res => {
          this.countriesSpeakLang = res;
        })
        .catch(err => {
          this.countriesSpeakLang = [];
        });
    }
  }
};
</script>

<template>
  <v-row>
    <v-col>
      <v-card>
        <v-data-table
          :headers="headers"
          :items="listContent"
          class="elevation-1"
          hide-default-footer
          disable-pagination
        >
          <template v-slot:item.languages="{ item }">
            <v-btn
              class="lang-label"
              v-for="lang in item.languages"
              small
              elevation="1"
              color="#00e676"
              @click="sellectLang(lang)"
              >{{ lang.name }}</v-btn
            >
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <v-col md="6" v-if="this.countriesSpeakLang.length > 0">
      <v-card elevation="1" max-width="100%">
        <v-card-text>
          <p>Countries Speak in {{ this.langSelected }}</p>
          <div class="text--primary">
            <p v-for="(country, index) in this.countriesSpeakLang" :key="index">
              {{ country.name }}
            </p>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.lang-label {
  margin: 5px;
}
.v-sheet.v-card {
  padding: 25px;
}
</style>
