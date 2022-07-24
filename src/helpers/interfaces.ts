interface Message {
  type: string
  content: string
  transmitter: string
  context: string
  room?: string
  createdAt: Date
  userdRead: string[]
}

interface Room {
  createdAt: Date
  creator: string
  messages: string[]
  name: string
  type?: string
  users: string[]
  _id: string
}

export type { Message, Room }
