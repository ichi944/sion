import { IsInt, MaxLength, MinLength } from 'class-validator'

export class LoginBody {
  @MinLength(2)
  id: string

  @MinLength(4)
  pass: string
}

export class CloseEpicRequest {
  type: 'close'
  @IsInt()
  id: number
}

export class UpdateEpicContentRequest {
  type: 'update'
  @IsInt()
  id: number
  @MaxLength(30)
  title?: string
  @MaxLength(1200)
  description?: string
}
