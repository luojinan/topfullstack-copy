import { prop, modelOptions } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'

// 数据库表创建时间更新时间字段（参考原生mongoose）
@modelOptions({
  schemaOptions:{
    timestamps:true
  }
})

export class Episode{
  @ApiProperty({description:'课时名',example:'课时名1'})
  @prop()
  name:string

  @ApiProperty({description:'文件',example:'视频1'})
  @prop()
  file:string
}