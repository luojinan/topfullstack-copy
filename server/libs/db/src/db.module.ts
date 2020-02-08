import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose'
import { User } from './models/user.model';

const dbModels = TypegooseModule.forFeature([User])

// 标记为全局
@Global()
@Module({
  imports:[
    TypegooseModule.forRoot('mongodb://localhost/topfullstack',{
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
