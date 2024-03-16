<template>
    <div>
        <!-- <pre>{{ { items } }}</pre> -->
        <v-list>
            <v-list-item v-for="(file, index) in items" :key="index" :title="file.originalname">
                <template v-slot:append>
                    <v-btn @click="onDel(index)" color="grey-lighten-1" icon="mdi-delete" variant="text"></v-btn>
                </template>
            </v-list-item>
        </v-list>

        <div style="margin-top: 5px;">

       
            <!-- <pre>{{ { el_file:file } }}</pre> -->
            <FormInputFile v-model="file" :label="label" />
        </div>

    </div>
</template>

<script setup>
import { useDelete } from '@/composables/ax';
const config = useRuntimeConfig();
const apiBaseEmbeded = `${config.public.apiBaseEmbeded}`;
const props = defineProps({

    label: {
        required: false,
        default: 'Nuevo item'
    },

    modelValue: { required: true },

})

const emit = defineEmits(["update:modelValue"]);
const error = ref('')

const file = ref(null)
watch(file, (newValue) => {
    if (newValue) {
        let f = JSON.parse(JSON.stringify(newValue))
        f.fieldname=f.originalname
        f.download = `${apiBaseEmbeded}/helpdesk/download/${f.bucket}/${f.key}`
        delete f.created_at
        delete f.updated_at
        delete f.public_url
        add(f)
        setTimeout(()=>{
            file.value = null

        },200)
    }
})
const items = computed(() => props.modelValue);
const onDel = async (index) => {
  
    const newItems = [...items.value];
    const f = newItems.find((item, idx) => idx === index)
    console.log(f)

    await useDelete(`storage-v2/file/${f.key}/${f.bucket}`)
    newItems.splice(index, 1);
    console.log(newItems)

    emit('update:modelValue', newItems);
}

const add = (file) => {
    const newItems = [...items.value];
    newItems.push(file)
    emit('update:modelValue', newItems);
}

</script>

<style lang="scss" scoped></style>