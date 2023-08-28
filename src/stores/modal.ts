import { defineStore } from 'pinia'

type State = {
  modal: Modal
}

type Modal = {
  open?: boolean
  target?: string
  data?: any
}

export const useModalStore = defineStore('modal', {
  state: (): State => ({
    modal: {
      open: false,
      target: '',
      data: {}
    }
  }),
  actions: {
    toggleModal(params: object): void {
      this.modal = params
    }
  }
})
