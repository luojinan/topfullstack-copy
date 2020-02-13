import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import multerCOS from '../utils/multerCos.js'
let path=require('path');

const cosConfig={
  //id和key是必须
  AppId: '**************',
  SecretId: '****************',
  SecretKey:'***************',
  Bucket:'topfullstack-copy-1259367067',
  Region:'ap-guangzhou',
  domain:'https://topfullstack-copy-1259367067.cos.ap-guangzhou.myqcloud.com', //cos域名 必选，上传成功返回url需要用到
  // 可选参数
  // FileParallelLimit: 3,    // 控制文件上传并发数
  // ChunkParallelLimit: 3,   // 控制单个文件下分片上传并发数
  // ChunkSize: 1024 * 1024,  // 控制分片大小，单位 B
  dir:'upload',                     //cos文件路径
  onProgress:function(progressData){//进度回调函数，回调是一个对象，包含进度信息
      console.log(progressData);
  }
 
};
let dir=path.resolve(__dirname,'./tmp');

//定义仓库
const storage = multerCOS({
  cos:cosConfig,
  //Note:如果你传递的是一个函数，你负责创建文件夹，如果你传递的是一个字符串，multer会自动创建 如果什么都不传 系统自己会生成tmp目录
  destination: function (req, file, cb) {
      cb(null, dir);
  },
  //自己会生成个随机16字母的文件名和后缀
  filename:'auto'
});

//定义临时文件

@Module({
  imports:[
    MulterModule.register({
      storage:storage
    }),
  ],
  controllers: [
    UploadController
  ]
})
export class UploadModule {}


