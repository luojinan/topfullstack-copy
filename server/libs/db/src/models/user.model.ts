import { prop } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'

export class User{
  @ApiProperty({description:'用户名',example:'用户名1'})
  @prop()
  username:string

  @ApiProperty({description:'密码',example:'123'})
  @prop()
  password:string
}