import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsers1656209115400 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'text',
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'varchar(50)',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'cpf',
                        type: 'varchar(15)',
                        isNullable: false,
                        isUnique: true
                    }, 
                    {
                        name: 'password',
                        type: 'varchar(20)',
                        isNullable: false,
                    }, 
                    {
                        name: 'admin',
                        type: 'integer',
                        isNullable: false,
                        default: false
                    }, 
                    {
                        name: 'borrowed',
                        type: 'integer',
                        isNullable: false,
                        default: false
                    },
                    {
                        name: 'date_of_birth',
                        type: 'date'
                    }
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
