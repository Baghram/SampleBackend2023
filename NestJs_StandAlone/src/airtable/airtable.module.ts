import { Module } from '@nestjs/common';
import { AirtableService } from './airtable.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [],
  controllers: [],
  providers: [AirtableService],
})
export class AirtableModule {}
