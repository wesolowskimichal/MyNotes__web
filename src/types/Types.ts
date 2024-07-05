export type ColorTheme = 'dark' | 'light'

interface __ID_IMAGE_FIELD {
  readonly id: string
  image: string
}

type __PAGE_INFO = {
  links: {
    next: string | null
    previous: string | null
  }
  count: number
  current_page_number: number
  last_page_number: number
}

type __PAGE<T> = {
  page_info: __PAGE_INFO
  data: T[]
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

export type Note = {
  readonly id: string
  title: string
  htmlCode: string
  members: User[]
  owners: User[]
}

export type NotePage = __PAGE<Note>
