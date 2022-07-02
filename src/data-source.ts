import "reflect-metadata"
import { DataSource } from "typeorm"
import { Author } from "./entities/Author"
import { Book } from "./entities/Book"
import { User } from "./entities/User"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.env.NODE_ENV === 'test' ? 'src/database/biblio_teste.sqlite' : 'src/database/biblio_types.sqlite',
    entities: [Author, Book, User],
    migrations: ["src/migrations/*.ts"]
})

// for postgresql
// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "mateus",
//     password: "mateus123",
//     database: process.env.NODE_ENV === 'test' ? "biblio_teste" : "biblio_types",
//     logging: false,
//     entities: [],
//     migrations: ["src/migrations/*.ts"]
// })