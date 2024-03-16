<!-- components/FileInput.vue -->
<template>
  <div>
    <!-- <pre>{{ { odentro: objectS3 } }}</pre> -->
    <!--<pre>{{ { errorImage } }}</pre>
        <pre> {{ { loading } }}</pre> -->
    <!-- <pre>{{ { disabled } }}</pre> -->
    <v-text-field
      :error-messages="errorImage"
      v-if="objectS3"
      :disabled="disabled"
      readonly
      :model-value="val"
      :label="label"
      variant="outlined"
      prepend-icon="mdi-camera"
      clearable
      @click:clear="() => handleClear()"
    ></v-text-field>

    <v-file-input
      v-else
      :disabled="disabled"
      :loading="loading"
      prepend-icon="mdi-camera"
      ref="fileInput"
      show-size
      variant="outlined"
      :placeholder="label"
      :label="label"
      @change="onFileInputChange"
    ></v-file-input>
  </div>
</template>

<script setup>
import { usePost, useDelete } from "@/composables/ax";
const config = useRuntimeConfig();
// console.log(config)
const maxsize = parseInt(config.maxSizeInputImage);
const fileInput = ref(null);
// const objectS3 = ref(null)
const loading = ref(false);
const props = defineProps({
  modelValue: { required: true },
  label: String,
  width: Number,
  disabled: { required: false, default: false },
});
const emit = defineEmits(["update:modelValue"]);
const disabled = computed(() => {
  return props.disabled;
});
const objectS3 = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const val = computed(() => {
  if (objectS3.value) {
    return `${objectS3.value.originalname} (${formatBytes(
      objectS3.value.size
    )})`;
  }
  return "";
});
const errorImage = computed(() => {
  if (objectS3.value) {
    if (objectS3.value.error) {
      if (objectS3.value.type == "size") {
        return `le tamano maximos es ${formatBytes(maxsize)}`;
      }
      if (objectS3.value.type == "server") {
        return `Tipo de archivo no permitidox`;
      }
    }
  }
  return "";
});
const onFileInputChange = (event) => {
  fileInput.value.blur();
  loading.value = true;
  const file = event.target.files[0];
  const tempUrl = URL.createObjectURL(file);

  // Crear una nueva imagen
  const imgD = new Image();
  let Wd = 1900;
  // Evento que se dispara cuando la imagen se ha cargado
  imgD.onload = function () {
    // La imagen está completamente cargada

    // Obtener las dimensiones
    const width = imgD.width;
    const height = imgD.height;

    // Hacer algo con las dimensiones
    console.log(`Ancho: ${width}, Alto: ${height}`);
    if (width < Wd) {
      Wd = width
    }
    _onFileInputChange(file,Wd)
    // Liberar la URL temporal
    URL.revokeObjectURL(tempUrl);
  };

  // Establecer la fuente de la imagen como la URL temporal
  imgD.src = tempUrl;
  //------------------
  // const fileSize = file.size;
  // const fileName = file.name;
  // // console.log('maxsize', maxsize)
  //  console.log('wd', Wd)
  // // if (fileSize > maxsize) {
  // //   // alert('muy grande')
  // //   loading.value = false
  // //   fileInput.value.reset()
  // //   objectS3.value = {
  // //     originalname: fileName,
  // //     size: fileSize,
  // //     error: true,
  // //     type: 'size'
  // //   }

  // //   return
  // // }
  // // console.log('El archivo seleccionado ha cambiado:', file);
  // // Añade el archivo a FormData
  // const formData = new FormData();
  // formData.append("file", file);
  // // formData.append('width', props.width); //lo que tenia en main
  // formData.append("sizes", JSON.stringify([{ width: 1900 }]));

  // usePost("storage-v2/file", formData)
  //   .then((response) => {
  //     // alert('success')
  //     // reload.value = !reload.value
  //     let img = response.data[0];
  //     img.url = img.bucket + "/" + img.key;
  //     objectS3.value = img;
  //     loading.value = false;
  //     // // console.log(response)
  //     // width.value = ''
  //   })
  //   .catch((err) => {
  //     loading.value = false;

  //     objectS3.value = {
  //       originalname: fileName,
  //       size: fileSize,
  //       error: true,
  //       type: "server",
  //     };
  //   });

  // Ahora puedes utilizar `formData` para enviarlo a través de una petición HTTP
};
const _onFileInputChange = (file, width) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log('file',file)
  console.log('width',width)
  // formData.append('width', props.width); //lo que tenia en main
  formData.append("sizes", JSON.stringify([{ width: width }]));

  usePost("storage-v2/file", formData)
    .then((response) => {
      // alert('success')
      // reload.value = !reload.value
      let img = response.data[0];
      img.url = img.bucket + "/" + img.key;
      objectS3.value = img;
      loading.value = false;
      // // console.log(response)
      // width.value = ''
    })
    .catch((err) => {
      loading.value = false;

      objectS3.value = {
        originalname: fileName,
        size: fileSize,
        error: true,
        type: "server",
      };
    });

  // Ahora puedes utilizar `formData` para enviarlo a través de una petición HTTP
};
const handleClear = () => {
  if (objectS3.value.error) {
    objectS3.value = null;
    fileInput.value.reset();
    return false;
  }
  // console.log('clear')
  useDelete(`s3/image/${objectS3.value.key}`).then((r) => {
    // console.log(r)
    // fileInput.value.reset()
    objectS3.value = null;
  });
};
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedValue = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals));

  return `${formattedValue} ${sizes[i]}`;
};
defineExpose({
  handleClear,
});
</script>
