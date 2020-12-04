<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
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
export default {
  data() {
    return {
      clipped: false,
      miniVariant: false,
      title: "Suthub"
    };
  }
};
</script>
