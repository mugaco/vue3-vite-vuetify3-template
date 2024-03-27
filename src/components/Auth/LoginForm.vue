<template>
  <div class="mt-5">
    <div style="display: flex; justify-content: center;">
      <div style="min-width: 300px; max-width: 300px;">
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Email</v-label>
        <FormInput v-model="email" placeholder="Email" :error="errorEmail" @focus="() => {
          errorEmail = '';

        }
          " />

        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">{{ $t("password") }}</v-label>

        <FormInput type="text" v-model="password" :placeholder="$t('password')" :error="errorPassword"
          @keyup.enter="submit" @focus="() => {

          errorPassword = '';
        }
          " />

        <FormInput type="text" v-model="apiKey" placeholder="apikey" @keyup.enter="byApyKey" />
        <div class="d-flex flex-wrap align-center my-3 ml-n2">
          <div class="ml-sm-auto">
            <MBtntext @click.prevent="handleRecoverPass">
              {{ $t("forgot_password") }}</MBtntext>
          </div>
        </div>
        <v-btn @click="submit" @keyup.enter="submit" size="large" :loading="loading" color="primary" block type="submit"
          flat>
          {{ $t("login") }}
        </v-btn>

        <v-btn @click="byApyKey" size="large" :loading="loading" color="primary" block type="submit" flat>
          {{ $t("by api key") }}
        </v-btn>
      </div>
    </div>
    <div v-if="alertError" class="mt-2">
      <v-alert color="error">{{ alertError }}</v-alert>
    </div>

    <v-btn @click="refresh">refresh</v-btn>
    <v-btn @click="concept">concept</v-btn>


  </div>

</template>
<script setup>
import { useAxios } from "@/composables/useAxios";
import { ref } from 'vue'
const alertError = false
const errorEmail = false
const errorPassword = false
const loading = ref(false)

const axios = useAxios();


const handleRecoverPass = () => { }
const concept = () => {
  const refreshToken = localStorage.getItem('refreshtoken');
  axios
  .get("/concept/one")
  .then((response) => {

  })
  .catch((error) => {
    console.log('submit error ...')
    // console.log('error', error.response.data.message);
    // console.log('error', error.response.data.status);
    // console.error('error', error);
  });
}
const refresh = () => {
  const refreshToken = localStorage.getItem('refreshtoken');
  axios
  .post("/auth/access/refresh", {
    refreshToken: refreshToken
  })
  .then((response) => {

  })
  .catch((error) => {
    console.log('submit error ...')
    // console.log('error', error.response.data.message);
    // console.log('error', error.response.data.status);
    // console.error('error', error);
  });
}
const byApyKey = () => {
  axios
    .post("/auth/access/by-api-key", {
      apiKey: apiKey.value

    })
    .then((response) => {
      console.log("then", response.data);

    })
    .catch((error) => {
      console.log('tete error...')
      console.log('error', error.response);
      // console.log('error', error.response.data.status);
      // console.error('error', error);
    });
}




const email = ref('jmanuel@quartup.com')
// const password = ref('jmm386387')
const password = ref('123456')
const apiKey = ref('a')

const submit = () => {
  axios
    .post("/auth/access", {
      email: email.value,
      password: password.value,
    })
    .then((response) => {

    })
    .catch((error) => {
      console.log('submit error ...')
      // console.log('error', error.response.data.message);
      // console.log('error', error.response.data.status);
      // console.error('error', error);
    });
};

</script>
