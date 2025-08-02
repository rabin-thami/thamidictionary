# Next.js Starter Template with Authentication

This is a starter template for building Next.js applications with a complete authentication system. It includes session handling, protected routes, and a modern technology stack to get you up and running quickly.

## Features

- **Next.js 15:** The latest version of the React framework for production.
- **Authentication:** A complete authentication system built with NextAuth.js, including login, logout, and session management.
- **Protected Routes:** Middleware to protect routes and redirect unauthenticated users.
- **Prisma:** A next-generation ORM for Node.js and TypeScript.
- **PostgreSQL:** A powerful, open-source object-relational database system.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **Latest Dependencies:** The `package.json` is configured to use the latest versions of all dependencies, ensuring you always have the most up-to-date features and security patches.

## Getting Started

To get started with this template, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rabin-thami/nextjs-starter-template-with-auth.git
   cd nextjs-starter-template-with-auth
   ```

2. **Run the setup script:**

   This project includes a setup script that will guide you through the initial configuration.

   ```bash
   node cli/index.js
   ```

   The script will prompt you to:
   - Rename the project.
   - Choose a dependency installation strategy.

   It will also initialize a new Git repository and create an `.env.example` file for you.

3. **Set up environment variables:**

   Create a `.env` file by copying the `.env.example` file and add the following environment variables:

   ```env
   # Prisma
   DATABASE_URL="postgresql://user:password@host:port/db?schema=public"

   # NextAuth.js
   AUTH_SECRET="your-auth-secret"
   ```

   Replace the placeholder values with your actual database connection string and a secret for NextAuth.js. You can generate a secret using the following command:

   ```bash
   openssl rand -base64 32
   ```

4. **Run database migrations:**

   ```bash
   pnpm prisma migrate dev
   ```

5. **Run the development server:**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `pnpm dev`: Runs the development server.
- `pnpm build`: Creates a production build of the application.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Lints the codebase for errors.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.
