import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('users')
export class User{
    @PrimaryColumn()
    id: string;

    @Column('varchar', {
        length: 50
    })
    email: string;
    
    @Column('varchar', {
        length: 15
    })
    cpf: string;

    @Column('varchar', {
        length: 100
    })
    username: string;
    
    @Exclude()
    @Column('varchar', {
        length: 20
    })
    password: string;

    @Exclude()
    @Column()
    admin: boolean;

    @Column()
    borrowed: boolean;

    @Column()
    date_of_birth: Date;
    
    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

}