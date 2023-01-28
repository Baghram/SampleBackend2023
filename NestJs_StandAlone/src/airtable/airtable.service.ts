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
                url: 'https://v5.airtableusercontent.com/v1/14/14/1674936000000/gCuN_bls_mOVYs5UU46p4A/aHhn1ddB9fWesjFijoY9eQTqwc7xWUGMggqg0fWlzT626GJsqI8tCqA_VTIHJUgJdl8sCYhwOJfm29Rlz0XS3KMSsdxuZDvqiHcGKD-Sc48maOAPW37GB9nadmmCTZDW/BcVvQRr7TPjq3WQa3TSPJgF1U1WvFbyIDluc2yLoX8k',
                filename: 'e0a4a500-0e67-4b87-b1f2-aeeec026c452.jpg',
                size: 24214,
                type: 'image/jpeg',
                thumbnails: [Object]
                }
            ],
            Description: 'Description 123',
            ACK: 'Error, Invalid Poster Type',
            'Updated At': '2023-01-24',
            Title: 'Test Title'
            }
        */

        //Insert Logic Here (upload to gcp, mongodb,redis,etc)
      }
    }
  }
}
