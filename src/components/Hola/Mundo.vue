<template>
  <div>Hola mundo {{ apiUrl }}</div>
</template>

<script async setup>
import { useAxios } from "@/composables/useAxios";
const apiUrl = import.meta.env.VITE_API_URL;
console.log("API URL:", apiUrl);

const axios = useAxios();
const fetchData = async () => {
  try {
    const response = await axios.get("/logistic/logiente/pedro");
    console.log("try", response.data);
    return response;
  } catch (error) {
    console.error(error);
  }
};
const res = await fetchData();
console.log("da", res.data);

axios
  .get("/logistic/logiente/pedro")
  .then((response) => {
    console.log("then", response.data);
  })
  .catch((error) => {
    console.error(error);
  });
console.log("ultimo");
</script>
<style lang="scss" scoped></style>
