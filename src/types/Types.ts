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

export type __PAGE<T> = {
  page_info: __PAGE_INFO
  data: T[]
}

export type ContactRequest = {
  readonly id: string
  name: string
  sender: User
  receiver: User
  sent_at: Date
}

export type Contact = {
  readonly id: string
  user_from: User
  user_to: User
  created: Date
}

export type MyContact = {
  readonly id: string
  user: User
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

export type ApiError = {
  header: string
  detail: string
}

export interface Group extends __ID_IMAGE_FIELD {
  name: string
  members: User[]
  owners: User[]
}

export type GroupPage = __PAGE<Group>
export type NotePage = __PAGE<Note>
export type MyContactPage = __PAGE<MyContact>
