## To setup project

- Node version `20.18.1` and npm version `10.8.2`
- Install nestjs globally `npm i -g @nestjs/cli` version `11.0.7`
- Install [Docker desktop](https://www.docker.com/)

## To run Docker

- `npm run docker:up` Run the Docker for `Postgres` and `Adminer`
- No need to run `Adminer` as we can directly access database using `npx prisma studio`
- `sudo chmod 777 postgres-data` Change the permission of database folder

## Access Postgres terminal

- To access postgres terminal `docker exec -it postgres_db /bin/bash`
- Enter postgres `psql -U postgres` and `\l` to list all database
- `rm -rf ./data/db/*` clear volume files

## To start the API

- `npm run start:dev`

## To Connect Adminer

- System: PostgreSQL
- Server: postgres_db => Container name
- Username: postgres
- Password: root
- Database: evhubnepal


## DTO => Data transfer object


## Argon 2
- We can hash the refresh token in application and there is problem with bcrypt because the verificaiton algorithm limited to 72 bits


## To read ENV file
- Install this pakcage `@nestjs/config`
- Import package `import { ConfigService } from '@nestjs/config';`
- Inject service `constructor(private readonly configService: ConfigService)`
- Accsess using get function `const DB_URL = configService.get<string>('DATABASE_URL');`
