import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Author } from "./Author";
import { v4 as uuid } from "uuid";

@Entity('livros')
export class Book{

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    // @Column()
    // author_id: string;

    // @JoinColumn({name: 'author_id'})
    // @ManyToOne(() => Author)
    // authorId: Author;

    @ManyToOne(() => Author, (author) => author.id)
    author_id: Author;

    @Column('varchar', {
        length: 50
    })
    code: string;

    @Column()
    date_of_publication: number;

    @Column({default: true})
    borrowed: boolean;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}