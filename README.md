# Next.js Starter Template with Authentication

A modern Next.js application starter template with built-in authentication using NextAuth.js, Prisma ORM, and Tailwind CSS.

## Features

- 🔐 **Authentication**: Complete authentication system with NextAuth.js
- 🗄️ **Database**: Prisma ORM with SQLite (easily configurable for other databases)
- 🎨 **Styling**: Tailwind CSS for modern, responsive design
- 📧 **Email**: Email verification and password reset with Resend
- 🛡️ **Security**: bcryptjs for password hashing
- 📱 **UI Components**: Built with Radix UI and shadcn/ui
- 🔧 **TypeScript**: Full TypeScript support
- 🧹 **Code Quality**: Biome for linting and formatting

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: NextAuth.js 5
- **Database**: Prisma ORM with SQLite
- **Styling**: Tailwind CSS
- **Email**: Resend
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI, shadcn/ui, Lucide React icons
- **TypeScript**: TypeScript 5
- **Code Quality**: Biome

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- [Git](https://git-scm.com/)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nextjs-starter-template-with-auth.git
cd nextjs-starter-template-with-auth
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```env
# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# Database (SQLite is configured by default)
DATABASE_URL="file:./dev.db"

# Email Service (Resend)
RESEND_API_KEY=your-resend-api-key
FROM_EMAIL=noreply@yourdomain.com

# Optional: Google OAuth (if using OAuth providers)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. Database Setup

Generate the Prisma client and create the database:

```bash
# Generate Prisma client
pnpm prisma:generate

# Create and seed the database
pnpm prisma db push
# or for production:
pnpm prisma db migrate dev
```

### 5. Run the Development Server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (protected)/       # Protected pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── auth.ts                # NextAuth.js configuration
├── auth.config.ts         # NextAuth.js configuration
├── middleware.ts          # Next.js middleware
├── components/            # Reusable components
│   ├── ui/               # UI components (shadcn/ui)
│   └── session-provider/ # Session provider
├── action/               # Server actions
├── helper/               # Helper functions
├── lib/                  # Utility libraries
├── schema/               # Zod schemas
└── types/                # TypeScript type definitions
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm prisma:generate` - Generate Prisma client
- `pnpm lint` - Run linter
- `pnpm format` - Format code

## Authentication Features

- **Email/Password Authentication**
- **Email Verification**
- **Password Reset**
- **Social Login** (Google, GitHub, etc. - configurable)
- **Protected Routes**
- **Session Management**

## Deployment Guides

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on every push

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Deploy on Netlify

1. Build your application:
   ```bash
   pnpm build
   ```

2. Create a `netlify.toml` file:
   ```toml
   [build]
   command = "pnpm build"
   publish = ".next"

   [[plugins]]
   package = "@netlify/plugin-nextjs"

   [build.environment]
   NODE_VERSION = "18"
   ```

3. Deploy to Netlify:
   - Connect your GitHub repository
   - Configure environment variables
   - Set the build command and publish the directory

### Deploy on Railway

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login to Railway:
   ```bash
   railway login
   ```

3. Initialize project:
   ```bash
   railway init
   ```

4. Configure environment variables in Railway dashboard
5. Deploy:
   ```bash
   railway up
   ```

### Deploy on DigitalOcean App Platform

1. Push your code to a GitHub repository
2. Create a new App Platform on DigitalOcean
3. Connect your repository
4. Configure environment variables
5. Set build command: `pnpm build`
6. Set start command: `pnpm start`
7. Set output directory: `.next`

### Manual Deployment

#### For Static Export (if applicable)

1. Configure `next.config.ts` for static export:
   ```typescript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   ```

2. Build the application:
   ```bash
   pnpm build
   ```

3. Deploy the `.next` folder to any static hosting service

#### For Server Deployment

1. Build the application:
   ```bash
   pnpm build
   ```

2. Start the production server:
   ```bash
   pnpm start
   ```

3. Deploy to your preferred hosting service (AWS, Google Cloud, Azure, etc.)

## Database Setup for Production

For production, you may want to use a more robust database like PostgreSQL or MySQL:

1. Install the database driver:
   ```bash
   pnpm add pg # for PostgresSQL
   # or
   pnpm add @prisma/client-mysql # for MySQL
   ```

2. Update your `DATABASE_URL` in `.env.local`:
   ```env
   # PostgreSQL example
   DATABASE_URL="postgresql://username:password@host:port/database"
   
   # MySQL example
   DATABASE_URL="mysql://username:password@host:port/database"
   ```

3. Generate a Prisma client and run migrations:
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   # or
   pnpm prisma db migrate deploy
   ```

## Environment Variables for Production

Make sure to set these environment variables in your production environment:

```env
# NextAuth.js
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-nextauth-secret

# Database
DATABASE_URL=your-production-database-url

# Email Service
RESEND_API_KEY=your-production-resend-api-key
FROM_EMAIL=noreply@yourdomain.com

# OAuth Providers (if using)
GOOGLE_CLIENT_ID=your-production-google-client-id
GOOGLE_CLIENT_SECRET=your-production-google-client-secret
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License—see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue in the GitHub repository.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://nextauth.js.org)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Resend Documentation](https://resend.com/docs)
