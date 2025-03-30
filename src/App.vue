<template>
  <div>
    {{ message }}
  </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('Olá mundo')
</script>

<style lang="scss" scoped></style>