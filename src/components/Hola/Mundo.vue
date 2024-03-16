<template>
  <div>
    Hola mundo



  


    <v-btn @click="gd" color="primary">Get Data</v-btn>

  </div>
</template>

<script setup>
import { useAxios } from "@/composables/useAxios";
import { ref } from 'vue'

const axios = useAxios();

const email = ref('jmanuel@quartup.com')
const password = ref('jmm386387')



const gd = () => {
  axios
    .get("/concept/one")
    .then((response) => {
      console.log("data", response.data);

    })
    .catch((error) => {
      console.error(error);
    });
};
</script>
<style lang="scss" scoped></style>
