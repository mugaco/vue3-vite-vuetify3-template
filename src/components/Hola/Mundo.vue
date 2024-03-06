<template>
  <div>Hola mundo {{ apiUrl }}</div>
</template>

<script setup>
import { useAxios } from "@/composables/useAxios";
const apiUrl = import.meta.env.VITE_API_URL;
console.log("API URL:", apiUrl);

const axios = useAxios();

axios
  .get("/logistic/logiente/pedro")
  .then((response) => {
    console.log("then", response.data);
  })
  .catch((error) => {
    console.error(error);
  });
  const fetchData = async () => {
  try {
    const response = await axios.get('/logistic/logiente/pedro');
    console.log('try', response.data);
  } catch (error) {
    console.error(error);
  }
};

fetchData();
</script>
<style lang="scss" scoped></style>
