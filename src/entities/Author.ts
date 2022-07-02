import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('autores')
export class Author{

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column('varchar', {
        length: 50
    })
    nacionality: string;

    @Column()
    biography: string;

    @Column()
    dateOfBirth: Date;
    
    @Column()
    dateOfDeath: Date;
}