<template>
  <div>
    Hola mundo
    <v-btn @click="pedri">hola boton</v-btn>
  </div>
</template>

<script setup>
import { useAxios } from "@/composables/useAxios";

const axios = useAxios();

const pedri = () => {
  axios
    .get("/logistic/logiente/pedro")
    .then((response) => {
      console.log("then", response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>
<style lang="scss" scoped></style>
