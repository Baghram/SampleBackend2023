import { NestFactory } from '@nestjs/core';
import { AirtableModule } from './airtable/airtable.module';
import { AirtableService } from './airtable/airtable.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AirtableModule);
  const airtableService = app.get(AirtableService);
  airtableService.getData();
  await app.close();
}
bootstrap();
