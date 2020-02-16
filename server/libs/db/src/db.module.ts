import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose'
import { User } from './models/user.model';
import { Course } from './models/course.model';
import { Episode } from './models/episode.model';

const dbModels = TypegooseModule.forFeature([User,Course,Episode])

// 标记为全局
@Global()
@Module({
  imports:[
    TypegooseModule.forRoot('mongodb://134.175.187.48:27017/topfullstack',{
      useNewUrlParser:true,
      useUnifiedTopology:true,
      useCreateIndex:true,
      useFindAndModify:false
    }),
    dbModels
  ],
  providers: [DbService],
  exports: [DbService,dbModels],
})
export class DbModule {}
