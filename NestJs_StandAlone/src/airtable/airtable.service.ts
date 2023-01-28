import { Injectable } from '@nestjs/common';
import { AirtableHelper } from './helper/airtable.helper';
import Airtable, { FieldSet } from 'airtable';
console.log('serviceS');

@Injectable()
export class AirtableService {
  airtable: AirtableHelper;
  page: any;
  options: Airtable.SelectOptions<FieldSet>;
  record: Airtable.Record<FieldSet>;

  constructor() {
    this.airtable = new AirtableHelper();
  }

  async onModuleInit() {
    this.airtable.loadCurrentPage();
  }

  async getData() {
    while (await this.airtable.loadNextPage()) {
      let page = await this.airtable.nextPage();
      for (const row of page) {
        let fields = row['fields'];
        /* Log result
        {
            ID: 1,
            Poster: [
                {
                id: 'attGiOwHpGXZ0wbR0',
                width: 350,
                height: 350,
                url: 'image url here',
                filename: 'filename.jpg',
                size: 24214,
                type: 'image/jpeg',
                thumbnails: [Object]
                }
            ],
            Description: 'Description 123',
            ACK: '',
            'Updated At': '2023-01-24',
            Title: 'Test Title'
            }
        */

        //Insert Logic Here (upload to gcp, mongodb,redis,etc)
      }
    }
  }
}
