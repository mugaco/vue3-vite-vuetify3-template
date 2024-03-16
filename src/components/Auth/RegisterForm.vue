<script setup lang="ts">
import { usePost } from '@/composables/ax'
import { useI18n } from 'vue-i18n'

// import { ref } from 'vue';
// import { useAuthStore } from '@/stores/auth';
// import { Form } from 'vee-validate';

/*Social icons*/
// import google from '@/assets/images/svgs/google-icon.svg';
// import facebook from '@/assets/images/svgs/facebook-icon.svg';

// const checkbox = ref(false);
// const valid = ref(false);
// const show1 = ref(false);
const name = ref('123456');
const password = ref('123456');
const email = ref('mg.jmanuel@gmail.com');
// const passwordRules = ref([
//     (v: string) => !!v || 'Password is required',
//     (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
// ]);
// const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

const loading = ref(false)
// const errors = ref({ apiError: '' })
// function validate(values: any, { setErrors }: any) {
//     const authStore = useAuthStore();
//     return authStore.login(username.value, password.value).catch((error) => setErrors({ apiError: error }));
// }
const checkbox = ref(true)
const router = useRouter()
const config = useRuntimeConfig()

const { t } = useI18n()

const errorPass = ref('')
const errorName = ref('')
const errorEmail = ref('')
const errorApi = ref('')
const token = ref('')
const showDialog = ref(false)
const disabled = computed(() => {
    if (checkbox.value === true) {
        return false
    }
    return true
})
function handleGo() {
    if (!name.value) {
        errorName.value = t('required')

    }
    if (!email.value) {
        errorEmail.value = t('required')

    }
    if (!password.value) {
        errorPass.value = t('required')

    }
    if (errorPass.value != '' || errorPass.value != '' || errorName.value != '') {
        return false
    }
    loading.value = true
    usePost('auth/user', {
        name: name.value,
        role: 'user',
        email: email.value,
        password: password.value,
        app: config.xApplication
    }).then((res: any): void => {

        console.log('rexs', res.token)
        token.value = res.token
        // useState('token', () => res.token)
        // const session = useCookie('session')
        // session.value = res.token
        loading.value = false
        showDialog.value = true
        // // router.push('/mouse-track')
        // console.log('pepx', useState('token').value)
        // router.push('/')
        // console.log('pepx-s')

    })
        .catch((err) => {
            console.log('no error')
            loading.value = false

            errorApi.value = t('bad_credentials')
            // console.log(err.response._data)
        })
}
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="6" sm="6" class="pr-2">
            <AuthBtnGoogle />

        </v-col>
        <v-col cols="6" sm="6" class="pl-2">
            <AuthBtnFacebook />

        </v-col>
    </v-row>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative">
                {{ $t('or_register') }}
            </span>
        </div>
    </div>
    <!-- <Form @submit="validate" v-slot="{ errors, isSubmitting }" class="mt-5"> -->
    <div class="mt-5">
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Nombrex</v-label>
        <FormInput v-model="name" placeholder="Nombrex" :error="errorName" @focus="() => {
            errorName = ''
            errorApi = ''
        }" />
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Email</v-label>
        <FormInput v-model="email" placeholder="Email" :error="errorEmail" @focus="() => {
            errorEmail = ''
            errorApi = ''
        }" />


        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">{{ $t('password') }}</v-label>

        <!-- :label="t('password')" -->
        <FormInput type="password" v-model="password" :placeholder="t('password')" :error="errorPass" @focus="() => {
            errorPass = ''
            errorApi = ''
        }" />
        <div class="d-flex flex-wrap align-center my-3 ml-n2">
            <v-checkbox v-model="checkbox" :rules="[(v: any) => !!v || 'You must agree to continue!']" required hide-details
                color="primary">
                <template v-slot:label class="">Acepto terminos y condiciones y xxx</template>
            </v-checkbox>
            <!-- <div class="ml-sm-auto">
                            <RouterLink to="" class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">
                                {{ $t('forgot_password') }}
                            </RouterLink>
                        </div> -->
        </div>
        <!-- :disabled="valid"  -->
        <v-btn :disabled="disabled" @click="handleGo" size="large" :loading="loading" color="primary" block type="submit"
            flat>
            {{ $t('register') }}
        </v-btn>
        <div v-if="errorApi" class="mt-2">
            <v-alert color="error">{{ errorApi }}</v-alert>
        </div>
        <AuthDialogCode v-model="showDialog" header="Cabecera" :token="token" />
    </div>

    <!-- </Form> -->
</template>
