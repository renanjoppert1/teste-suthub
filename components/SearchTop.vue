<script>
export default {
  data() {
    return {
      search: ""
    };
  },
  methods: {
    onClear() {
      this.search = "";
      this.$store.commit("search/setSearch", this.search);
    }
  },
  computed: {
    routeWatcher: function() {
      return this.$route.path;
    }
  },
  watch: {
    search: function(to) {
      this.$store.commit("search/setSearch", this.search);
    },
    routeWatcher: function() {
      this.onClear();
    }
  }
};
</script>

<template>
  <div id="searchTop" v-if="this.$route.path == '/dashboard'">
    <v-text-field
      v-model="search"
      label="Type hear an America Country to Search"
      append-icon="mdi-magnify"
      @click:clear="onClear"
      clearable
    ></v-text-field>
  </div>
</template>

<style lang="scss" scoped>
#searchTop {
  width: 500px;
  padding-left: 30px;

  .v-input,
  .v-input__control {
    margin-top: 20px;
  }
}
</style>
