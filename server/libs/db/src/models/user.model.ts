import { prop, modelOptions } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'

// 数据库表创建时间更新时间字段（参考原生mongoose）
@modelOptions({
  schemaOptions:{
    timestamps:true
  }
})

export class User{
  @ApiProperty({description:'用户名',example:'用户名1'})
  @prop()
  username:string

  @ApiProperty({description:'密码',example:'123'})
  @prop()
  password:string
}