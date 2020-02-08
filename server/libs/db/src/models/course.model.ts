import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import {Episode} from './episode.model'

// 数据库表创建时间更新时间字段（参考原生mongoose）
@modelOptions({
  schemaOptions:{
    timestamps:true
  }
})

export class Course{
  @ApiProperty({description:'课程名称',example:'课程名称1'})
  @prop()
  name:string

  @ApiProperty({description:'课程封面图',example:'课程封面2'})
  @prop()
  cover:string

  @ApiProperty({description:'课程封面图',example:'课程封面2'})
  @arrayProp({itemsRef:'Episode'})
  episodes:Ref<Episode>[]
}