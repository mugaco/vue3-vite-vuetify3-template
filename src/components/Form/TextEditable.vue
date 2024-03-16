<template>
    <div :class="class">
        <SnackSuccess v-model="snack" />
        <v-text-field :loading="loading" v-if="open" variant="outlined" :placeholder="label" @input="error = ''"
            :error-messages="error" v-model="value" :label="label" prepend-icon="mdi-close-circle"
            @click:prepend="open = false">
            <template #append-inner>
                <v-icon v-if="!loading" @click="handleSave">mdi-content-save</v-icon>
                <v-icon v-else>mdi-loading</v-icon>
            </template>


        </v-text-field>
        <div v-else class="content-editable-w">
            <div v-if="value">
                <div>{{ label }}</div>
                <div class="text-h5 mt-1">
                    {{ value }}

                </div>
            </div>
            <div v-else style="font-style: italic;">
                <span>{{ label }}</span> {{ `(${t('not_required')})` }}
            </div>
            <!-- <pre>{{ thelabel }}</pre> -->
            <v-btn size="small" color="primary" icon="mdi-pencil" variant="plain" @click="handleOpen"></v-btn>

            <!-- <div style="margin-left: 10px;">
                <v-btn variant="outlined" size="small" icon @click="handleOpen">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </div> -->
        </div>

        <!-- <pre>{{ { back } }}</pre>
        <pre>{{ { required: required } }}</pre> -->

    </div>
</template>

<script setup>
import { usePut } from '@/composables/ax'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const props = defineProps({
    modelValue: { required: true },
    required: { required: false, default: false },
    label: { required: false },
    endpoint: String,
    resourceId: String,
    field: String,
    class: String
})
const value = computed({
    get: () => props.modelValue,
    set: (v) => emit('update:modelValue', v)
})

const error = ref('')
const open = ref(false)
const back = ref('')
const snack = ref(false)
const emit = defineEmits(['update:modelValue'])
const loading = ref(false)
const handleSave = () => {
    loading.value = true

    usePut(`${props.endpoint}/${props.resourceId}`, {
        key: props.field,
        value: value.value,
        required: props.required ? true : false
    }).then(() => {
        open.value = false
        snack.value = true
        loading.value = false
    }).catch(er => {
        loading.value = false

        error.value = t('requerido')
        //le debemos pasar un param mas como required
        // y si es true y pasamos el value null, tirar un error
    })
}
const handleClose = () => {
    open.value = false
    value.value = back.value
}
const handleOpen = () => {
    open.value = true
    back.value = props.modelValue
}
</script>

<style scoped>
.content-editable-w {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.mdi-loading {
    animation: mdi-spin 1s linear infinite;
}

@keyframes mdi-spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>