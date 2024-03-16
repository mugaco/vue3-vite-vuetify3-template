<script setup>
import { storeToRefs } from "pinia";

// import { useAuthStore } from '@/stores/auth';
import { deleteCookie } from "@/composables/deleteCookie";
import { PowerIcon } from "vue-tabler-icons";
import { useStoreUser } from "~/store/user";
// const user = useStoreUser()
// const { name, is } = useStoreUser()

const storeUser = useStoreUser();
// const layout = useLayoutStore()
const { email, user_id, name, role, is } = storeToRefs(storeUser);

// const role = computed(() => {
//   if (is) {
//     return is.role;
//   }
//   return null;
// });

const handleLogout = () => {
  // console.log('sigo paso')
  const router = useRouter();

  deleteCookie("session");
  // user_id.value = null;
  // name.value = null;
  // email.value = null;
  // role.value = null;
  // is.value = null;

  router.push("/auth/login");
};
// const authStore = useAuthStore();
</script>

<template>
  <v-sheet rounded="md" color="lightsecondary-x" class="px-4 py-3 ExtraBox"  style="background-color: #282917;">
    <div class="d-flex align-center hide-menu" >
      <!-- <v-avatar size="40">
        <img src="@/assets/images/profile/user-1.jpg" alt="user" height="40" />
      </v-avatar> -->
      <!-- <pre>{{ {is} }}</pre>  -->
      <!-- <pre>{{ useState('token') }}</pre> -->
      <div class="ml-4" >
        <h4 class="mb-n1 text-h6 textPrimary"  style="color: white !important;">{{ name }}</h4>
        <span  style="color: #f9f9f9 !important;" class="text-subtitle-2 textSecondary" v-if="is">{{
          $t(is.role)
        }}</span>
      </div>
      <div class="ml-auto">
        <!-- @click="authStore.logout()" -->
        <v-btn
          variant="text"
          icon
          rounded="md"
          color="primary"
          @click="handleLogout"
        >
          <PowerIcon />

          <v-tooltip activator="parent" location="top">{{
            $t("logout")
          }}</v-tooltip>
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>
<style lang="scss">
.ExtraBox {
  position: relative;
  overflow: hidden;
}

.line-height-none {
  line-height: normal;
}
</style>
