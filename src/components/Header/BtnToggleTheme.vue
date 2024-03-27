<script setup>
import { useTheme } from "vuetify";
import { useLayoutStore } from "@/store/layout";

const layout = useLayoutStore();

const theme = useTheme();

const fu = () => {
  layout.toggleDark()
  theme.global.name.value = theme.global.current.value.dark
    ? layout.lightTheme //"lightTheme"
    : layout.darkTheme //"darkTheme";
};
</script>
<template>
  <v-btn icon @click="fu">
    <v-icon>mdi-theme-light-dark</v-icon>
  </v-btn>
</template>

<style lang="scss" scoped></style>
