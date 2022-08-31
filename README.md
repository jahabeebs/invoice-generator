This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server (we'll use yarn for consistency):

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Database Configuration Instructions

First, create a free Heroku PostgreSQL database. This will make it easy to configure a DB for testing without configuring a database on your local computer.

Next, create a .env file with the same format as .env.example, and replace the DATABASE_URL value in your .env with the DATABASE_URL of your Heroku DB (found in your Heroku settings)

Then, use the following instructions to configure Prisma with your Heroku DB:

1. Run yarn prisma db push to create the DB tables as specified in schema.prisma
2. Run yarn prisma studio to view the DB tables and easily add/delete dummy data

If you don't want to create a Heroku database, you can just create a local PostgreSQL DB and do the following:
1. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb. 
2. Run yarn prisma db push to create the DB tables as specified in schema.prisma 
3. Run yarn prisma studio to view the DB tables and easily add/delete dummy data

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
