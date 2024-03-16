<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Icon from '../Icon.vue';

const props = defineProps({ item: Object, level: Number });
const route = useRoute();
const isActive = computed(() => {
    // Si es un enlace externo, nunca estará "activo" en términos de la aplicación
    if (props.item.type === 'external') return false;

    // Compara la ruta del ítem con la ruta actual
    return route.path === props.item.to;
});
</script>

<template>
    <!---Single Item-->

    <v-list-item :to="item.type === 'external' ? '' : item.to" :href="item.type === 'external' ? item.to : ''" rounded
        class="mb-1" :disabled="item.disabled" :class="{ 'mi-active': isActive }"
        :target="item.type === 'external' ? '_blank' : ''">
        <!---If icon-->
        <template v-slot:prepend>
            <Icon :item="item.icon" :level="level" />
        </template>
        <v-list-item-title>{{ $t(item.title, 2) }} {{ isActive }}</v-list-item-title>
        <!---If Caption-->
        <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
            {{ $t(item.subCaption) }}
        </v-list-item-subtitle>
        <!---If any chip or label-->
        <template v-slot:append v-if="item.chip">
            <v-chip :color="item.chipColor" :class="'sidebarchip hide-menu bg-' + item.chipBgColor"
                :size="item.chipIcon ? 'small' : 'small'" :variant="item.chipVariant" :prepend-icon="item.chipIcon">
                {{ item.chip }}
            </v-chip>
        </template>
    </v-list-item>
</template>
