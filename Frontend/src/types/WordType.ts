export type Word = {
  id: number
  title: string
  content: string
}

export type MarkWord = {
  email: string
  title: string
}

export type User = {
  email: string
  name: string
  role: string
  userId: number
  username: string
}

export type UserWord = {
  dictionary: Word
  user: User
  userDicId: number
}
