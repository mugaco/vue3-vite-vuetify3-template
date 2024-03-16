<template>
  <div>
    <!-- <pre>{{ placeholder }}</pre> -->
    <v-text-field :readonly="readonly" :type="type" :clearable="clearable" :placeholder="placeholder"
      @focus="handleFocus" :error-messages="error" v-model="value" :label="label"></v-text-field>
  </div>
</template>

<script setup>
import {   computed } from 'vue'

const props = defineProps({
  label: {
    required: false,
    default: "",
  },
  readonly: {
    required: false,
    default: false,
  },
  type: {
    required: false,
    default: "text",
  },
  modelValue: { required: true },
  error: String,
  placeholder: {
    required: false,
    default: "",
  },
  clearable: {
    required: false,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue", "focus", "changed"]);
const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value ? value.trim() : value);
    emit('changed')
  },
});

const handleFocus = () => {
  emit("focus", "");
};
</script>

<style lang="scss" scoped></style>
