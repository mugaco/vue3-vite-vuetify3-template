<template>
    <div>
        <!-- <pre>{{ { items } }}</pre> -->
        <v-list>
            <v-list-item v-for="(v, index) in items" :key="index" :title="v">
                <template v-slot:append>
                    <v-btn @click="onDel(index)" color="grey-lighten-1" icon="mdi-delete" variant="text"></v-btn>
                </template>
            </v-list-item>
        </v-list>

        <div style="margin-top: 5px;">

            <v-text-field @input="handleFocus" @focus="handleFocus" :error-messages="error" @keyup.enter="add"
                @click:append-inner="add" append-inner-icon="mdi-plus" v-model="nuevo" type="text" :placeholder="label"
                :label="label"></v-text-field>
        </div>

    </div>
</template>

<script setup>
const props = defineProps({

    label: {
        required: false,
        default: 'Nuevo item'
    },

    modelValue: { required: true },

})

const emit = defineEmits(["update:modelValue"]);
const error = ref('')
const nuevo = ref('')
const items = computed(() => props.modelValue);
const onDel = (index) => {
    console.log('delete ' + index);
    const newItems = [...items.value];
    newItems.splice(index, 1);
    console.log(newItems)
    emit('update:modelValue', newItems);
}
const handleFocus = () => {
    error.value = ''
}
const add = () => {
    const newItems = [...items.value];
    nuevo.value = nuevo.value.trim().replace(/^http?:\/\//i, '').replace(/^https?:\/\//i, '')
    

    // Validar si nuevo.value es un dominio válido
    const domainRegex = /^(?:(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[A-Z]{2,6}\.?|[a-z0-9-]{2,}\.?)|localhost)$/i;
    if (!domainRegex.test(nuevo.value.trim())) {
        error.value = "invalid domain"; // Setear el mensaje de error para dominio inválido
        return false;
    }

    if (newItems.includes(nuevo.value)) {
        error.value = "exists";
        return false;
    }
    console.log('nuevo');

    newItems.push(nuevo.value);
    emit('update:modelValue', newItems);
    nuevo.value = '';
}


</script>

<style lang="scss" scoped></style>