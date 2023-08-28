import { defineStore } from 'pinia'
import { type User } from '@/types/userType'

type State = {
  user: User
  users: User[]
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    user: {},
    users: []
  }),
  actions: {
    addUser(user: User): void {
      this.users.push(user)
    },
    updateUser(user: User): void {
      const index = this.users.findIndex((item) => item.id === user.id)
      if (index !== -1) {
        this.users[index] = user
      } else {
        // Handle case where user is not found
        console.error(`User with id ${user.id} not found.`)
      }
    },
    removeUser(id: Number): void {
      const index = this.users.findIndex((item) => item.id === id)
      this.users.splice(index, 1)
    }
  }
})
