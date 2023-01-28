import { Module } from '@nestjs/common';
import { AirtableModule } from './airtable/airtable.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [AirtableModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
