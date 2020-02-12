import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DbModule } from '@libs/db';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { UploadModule } from './upload/upload.module';
@Module({
  imports: [
    DbModule,
    UsersModule, 
    CoursesModule, 
    EpisodesModule, 
    UploadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
