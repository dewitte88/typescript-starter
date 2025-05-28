import { Module } from '@nestjs/common';
import { NameRatingService } from './name-rating.service';
import { NamesModule } from 'src/names/names.module';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  imports: [NamesModule,
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'db',
    })
  ], 
  
  providers: [NameRatingService]
})
export class NameRatingModule {}
