This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Repo specific

The repo has some minimum CI/CD.

- merging on main requires a PR
- I prepared a github action for running the tests before being able to merge a PR

## Times

- setup ~2h
- r&d on best wasy to implement filtering ~3h
- listing pokemons ~1h
- types dropdown ~1h
- search ~1h
- details page ~1h
- writing tests cummulated ~forever

## Additional functionality

- the pokemons list is paginated
- if filtered by type, pagination is disabled (no posibility in pokemon API)
- if filtered by name, pagination is disabled (no posibility in pokemon API)
- the details page has a tab switcher; you can switch between a pokemon's moves or stats
- most basic components are from [Material UI](https://mui.com/material-ui/getting-started/) (inputs, dropdowns, tabs, list etc)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
