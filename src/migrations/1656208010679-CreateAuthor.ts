import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAuthor1656208010679 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'autores',
                columns: [
                    {
                        name: 'id',
                        type: 'text',
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
                        name: 'nacionality',
                        type: 'varchar(50)',
                        isNullable: false
                    },
                    {
                        name: 'biography',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'date_of_birth',
                        type: 'date',
                        isNullable: false
                    },
                    {
                        name: 'date_of_death',
                        type: 'date',
                        isNullable: true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('autores');
    }

}
