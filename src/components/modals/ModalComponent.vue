<script setup lang="ts">
import { computed } from 'vue'
import { useModalStore } from '@/stores/modal'
import UserCreateUpdateModal from '@/components/modals/UserCreateUpdateModal.vue'

const modalStore = useModalStore()

const modal = computed(() => modalStore.modal)
</script>
<template>
  <div class="modal" :class="{ open: modal.open }" @click.self="modalStore.toggleModal({})">
    <user-create-update-modal v-if="modal.target === 'user-create-update'" />
  </div>
</template>

<style scoped lang="scss">
@import './scss/modal.scss';
</style>
