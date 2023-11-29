# Nike App

Sports wear website built with Next.js, TypeScript, Tailwind, MongoDB, NextAuth.js, Prisma, Zustand and Sanity.

## Technologies Used

- **Next.js**

Next.js is a React framework for building modern web applications. It provides server-side rendering (SSR) and static site generation (SSG) capabilities, resulting in faster page loads and improved SEO. Next.js simplifies the development process and offers features like automatic code splitting, routing, and hot module replacement.

- **TypeScript**

TypeScript is a strongly typed superset of JavaScript that enhances code maintainability and scalability. It allows us to catch errors during development and provides better tooling support, leading to more robust applications.

- **Tailwind CSS**

Tailwind CSS is a utility-first CSS framework that enables rapid UI development. Its utility classes make it easy to create responsive and custom-designed user interfaces without writing custom CSS.

- **MongoDB**

MongoDB is a NoSQL database that provides flexibility and scalability. It stores data in JSON-like documents, allowing us to work with complex data structures and adapt quickly to changing requirements.

- **NextAuth.js**

NextAuth.js is an authentication library for Next.js applications. It supports various authentication providers like OAuth, JWT, and credentials-based authentication, making it easy to implement secure user authentication and authorization.

- **Prisma**

Prisma is an innovative database toolkit that simplifies database access and management. It provides a type-safe and intuitive way to interact with the database using a powerful ORM (Object-Relational Mapping) layer.

- **Zustand**

Zustand is a global state management for React/Next.js applications. It is more modern and more performant than Redux.

- **Sanity**

Sanity is a headless CMS that gives totally composable, fully decoupled, real-time content back end. It has entirely customizable content workspaces.

The goal of using these technologies is to create a high-performing, modern and scalable application.

Please refer to the respective documentation of each technology for more in-depth details and usage instructions.

## How to use

1. Register your app at Github and Google

2. Create `.env` file in root directory, and put corresponding variables:

```
DATABASE_URL=YOUR_MONGO_ATLAS_DATABASE_URL
NEXTAUTH_SECRET="secret"

GITHUB_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_SECRET=YOUR_GITHUB_CLIENT_SECRET

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
```

3. Run `npm install`

4. Run `npm run dev`

5. Sanity is configured to run from `/admin` route

## Customize the app

Customize the app to suit your needs!

## App hosted on Vercel

https://analytics-automation-charts-dragan717.vercel.app/
