<template>
    <!-- <p-lorem :n="40" /> -->
    <SnackSuccess v-model="snack" />

    <div class="v-list-subheader" style="padding-top: 8px;padding-bottom: 8px;">
        {{ label }}
    </div>
    <!-- <pre>{{ bookId }}</pre>
    <pre>{{ {to_save} }}</pre> -->
    <md-to-html :height="height" :md="md" @change="handleChange"></md-to-html>


    <div style=" display: flex; gap: 20px; justify-content: flex-end;" class="py-2">

        <v-btn @click="save" :loading="loading" type="submit" color="primary" :disabled="!to_save" variant="outlined">


            <span> {{ $t('update') }}</span>
        </v-btn>
    </div>
</template>
  
<script setup>
const loading = ref(false)
const props = defineProps({
    bookId: String,
    init: Object,
    field: String,
    endpoint: String,
    label: String,
    height: {
        required: false,
        type: Number,
        default: 0
    }
})


const md = computed(() => {
    if (props.init) {
        return props.init.md
    }
    return `
  un ejemplo bueno
  <div>div inner</div>
  <p class="simple no-simple"> slsl</p>  
   
  `
})

const to_save = ref(null)
const snack = ref(false)

const handleChange = (v) => {
    console.log(v.html)
    console.log(v.md)
    to_save.value = {
        md: v.md,
        html: v.html
    }
}
const save = () => {
    loading.value = true
    usePut(`${props.endpoint}/${props.bookId}`, {
        key: props.field,
        value: to_save.value,
        required: false
    }).then(() => {

        snack.value = true
        loading.value = false
    }).catch(er => {
        loading.value = false

        error.value = t('requerido')
        //le debemos pasar un param mas como required
        // y si es true y pasamos el value null, tirar un error
    })
}

</script>
  
<style lang="scss"></style>
  