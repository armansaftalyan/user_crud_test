export interface User {
  id?: number
  name?: string
  last_name?: string
  phone?: string
  avatar?: string
  role?: Roles
}

type Roles = 'начальник' | 'работник'
