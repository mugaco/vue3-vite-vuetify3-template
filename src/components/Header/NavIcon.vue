<script setup>
import { useLayoutStore } from '@/store/layoutStore'
import { storeToRefs } from 'pinia';
// import { Menu2Icon } from 'vue-tabler-icons';

// import { useCustomizerStore } from '@/store/customizer';
// const customizer = useCustomizerStore();

const layout = useLayoutStore()
const { drawer } = storeToRefs(layout)

// const handeClick = () => {
//     // alert('foo')
//     customizer.SET_SIDEBAR_DRAWER()
//     console.log('pp')
// }
// const handeClick2 = () => {
//     // alert('foo')
//     customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)
//     console.log('pp2')
// }

</script>
<template>
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <!-- <v-btn class="hidden-md-and-down" icon color="primary" variant="text" @click.stop="handeClick2">
        <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>

    <v-btn class="hidden-lg-and-up" icon variant="flat" @click.stop="handeClick" size="small">
        <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn> -->
</template>



<style scoped></style>