<script setup lang="ts">
import ModalComponent from '@/components/modals/ModalComponent.vue'
import { useModalStore } from '@/stores/modal'
import { provide, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import UsersList from '@/components/users/UsersList.vue'

const modalStore = useModalStore()
const showSurname = ref<boolean>(false)
const userStore = useUserStore()
const value = ref('')
const isFocused = ref(false)
const label = 'Your Label'

const toggleModal = () => {
  modalStore.toggleModal({
    open: true,
    target: 'user-create-update'
  })
}

provide('users', userStore.users)
provide('showSurname', showSurname)
</script>

<template>
  <main>
    <button class="add-user" @click="toggleModal">Добавить пользователя</button>
    <label>
      Показывать фамилии
      <input type="checkbox" v-model="showSurname" />
    </label>
    <users-list></users-list>

    <div class="textarea-container">
      <label class="textarea-label" :class="{ active: isFocused || value }">{{ label }}</label>
      <textarea
        class="textarea-input"
        v-model="value"
        @focus="isFocused = true"
        @blur="isFocused = false"
      ></textarea>
    </div>
  </main>

  <modal-component />
</template>

<style scoped lang="scss">
.add-user {
  border: none;
  padding: 10px 20px;
  background: cornflowerblue;
  border-radius: 10px;
  cursor: pointer;
}

.textarea-container {
  position: relative;
  width: 100%;
  height: max-content;
  margin: 200px 0 20px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    pointer-events: none;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }

  &:focus-within::before {
    opacity: 1;
  }

  .textarea-label {
    position: absolute;
    left: 10px;
    top: 18px;
    transform: translateY(-50%);
    color: #888;
    font-size: 16px;
    transition: all 0.3s ease-out;
    pointer-events: none;
    opacity: 0.6;
  }

  .textarea-label.active {
    transform: translateY(-80%) scale(0.8);
    color: #333;
  }

  .textarea-input {
    width: 100%;
    min-height: 100px;
    padding: 25px 10px 10px;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: -7px;
    background: transparent;
    mask-image: linear-gradient(to bottom, transparent, transparent 19px, black 29px);
    -webkit-mask-image: linear-gradient(to bottom, transparent, transparent 19px, black 29px);
    outline: none;
    border: none;
    border-bottom: 1px solid;
  }

  .textarea-input:focus {
    border-color: #007bff;
    outline: none;
  }
}
</style>
