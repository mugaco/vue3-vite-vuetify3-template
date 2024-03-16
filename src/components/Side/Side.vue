<template>
  <v-navigation-drawer v-model="drawer" style="
      background-color: #171c23;
      color: white;
      border-radius: 0px !important;
    ">
    <div class="xpa-5" style="text-align: center;">
      <!-- <pre>{{ {is} }}</pre> -->
      <img :src="logoPath" alt="Helpedesk" style="width: 180px;" />

      <!-- <Logo /> -->
    </div>
    <perfect-scrollbar class="scrollnavbar">
      <div class="scrollnavbar-">
        <v-list class="pa-6">
          <!---Menu Loop -->
          <!-- <pre>{{ sidebarMenu }}</pre> -->
          <template v-for="item in sidebarMenu">

            <!---Item Sub Header -->
            <SideNavGroup :item="item" v-if="item.header" :key="item.header" />
            <!---If Has Child -->
            <SideNavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children"
              :key="item.children.title" />
            <!---Single Item-->

            <SideNavItemItem :item="item" v-else class="leftPadding" :key="item.title" />
            <!---End Single Item-->
          </template>
        </v-list>
      </div>
      <!-- <div class="pa-6 userbottom">
        <SideNavUser />
      </div> -->

    </perfect-scrollbar>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue'
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import sidebarItems from "./sidebarMenuItems";

import { useLayoutStore } from "@/store/layoutStore";
import { storeToRefs } from "pinia";
// import { useUserStore } from "@/store/userStore";
const layout = useLayoutStore();
const { drawer } = storeToRefs(layout);

// const { is } = useUserStore();
// const sidebarMenu = computed(() => {
//   if (is) {
//     if (is.role === "admin") {
//       return sidebarItems;
//     }
//   }
//   if (is.contact_id) {
//     return sidebarItems.filter((item) => item.contact);
//   }
//   return sidebarItems.filter((item) => !item.admin);
// });

const sidebarMenu = computed(() => {

  return sidebarItems
});


const { logo } = useLayoutStore();

const logoPath = computed(() => {
  return `/img/${logo}`;
});
// const st = useStoreHost();
// const host = st()
</script>
