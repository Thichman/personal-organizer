**Initialize the Project:**
`ts
    npx prisma init
    `

**Migrate New Tables**

    ```ts
    npx prisma migrate dev --name init
    ```

**Seed the Database**
`ts
    npx prisma db seed
    `

**View Database Data**
`ts
    npx prisma studio
    `

## Generate the schema

**../app/generated/prisma directory**
`ts
    npx prisma generate
    `
