import { DynamicModule, Module } from "@nestjs/common";
import { HelperOptionsDto } from "./dto/helper-options.dto";
import { HelperService } from "./helper.service";

@Module({})
export class HelperModule {
  static register(options: HelperOptionsDto): DynamicModule | any {
    return {
      module: HelperModule,
      imports: [],
      providers: [
        {
          provide: "HELPER_OPTIONS",
          useValue: options,
        },
        HelperService,
      ],
      exports: [HelperService],
    };
  }
}
