export type ColorTheme = 'dark' | 'light'

interface __ID_IMAGE_FIELD {
  readonly id: string
  image: string
}

export interface User extends __ID_IMAGE_FIELD {
  username: string
  email: string
  first_name: string
  last_name: string
}

export type Token = {
  refresh: string
  access: string
}
