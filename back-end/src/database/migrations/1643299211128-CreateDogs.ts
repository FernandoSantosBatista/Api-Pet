import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDogs1643299211128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'dogs',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'species',
            type: 'varchar',
          },
          {
            name: 'sex',
            type: 'varchar',
          },
          {
            name: 'age',
            type: 'varchar',
          },
          {
            name: 'size',
            type: 'varchar',
          },
          {
            name: 'logo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dogs');
  }
}
