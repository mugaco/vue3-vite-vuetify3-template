<!-- components/FileInput.vue -->
<template>
  <div>
    <!-- <pre>{{ { odentro: objectS3 } }}</pre>
    <pre>{{ { errorSize } }}</pre>
    <pre> {{ { loading } }}</pre> -->
    <v-text-field :error-messages="errorSize" v-if="objectS3" readonly :model-value="val" :label="label"
      variant="outlined" prepend-icon="mdi-paperclip" clearable @click:clear="() => handleClear()"></v-text-field>

    <v-file-input v-else :loading="loading" ref="fileInput" show-size variant="outlined" :placeholder="label"
      :label="label" @change="onFileInputChange"></v-file-input>

    <!-- <v-btn @click="getUrl">Get UrL</v-btn> -->

  </div>
</template>

<script setup>
import { usePost, useDelete } from '@/composables/ax';
const config = useRuntimeConfig()
// console.log(config)
const maxsize = parseInt(config.maxSizeInputFile)
const fileInput = ref(null);
// const objectS3 = ref(null)
const loading = ref(false)
const props = defineProps({
  modelValue: { required: true },
  label: String
})
const emit = defineEmits(['update:modelValue'])
const objectS3 = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const val = computed(() => {
  if (objectS3.value) {
    return `${objectS3.value.originalname} (${formatBytes(objectS3.value.size)})`
  }
  return ''
})
const errorSize = computed(() => {
  if (objectS3.value) {
    if (objectS3.value.error) {
      return `le tamano maximos es ${formatBytes(maxsize)}`
    }
  }
  return ''
})
// const getUrl = () => {
//   useGet(`s3/file/url/${objectS3.value.key}/${objectS3.value.bucket}`, {
//     expiresIn: 3000,
//     download: true
//   }).then(response => {
//     const link = document.createElement('a');

//     // Asigna la URL al atributo href del enlace
//     link.href = response.data.url;

//     link.download = '';

//     // Adjunta el enlace al documento
//     // Esto es necesario porque algunos navegadores no permiten hacer clic en los elementos que no están en el documento
//     document.body.appendChild(link);

//     // Dispara un clic en el enlace
//     link.click();

//     // Después de que el clic ha sido disparado, ya no necesitamos el enlace en el documento
//     document.body.removeChild(link);
//   })

// }
const onFileInputChange = (event) => {
  fileInput.value.blur();
  loading.value = true
  const file = event.target.files[0];
  const fileSize = file.size;
  const fileName = file.name;
  console.log('Tamaño del archivo:', fileSize);
  console.log('Name del archivo:', fileName);
  if (fileSize > maxsize) {
    // alert('muy grande')
    loading.value = false
    fileInput.value.reset()
    objectS3.value = {
      originalname: fileName,
      size: fileSize,
      error: true
    }

    return
  }
  // console.log('El archivo seleccionado ha cambiado:', file);
  // Añade el archivo a FormData
  const formData = new FormData();
  formData.append('file', file);
  usePost('storage-v2/file', formData).then((response) => {
    // alert('success')
    // reload.value = !reload.value

    objectS3.value = response.data ?? response
    loading.value = false

    // // console.log(response)
    // width.value = ''
  })



  // Ahora puedes utilizar `formData` para enviarlo a través de una petición HTTP
};
const handleClear = () => {
  if (objectS3.value.error) {
    objectS3.value = null
    fileInput.value.reset()
    return false
  }
  // console.log('clear')
  useDelete(`storage-v2/file/${objectS3.value.key}/${objectS3.value.bucket}`).then(r => {
    // console.log(r)
    // fileInput.value.reset()
    objectS3.value = null
  })
}
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedValue = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));

  return `${formattedValue} ${sizes[i]}`;
}

</script>
