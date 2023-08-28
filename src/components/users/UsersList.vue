<script setup lang="ts">
import { inject, ref } from 'vue'
import { type User } from '@/types/userType'
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'

const users = inject('users', ref<User[]>())
const showSurname = inject('showSurname', ref<boolean>(true))
const modalStore = useModalStore()
const userStore = useUserStore()

const toggleModal = (user: User) => {
  modalStore.toggleModal({
    open: true,
    target: 'user-create-update',
    data: user
  })
}

const removeUser = (id: Number) => {
  userStore.removeUser(id)
}
</script>

<template>
  <table>
    <tr>
      <th>Имя</th>
      <th v-if="showSurname">фамилия</th>
      <th>редактировать</th>
      <th>удалить</th>
    </tr>
    <tr v-for="user in users" :key="user.id">
      <td>{{ user.name }}</td>
      <td v-if="showSurname">{{ user.last_name }}</td>
      <td><img @click="toggleModal(user)" src="@/assets/svg/edit.svg" alt="edit" /></td>
      <td><img @click="removeUser(user.id)" src="@/assets/svg/delete.svg" alt="delete" /></td>
    </tr>
  </table>
</template>

<style scoped lang="scss">
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
tr {
  th:nth-last-child(-n + 2),
  td:nth-last-child(-n + 2) {
    text-align: center;
    width: 120px;
    img {
      width: 20px;
      cursor: pointer;
    }
  }
}
</style>
