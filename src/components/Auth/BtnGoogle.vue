<template>
    <div>
        <v-btn :href="getGoogleUrl(from)" variant="outlined" size="large" class="border text-subtitle-1" block>
                <img src="@/assets/images/svgs/google-icon.svg" height="16" class="mr-2" alt="google" />
                <span class="d-sm-flex d-none mr-1">
                    {{ $t('sign_in_with') }}

                </span>Google
            </v-btn>
    </div>
</template>

<script setup>
import { getGoogleUrl } from '@/utils/getGoogleUrl'
const from = 'http://localhost:3000/'

</script>

<style lang="scss" scoped>

</style>