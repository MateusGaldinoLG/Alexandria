# Alexandria

Library project using Nodejs, Typescript and SQLite

## How to Setup

1. Git Clone this repository
2. Run `npm install` to install all required packages
3. Run all Typeorm Migrations with npm
```bash
    npm run typeorm migration:run -- -d src/data-source.ts 
```

## Development
1. Create a Typeorm Migration with npm
```bash
    npm run typeorm migration:create src/migrations/[name]
```
