<template>
    <div>
        <v-dialog :max-width="500" transition="dialog-bottom-transition" width="auto" v-model="show" persistent>
            <v-card>
                <v-toolbar color="primary" :title="header"></v-toolbar>
                <v-card-text>
                    <div class="text-h6 px-1 py-2">
                        {{ $t('form_code_text') }}
                    </div>
                    <FormInput @focus="error_code = ''" :error="error_code" v-model="code" :label="$t('form_code')"
                        variant="outlined"></FormInput>
                    <v-alert type="success" :text="text_success"></v-alert>
                </v-card-text>

                <v-card-actions class="justify-end">
                    <v-btn :disabled="cancel_code_disabled" variant="text" @click="sendCodeCancel">{{
                        $t(('cancel')) }}</v-btn>
                    <v-btn :disabled="send_code_disabled" :loading="loading" variant="text" @click="sendCode">{{
                        $t(('send_code')) }}</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: { required: true },
    header:String,
    token:String

})
const emit = defineEmits(['update:modelValue'])
const show = computed({
    get: () => props.modelValue,
    set: (v) => emit('update:modelValue', v)
})

const text_success = ref('pee')

const error_code = ref('')
const code = ref('')
const loading = ref(false)
const cancel_code_disabled = ref(false)
const send_code_disabled = ref(false)
const sendCode = () => {

    loading.value = true
    // alert('submit')
    usePost('auth/user/create-if-code-success', {
        token: props.token,
        code: code.value,
    }).then(response => {
        code.value = ''
        loading.value = false
        cancel_code_disabled.value = true
        send_code_disabled.value = true

        setTimeout(() => {
            show.value = false
        }, 3000)
    }).catch(err => {
        // code.value = ''

        // console.log(err.data.error)
        if (err.data.error.indexOf("got invalid signature") !== -1) {
            error_code.value = t('code_invalid')


        }
        if (err.data.error.indexOf("code required") !== -1) {
            error_code.value = t('code_required')

        }


        loading2.value = false

    })
}

const sendCodeCancel = () => {
    show.value = false
    error_code.value = ''
    code.value = ''
}
</script>

<style lang="scss" scoped></style>