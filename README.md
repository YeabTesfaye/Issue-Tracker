# Issue Tracker

This is an Issue Tracker app built with [Next.js](https://nextjs.org) and [Prisma](https://www.prisma.io), designed to track and manage issues. The app allows users to create, update, and delete issues, and it includes a status feature with various states like `OPEN`, `IN_PROGRESS`, and `CLOSED`.

## Features

- **Issue Management**: Create, view, update, and delete issues.
- **User Authentication**: Users can sign in and interact with the issues.
- **Status Tracking**: Issues are tracked with various statuses such as `OPEN`, `IN_PROGRESS`, and `CLOSED`.
- **Data Visualization**: A chart to visualize the number of issues in each status (open, in-progress, and closed).

## Getting Started

### Prerequisites

- Node.js (v18.x or later)
- npm, yarn, or pnpm (package managers)
- A Prisma-compatible database (e.g., PostgreSQL, MySQL)

### 1. Clone the repository

```bash
git clone https://github.com/YeabTesfaye/Issue-Tracker

cd Issue-Trakcer

npm install

```

# Set up the environment

DATABASE_URL=<your-sql-database-url>
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-next-auth-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Run Prisma migrations

```bash
npx prisma migrate dev
```