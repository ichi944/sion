export type UserInfo = {
  id: string
  name: string
  icon: string
}

export type AuthHeader = {
  authorization: string
}

export type Epic = {
  id: number
  title: string
  storyPoint?: StoryPoint
}

export type StoryPoint = {
  id: number
  epicId: number
  point: number
}
