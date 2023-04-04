import { Injectable } from '@nestjs/common';
import Airtable, { FieldSet, apiKey } from 'airtable';
console.log('serviceS');

@Injectable()
export class AirtableService {
  constructor() {}

  async onModuleInit() {
    await this.getData();
  }

  async getData() {
    Airtable.configure({ apiKey: process.env.AIRTABLE_APIKEY });
    const base = Airtable.base(process.env.AIRTABLE_BASE);
    const table = base.table(process.env.AIRTABLE_BASE);
    const option: any = {
      cellFormat: 'json',
      pageSize: 10,
      fields: ['ID', 'Name', 'Address'],
      sort: [
        {
          field: 'ID',
          direction: 'asc',
        },
      ],
    };
    let tableData = [];
    await table.select(option).eachPage((records, fetchNextPage) => {
      for (const record of records) {
        tableData.push(record['fields']);
      }
      fetchNextPage();
    });
    //Do your logic here (uploading to server,etc)
  }
}
