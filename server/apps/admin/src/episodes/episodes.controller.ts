import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { Episode } from '@libs/db/models/episode.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('episodes')
@ApiTags('课时')    // 接口文档标题
export class EpisodesController {
  constructor(
    @InjectModel(Episode) private readonly episodeModel:ReturnModelType<typeof Episode>
  ){}

  @Get()
  @ApiOperation({summary:'显示课时列表'}) // 接口描述
  async index(){  // 方法名，后端自用
    return await this.episodeModel.find() // 数据库类方法
  }

  @Get(':id')
  @ApiOperation({summary:'课时详情'}) // 接口描述
  async findById(@Param('id') id:string){  // 方法名，后端自用
    return await this.episodeModel.findById(id) // 数据库类方法
  }

  @Post()
  @ApiOperation({summary:'创建课时'})
  // 后端自用方法，参数获取前端入参，@Body/@Params 参数名:typescript数据类型/类class
  async create (@Body() createdUsertDto:Episode) {
    await this.episodeModel.create(createdUsertDto)
    return {
      msg:'创建成功',
      data:createdUsertDto
    }
  }

  @Put()
  @ApiOperation({summary:'修改课时'})
  // 后端自用方法，参数获取前端入参，@Body/@Params 参数名:typescript数据类型/类class
  async update (@Param('id') id:string, @Body() updateUsertDto:Episode) {
    await this.episodeModel.findOneAndUpdate(id,updateUsertDto)
    return {
      msg:'修改成功',
      data:updateUsertDto
    }
  }

  @Delete()
  @ApiOperation({summary:'删除课时'}) // 接口描述
  async remove(@Param('id') id:string){  // 方法名，后端自用
    await this.episodeModel.findOneAndDelete(id) // 数据库类方法
    return {
      msg:`删除成功${id}`
    }
  }
}
