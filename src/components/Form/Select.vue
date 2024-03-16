<template>
    <div v-if="selectables">

<!-- <pre>{{ items }}</pre> -->
<!-- <pre>{{ {locale} }}</pre> -->
<!-- <pre>{{ {locales} }}</pre> -->
<!-- <pre>{{ title }}</pre> -->
<!-- <pre>{{ resource_id }}</pre> -->
        <v-select :multiple="multiple" v-model="resource_id" :items="selectables" :label="label" clearable :item-title="title"
            item-value="_id" :error-messages="error"
            @focus="handleFocus"
            >

        </v-select>
        <!-- :rules="rules" -->
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

import { useGet } from "@/composables/ax";
// Dentro de 'script setup'
const { locale } = useI18n()

// console.log(locale.value)  // Esto imprimirá el código del idioma actual

const title = computed(()=>{
    if(props.locales === true){
        return `locales[${locale.value}]`
    }
    return 'name'
})
const props = defineProps({
    modelValue: { type: [String, Array] },
    locales: {type:Boolean,required:false,default:false},
    multiple: { type: Boolean, required: false, default: false },
    error: { type: String, required: false, default: '' },
    // rule: { type: Function, required: false  },
    label: {
        required: false,
        default: ''
    },

    permanentFilters: {
        required: false,
        type: Object
    },

    url: { type: String, required: false },
    items: { type: Array, required: false },


})
const emit = defineEmits(['update:modelValue','focus'])
const resource_id = computed({
    get: () => props.modelValue,
    set: (v) => emit('update:modelValue', v)
})

// const url = 'helpdesk/contact/autocomplete/selectable'
const selectables = ref(null)
// const rules = computed(()=>{
//     let r= []
//     if(props.rule){
//         r.push(props.rule)
//         return r
//     }
//     return false
// })

// const loading = ref(false)




let query = {
    page: 1,
    itemsPerPage: 100000,


}





onMounted(() => {
    if (props.url) {
        if (props.permanentFilters) {
            query.permanentFilters = JSON.stringify(props.permanentFilters)
        }
        useGet(props.url, query).then(response => {
            selectables.value = response.data.collection
        })
    }
    if (props.items) {
        selectables.value = props.items
    }
})
const handleFocus = () => {
    emit('focus', '')
}
</script>

<style lang="scss" scoped></style>