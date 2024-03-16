<template>
    <div>
        <v-dialog :max-width="500" transition="dialog-bottom-transition" width="auto" v-model="show" persistent>
            <v-card>
                <v-toolbar v-if="step == 2" color="primary" :title="$t('send_code')"></v-toolbar>
                <v-toolbar v-if="step == 1" color="primary" :title="$t('recover-pass')"></v-toolbar>
                <v-toolbar v-if="step == 3" color="primary" :title="$t('new_pass')"></v-toolbar>
                <v-card-text>
                    <div class="text-h6 px-1 py-2">
                        <span v-if="step == 2">

                            {{ $t('info_send_code_recover_pass') }}
                        </span>
                        <span v-if="step == 1">
                            {{ $t('start_process_info') }}

                        </span>
                        <span v-if="step == 3">
                            {{ $t('new_pass') }}

                        </span>

                        <!-- <pre>{{ { token } }}</pre> -->

                    </div>

                    <FormInput v-if="step == 3" @focus="error_password = ''" :error="error_password" v-model="password"
                        :label="$t('password')" variant="outlined"></FormInput>

                    <FormInput v-if="step == 2" @focus="error_code = ''" :error="error_code" v-model="code"
                        :label="$t('code')" variant="outlined"></FormInput>
                    <FormInput v-if="step == 1" v-model="email" label="Email" variant="outlined"></FormInput>
                    <!-- <v-alert type="success" :text="text_success"></v-alert> -->
                </v-card-text>

                <v-card-actions class="justify-end">
                    <v-btn :disabled="cancel_code_disabled" variant="text" @click="sendCodeCancel">{{
                        $t(('cancel')) }}</v-btn>
                    <v-btn v-if="step == 2" :disabled="send_code_disabled" :loading="loading" variant="text"
                        @click="sendCode">{{
                            $t(('send_code')) }}</v-btn>
                    <v-btn v-if="step == 1" :disabled="send_code_disabled" :loading="loading" variant="text"
                        @click="startProcess">{{
                            $t(('recover-pass')) }}</v-btn>
                    <v-btn v-if="step == 3" :disabled="send_code_disabled" :loading="loading" variant="text"
                        @click="setNewPass">{{
                            $t(('new_pass')) }}</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const props = defineProps({
    modelValue: { required: true },
    initEmail: String

})
onMounted(() => {
    email.value = props.initEmail
})
const step = ref(1)
const email = ref('')
const token = ref('')
const show = computed({
    get: () => props.modelValue,
    set: (v) => emit('update:modelValue', v)
})

const password = ref('')

const error_code = ref('')
const error_password = ref('')
const code = ref('')
const emit = defineEmits(['update:modelValue'])

const loading = ref(false)
const cancel_code_disabled = ref(false)
const send_code_disabled = ref(false)
const startProcess = () => {

    loading.value = true
    // alert('submit')
    usePost('auth/login/recover-pass', {
        email: email.value

    }).then(response => {
        loading.value = false
        token.value = response.token
        step.value = 2
        show.value = false
        setTimeout(() => {
            show.value = true

        }, 500)

    }).catch(err => {
        step.value = 1


        loading.value = false

    })
}

const sendCode = () => {

    loading.value = true

    if (!code.value) {
        error_code.value = 'required'
        loading.value = false
        return false
    }
    // alert('submit')
    usePost('auth/login/verify-code-recover-pass', {
        token: token.value,
        code: code.value

    }).then(response => {
        loading.value = false
        step.value = 3
        show.value = false

        // token.value = response.token
        // show.value = false
        setTimeout(() => {
            show.value = true

        }, 500)

    }).catch(err => {
        // code.value = ''

        console.log(err.data)
        if (err.data.error.indexOf("invalid signature") !== -1) {
            error_code.value = t('code_invalid')


        }
        if (err.data.error.indexOf("code required") !== -1) {
            error_code.value = t('code_required')

        }


        loading.value = false

    })
}
const setNewPass = () => {

    loading.value = true

    if (!password.value) {
        error_password.value = 'required'
        loading.value = false
        return false
    }
    // alert('submit')
    usePost('auth/login/set-new-pass', {
        token: token.value,
        code: code.value,
        password: password.value

    }).then(res => {
        const router = useRouter()

        loading.value = false
        show.value = false
        step.value = 1

        // useState('token', () => res.token)
        // const session = useCookie('session')
        // session.value = res.token
        loading.value = false

        // router.push('/mouse-track')

        // router.push('/')


    }).catch(err => {
        // code.value = ''

        console.log(err.data)
        if (err.data.error.indexOf("invalid signature") !== -1) {
            error_code.value = t('code_invalid')


        }
        if (err.data.error.indexOf("code required") !== -1) {
            error_code.value = t('code_required')

        }


        loading.value = false

    })
}
const sendCodeCancel = () => {
    show.value = false
    error_code.value = ''
    code.value = ''
    step.value = 1
}
</script>

<style lang="scss" scoped></style>