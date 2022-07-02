import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateBooks1656208387939 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'livros',
                columns: [
                    {
                        name: 'id',
                        type: 'serial',
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: 'name',
                        type: 'text',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'author_id',
                        type: 'text',
                        isNullable: false
                    },
                    {
                        name: 'code',
                        type: 'varchar(50)',
                        isNullable: false,
                    },
                    {
                        name: 'ISBN',
                        type: 'varchar(13)',
                        isNullable: true
                    }, 
                    {
                        name: 'Date_of_publication',
                        type: 'integer'
                    }, 
                    {
                        name: 'borrowed',
                        type: 'boolean',
                        default: true
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKAuthorId',
                        referencedTableName: 'autores',
                        referencedColumnNames: ['id'],
                        columnNames: ['author_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL'
                    }
                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('livros');
    }

}
