<script setup>
import { computed } from 'vue';
import { useWindowScroll } from '@vueuse/core';



const order = 0;

const { y } = useWindowScroll();

const isScrolled = computed(() => {
  return y.value > 10;
});
</script>
<template>
  <v-app-bar :elevation="isScrolled ? 1 : 0" class="m-app-bar app-bar-bg-transition" :class="{ borde: isScrolled }"
    :color="isScrolled ? `background` : `transparent`">
    <HeaderNavIcon />
    <!-- <v-app-bar-title>Tit</v-app-bar-title> -->
    <!-- <pre>{{ isScrolled }}</pre> -->
    <slot name="izquierda" />
    <v-spacer></v-spacer>
    <slot name="derecha" />

    <!-- <HeaderTempLinks /> -->
    <!-- <HeaderBtnToggleTheme /> -->
    <div class="ml-3 mr-sm-0 mr-3">
      <ProfileDD />
    </div>
  </v-app-bar>
</template>

<style lang="scss">
.m-app-bar {
  position: fixed !important;
  top: 0px !important;
  // left: 0 !important;
  z-index: 1;

  .v-toolbar__content {

    //  max-width: var(--max-width) !important;
    // background-color: red;
    .v-app-bar-title {
      margin: 0px !important;
    }
  }
}

.app-bar-bg-transition {
  transition: box-shadow 1s ease;
}

.app-bar-bg-transition.borde {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.04) !important;
}
</style>
