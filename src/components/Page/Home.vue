<template>
  <div>
    <div>home de {{ name }}</div>
    <div>Su color es des: {{ color }}</div>
    <div>Mi literal: {{ $t('message.hello') }}</div>
    <div class="rojuno"> rojuno </div>

    <HolaMundo />

    <!-- <pre>{{ {color} }}</pre> -->
  </div>
</template>

<script setup>
import { useUserStore } from "@/store/userStore.js";
import { useLayoutStore } from "@/store/layoutStore.js";
const { name } = useUserStore();
const layout = useLayoutStore();
const { color } = useLayoutStore();
</script>

<style lang="scss" scoped></style>
