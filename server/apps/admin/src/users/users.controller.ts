import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ModelOptions } from 'mongoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Controller('users')
@ApiTags('用户')    // 接口文档标题
export class UsersController {
  constructor(
    @InjectModel(User) private readonly userModel:ReturnModelType<typeof User>
  ){}

  @Get()
  @ApiOperation({summary:'显示用户列表'}) // 接口描述
  async index(){  // 方法名，后端自用
    return await this.userModel.find() // 数据库类方法
  }

  @Get(':id')
  @ApiOperation({summary:'按用户id查找'}) // 接口描述
  async findById(@Param('id') id:string){  // 方法名，后端自用
    return await this.userModel.findById(id) // 数据库类方法
  }

  @Post()
  @ApiOperation({summary:'创建用户'})
  // 后端自用方法，参数获取前端入参，@Body/@Params 参数名:typescript数据类型/类class
  async create (@Body() createdUsertDto:User) {
    await this.userModel.create(createdUsertDto)
    return {
      msg:'创建成功',
      data:createdUsertDto
    }
  }

  @Put()
  @ApiOperation({summary:'修改用户信息'})
  // 后端自用方法，参数获取前端入参，@Body/@Params 参数名:typescript数据类型/类class
  async update (@Param('id') id:string, @Body() updateUsertDto:User) {
    await this.userModel.findOneAndUpdate(id,updateUsertDto)
    return {
      msg:'修改成功',
      data:updateUsertDto
    }
  }

  @Delete()
  @ApiOperation({summary:'删除用户'}) // 接口描述
  async remove(@Param('id') id:string){  // 方法名，后端自用
    await this.userModel.findOneAndDelete(id) // 数据库类方法
    return {
      msg:`删除成功${id}`
    }
  }
}
