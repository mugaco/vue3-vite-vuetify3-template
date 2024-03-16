
<template>
    <div v-if="model !== false">

        <v-autocomplete :readonly="readonly" clearable @click:clear="handleClear" variant="outlined" :chips="multiple"
            return-object v-model="model" @update:model-value="handleUpdated" :loading="loading" item-title="title"
            :custom-filter="customFilter" @update:search="handleSearchChange" @update:focused="handleFocused" :label="label"
            :items="items" :multiple="multiple" :error-messages="error">
            <template #chip="{ item }" v-if="multiple">

                <ChipLength :length="20" :value="item.title" />

            </template>
            <template #no-data>
                <div v-if="!loading">
                    <v-card :elevation="0">
                        <v-card-text>
                            {{ msg }}
                        </v-card-text>
                    </v-card>
                </div>
                <div v-if="loading">
                    <v-card :elevation="0">
                        <v-card-text>
                            {{ searching }}
                            <v-progress-linear indeterminate color="primary" class="mb-0"></v-progress-linear>
                        </v-card-text>
                    </v-card>
                </div>
            </template>

        </v-autocomplete>
        <!-- <pre>{{ { model } }}</pre> -->
        <!-- <pre>{{ {permanentFilters} }}</pre> -->
        <!--
        <pre>{{ { readonly } }}</pre>
        <pre>{{ { multiple } }}</pre>
        <pre>{{ { loading } }}</pre>
        -->
    </div>
</template>

<script setup>
import { useGet } from "@/composables/ax";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const props = defineProps({
    modelValue: { type: [String, Array] },
    multiple: { required: false, default: false },
    url: String,
    label: String,
    placeholder: String,
    label: {
        required: false,
        default: ''
    },
    readonly: {
        required: false,
        default: false
    },
    shoot: {
        required: false,
        default: 3
    },
    permanentFilters: {
        required: false,
        type: Object
    },
    searchFields: Array,
    showFields: {
        required: false,
        type: Array
    },
    error: {
        type: String,
        required: false,
        default: ''
    },



})
const emit = defineEmits(['update:modelValue','focus'])
const multiple = ref(props.multiple)

const handleUpdated = (m) => {
    // console.log('elm', m)
    if (multiple.value) {
        let arrayDeIds = m.map(objeto => objeto._id);
        emit('update:modelValue', arrayDeIds)
        // emit('object',m)
        return false
    }
    emit('update:modelValue', m ? m._id : null)
    // emit('object',m)

}
watch(
    () => props.modelValue,
    (newVal, oldVal) => {
        // Aquí va tu código cuando cambia la prop.
        changeModel()
        // console.log('watch ha cambiado', newVal, oldVal)
    }
)
const model = ref(false)
const mapea = function (a) {
    const b = a.map(ob => {
        let title = ''
        props.showFields.forEach(f => {
            if (ob[f]) {
                title = title + " - " + ob[f]
            }
        })
        //let title = ob.name + ' ' +ob.email
        let _id = ob._id
        title = title.trim().substring(1)
        return {
            _id,
            title
        }
    })
    return b
}
onMounted(() => {
    changeModel()
})
const changeModel = async () => {
    if (multiple.value) {
        model.value = []
        let items = []
        if (props.modelValue?.length > 0) {
            // console.log('sup', props.modelValue)
            for (let i = 0; i < props.modelValue.length; i++) {
                let id = props.modelValue[i]
                let r = await useGet(`${props.url}/${id}`)
                let item = r.data
                items.push(item)
            }
            let a = mapea(items)
            model.value = [
                ...a
            ]
            items.value = [
                ...model.value
            ]
        }
    } else {
        model.value = null
        if (props.modelValue) {
            let items = []


            let id = props.modelValue
            let r = await useGet(`${props.url}/${id}`)
            let item = r.data
            items.push(item)

            let a = mapea(items)
            model.value = a[0]
        }
    }
}
let query = {
    page: 1,
    itemsPerPage: 100000,

    search: '',
    fields: JSON.stringify(props.searchFields)
}
const loading = ref(false)
const items = ref([])
const apiData = ref([])
//search es el valor que internamente usa v-...
const search = ref('')
//fijamos query search para compararla con search
//solo limpiaremos la lista si search no es un segmento inical de querySearch
// const querySearch = ref('')
const readonly = computed(() => {
    if (multiple.value == false) {
        if (model.value) {
            return true
        }
    }
    return false
})
const msg = computed(() => {
    if (search.value.length === 0) {
        if (multiple.value) {


            if (items.value.length === model.value.length) {
                return t('empezar_escribir')
            }
        } else {
            if (items.value.length === 0) {
                return t('empezar_escribir')
            }
        }
    }
    return t('no_data')
})
const searching = t('recuperando_data')
const handleClear = () => {
    if (multiple.value) {
        items.value = [
            ...model.value
        ]
    } else {
        items.value = []
    }
}
const handleFocused = () => {
    if (multiple.value) {
        items.value = [
            ...model.value
        ]
    } else {
        items.value = []
    }
    emit('focus')
}
const handleSearchChange = (str) => {
    search.value = str
    // console.log(str)
    if (str.length < props.shoot) {

        loading.value = true
        if (multiple.value) {
            items.value = [
                ...model.value
            ]
        } else {
            items.value = []
        }
    }
    if (str.length === 0) {
        // alert('cero')
        loading.value = false
        if (multiple.value) {
            items.value = [
                ...model.value
            ]
        } else {
            items.value = []
        }
    }
    if (str.length === props.shoot) {

        query.search = str
        if (props.permanentFilters) {
            query.permanentFilters = props.permanentFilters
        }
        getItems()

        //  items.value = ['California', 'Caldo', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
    }
}


const customFilter = (itemTitle, queryText, item) => {
    const textOne = item.raw.title.toLowerCase()
    const searchText = queryText.toLowerCase()
    return textOne.indexOf(searchText) > -1
}

// watch(model,(n)=>{
//     items.value = [
//         ...model.value,
//         ...items.value
//     ]
// })

const getItems = () => {
    // console.log('get items')
    loading.value = true
    // querySearch.value = query.search
    useGet(props.url, query).then(response => {
        loading.value = false
        apiData.value = response.data.collection

        const a = JSON.parse(JSON.stringify(apiData.value))

        const b = mapea(a)
        // const b = a.map(ob => {
        //     let title = ''
        //     props.showFields.forEach(f => {
        //         title = title + " " + ob[f]
        //     })
        //     //let title = ob.name + ' ' +ob.email
        //     let _id = ob._id
        //     title = title.trim()
        //     return {
        //         _id,
        //         title
        //     }
        // })
        if (multiple.value) {
            items.value = [
                ...model.value,
                ...b

            ]
        } else {
            items.value = [
                // ...model.value,
                ...b

            ]
        }
        // items.value = [
        //     ...model.value,
        //     ...b
        // ]
        // getNuevos.value = false
        // loading.value = false
    })
}
</script>

<style lang="scss" scoped></style>