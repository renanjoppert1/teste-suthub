<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" app>
      <v-toolbar-title v-text="title" />
      <search-top></search-top>
      <v-spacer />
      <div id="menu">
        <v-btn to="/dashboard" nuxt text color="primary">
          Início
        </v-btn>
        <v-btn to="/relatorio" text color="primary">
          Relatório
        </v-btn>
        <v-btn @click="logout()" text color="primary">
          Sair
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>Renan Joppert - &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import SearchTop from "../components/SearchTop.vue";
export default {
  components: {
    "search-top": SearchTop
  },
  data() {
    return {
      clipped: false,
      miniVariant: false,
      title: "Suthub"
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    }
  }
};
</script>
