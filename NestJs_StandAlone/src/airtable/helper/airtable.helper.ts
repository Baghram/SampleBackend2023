import Airtable, { FieldSet } from 'airtable';

export class AirtableHelper {
  airtable: Airtable;
  base: Airtable.Base;
  table: Airtable.Table<FieldSet>;
  page: any;
  options: Airtable.SelectOptions<FieldSet>;
  record: Airtable.Record<FieldSet> & any[];

  constructor() {
    this.airtable = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    });
    this.base = this.airtable.base(process.env.AIRTABLE_BASE_KEY);
    this.table = this.base.table(process.env.AIRTABLE_TABLE_KEY);
    this.page = {};
    this.options = {
      cellFormat: 'json',
      pageSize: 10,
      fields: [
        'ID',
        'Title',
        'Description',
        'Poster',
        'Updated At',
        'EndDate',
        'Status',
        'ACK',
      ],
      sort: [
        {
          field: 'ID',
          direction: 'asc',
        },
      ],
    };
    this.record = undefined;
  }

  async loadCurrentPage() {
    const callBack = (error: any) => {
      if (error) {
        this.page.reject(error);
      } else {
        this.page.resolve();
      }
    };

    const eachPageGetter = (records: any, getNextPage: () => void) => {
      this.page.nextPage = () => {
        return new Promise((resolve, reject) => {
          this.page.resolve = resolve;
          this.page.reject = reject;
          getNextPage();
        });
      };
      this.page.resolve(records);
    };

    this.page.nextPage = () => {
      return new Promise((resolve, reject) => {
        this.page.reject = reject;
        this.page.resolve = resolve;
        this.table.select(this.options).eachPage(eachPageGetter, callBack);
      });
    };
  }

  async loadNextPage() {
    try {
      this.record = await this.page.nextPage();
      return this.record && this.record.length;
    } catch (error) {
      return false;
    }
  }

  async nextPage() {
    return this.record;
  }
}
