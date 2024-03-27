<template>
    <div v-if="temp_links">
        <!-- <pre>{{ typeof temp_links }}</pre> -->
        <span style="margin-left: 10px;">

            <nuxt-link to="/">home</nuxt-link>
        </span>
        <span style="margin-left: 10px;">

            <nuxt-link to="/ins-login">ins-loginpire</nuxt-link>
        </span>
        <span style="margin-left: 10px;">
            <nuxt-link to="/inspire">inspire</nuxt-link>
        </span>
        <span style="margin-left: 10px;">
            <nuxt-link to="/inspire-editor">inspire-Ed</nuxt-link>
        </span>
        <span style="margin-left: 10px;">


            <nuxt-link to="/inspire-2">inspire-2</nuxt-link>
        </span>
        <span style="margin-left: 10px;">

            <nuxt-link to="/book-create">ins-b-c</nuxt-link>

        </span>
        <span style="margin-left: 10px;">
            <nuxt-link to="/locales">locales</nuxt-link>
        </span>
        <span style="margin-left: 10px;">
            <nuxt-link to="/users">users</nuxt-link>
        </span>
        <span style="margin-left: 10px;">
            <nuxt-link to="/imagenes">imagenes</nuxt-link>
        </span>
        <span style="margin-left: 10px;">
            <nuxt-link to="/email-templates">email temp</nuxt-link>
        </span>
        <span style="margin-left: 10px;">
            <nuxt-link to="/books">bbs temp</nuxt-link>
        </span>
        <span style="margin-left: 10px;">
            <nuxt-link to="/media-contacts">mccs temp</nuxt-link>
        </span>
        <span style="margin-left: 10px;">
            <nuxt-link to="/newsletter-contacts">face</nuxt-link>
        </span>
        <span style="margin-left: 10px;">
            <nuxt-link to="/helpdesk/migrartmp/ticket">tt</nuxt-link>
        </span>
        <span style="margin-left: 10px;">
            <nuxt-link to="/btn-facebook">face</nuxt-link>
        </span>
    </div>
</template>

<script setup>
const temp_links = ref(false)
onMounted(() => {
    temp_links.value = localStorage.getItem('temp_links') === 'true';
})
</script>

<style lang="scss" scoped></style>