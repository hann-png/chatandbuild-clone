export interface Project {
  id: string
  name: string
  description: string
  createdAt: Date
  files: ProjectFile[]
  messages: Message[]
}

export interface ProjectFile {
  id: string
  name: string
  content: string
  language: string
  path: string
}

export interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}
