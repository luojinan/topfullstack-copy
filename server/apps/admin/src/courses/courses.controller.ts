import { Controller, Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { Course } from '@libs/db/models/course.model';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

class Page{
  pageSize:number;
  currentPage:number
}

@Controller('courses')
@ApiTags('课程')    // 接口文档标题
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly courseModel:ReturnModelType<typeof Course>
  ){}

  @Get()
  @ApiOperation({summary:'显示课程列表'}) // 接口描述
  async index(@Query('page') page:any,@Query('name') name?:string){  // 方法名，后端自用
    const _filter = {
      $or : [ //多条件，数组
        {name : {$regex : name||''}} // 正则模糊匹配
      ]
    }
    page = JSON.parse(page)
    return {
      msg:'接口请求成功，证明数据库失败'
    }
    const allList = await this.courseModel.find(_filter)
    // page改不了对象
    const list = await this.courseModel.find(_filter).skip(page.pageSize*(page.currentPage-1)).limit(page.pageSize) // 数据库类方法
    return {
      total:allList.length,
      list
    }
  }

  @Get(':id')
  @ApiOperation({summary:'查看课程详情'}) // 接口描述
  async findById(@Param('id') id:string){  // 方法名，后端自用
    return await this.courseModel.findById(id) // 数据库类方法
  }

  @Post()
  @ApiOperation({summary:'创建课程'})
  // 后端自用方法，参数获取前端入参，@Body/@Params 参数名:typescript数据类型/类class
  async create (@Body() createdUsertDto:Course) {
    await this.courseModel.create(createdUsertDto)
    return {
      msg:'创建成功',
      data:createdUsertDto
    }
  }

  @Put(':id')
  @ApiOperation({summary:'修改课程信息'})
  // 后端自用方法，参数获取前端入参，@Body/@Params 参数名:typescript数据类型/类class
  async update (@Param('id') id:string, @Body() updateUsertDto:Course) {
    await this.courseModel.findOneAndUpdate({_id:id},updateUsertDto)
    return {
      msg:'修改成功,更新前数据',
      data:updateUsertDto
    }
  }

  @Delete()
  @ApiOperation({summary:'删除课程'}) // 接口描述
  async remove(@Param('id') id:string){  // 方法名，后端自用
    await this.courseModel.findOneAndDelete(id) // 数据库类方法
    return {
      msg:`删除成功${id}`
    }
  }
}
