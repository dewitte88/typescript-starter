// database.module.ts
import { DynamicModule, Module } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({})
export class DatabaseModule {
  static register(options: DataSourceOptions): DynamicModule {
    const dataSource = new DataSource(options);

    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'DATABASE_CONNECTION',
          useFactory: async () => {
            if (!dataSource.isInitialized) {
              await dataSource.initialize();
            }
            return dataSource;
          },
        },
      ],
      exports: ['DATABASE_CONNECTION'],
    };
  }
}
