import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express'

@Controller('upload')
export class UploadController {
  @Post()
  @ApiOperation({summary:'上传文件'})
  // 后端自用方法，参数获取前端入参，@Body/@Params 参数名:typescript数据类型/类class
  @UseInterceptors(FileInterceptor('file'))
  async upload (@UploadedFile('file') file) {
    return {
      data:file
    }
  }
}
