import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';

@Controller('users')
@ApiTags('用户')    // 接口文档标题
export class UsersController {
  constructor(
    @InjectModel(User) private readonly userModel
  ){}

  @Get()
  @ApiOperation({summary:'显示用户列表'}) // 接口描述
  async index(){  // 方法名，后端自用
    return await this.userModel.find() // 数据库类方法
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
}
