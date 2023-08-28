<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type User } from '@/types/userType'
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'

onMounted(() => {
  if (modalStore.modal.data) {
    user.value = JSON.parse(JSON.stringify(modalStore.modal.data))
    previewImage.value = user.value.avatar
    update.value = true
  }
})

const rolesList = ['начальник', 'работник']
const user = ref<User>({
  role: 'начальник'
})
const previewImage = ref<string | undefined>('')
const update = ref<boolean>(false)
const modalStore = useModalStore()
const userStore = useUserStore()

const handleImageUpload = (event: Event): void => {
  const fileInput = event.target as HTMLInputElement
  const file = fileInput.files?.[0]

  if (file) {
    const reader = new FileReader()

    reader.onload = (e) => {
      previewImage.value = e.target?.result as string
    }

    reader.readAsDataURL(file)
  } else {
    previewImage.value = ''
  }
}

const addOrUpdateUser = (): void => {
  if (previewImage.value) {
    user.value.avatar = previewImage.value
  }
  if (!update.value) {
    user.value.id = Date.now()
    userStore.addUser(user.value)
  } else {
    userStore.updateUser(user.value)
  }

  modalStore.toggleModal({})
}
</script>

<template>
  <div class="user-modal">
    <form @submit.prevent="addOrUpdateUser">
      <fieldset>
        <label id="name"> Имя </label>
        <input id="name" type="text" v-model="user.name" />
      </fieldset>
      <fieldset>
        <label id="last_name"> Фамилия </label>
        <input id="last_name" type="text" v-model="user.last_name" />
      </fieldset>
      <fieldset>
        <label id="image">
          <span v-if="!previewImage">фото</span>
          <img width="80" height="80" :src="previewImage" v-if="previewImage" alt="avatar" />
        </label>
        <input @change="handleImageUpload" id="image" type="file" />
      </fieldset>
      <fieldset>
        <label> роль </label>
        <select v-model="user.role" :disabled="update">
          <option v-for="role in rolesList" :value="role" :key="role">{{ role }}</option>
        </select>
      </fieldset>
      <fieldset v-if="user.role === 'начальник'">
        <label id="phone"> Телефон </label>
        <input id="phone" type="text" v-model="user.phone" />
      </fieldset>
      <div class="actions">
        <button type="submit">{{ update ? 'Сохранить' : 'Создать' }}</button>
        <button type="button" @click="modalStore.toggleModal({})">Отменить</button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import 'scss/user_create_update.scss';
</style>
