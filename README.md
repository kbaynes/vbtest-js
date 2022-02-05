# vbtest-js

VacoBuilt Dev Test, written in TypeScript using Fastify and Prisma ORM.

This project assumes mac or linux for the httpie_test.sh

# Run
 
`npm run setup` to initialize prisma and db

then

`npm run dev` to run the server

Notes:

I could not replicate the API spec in the test because 'text' was a reserved word in Prisma, 
so had to rename it to 'content'

# Test

`sh httpie_tests.sh`