# Job Application Tracker

A modern web application to track your job applications built with Next.js, TypeScript, and Supabase.

## Features
- 📝 Track job applications
- 🔄 Update application status
- 🌓 Dark/Light mode
- 🔐 User authentication
- 📱 Responsive design

## Tech Stack
- Next.js 14
- TypeScript
- Supabase
- Tailwind CSS
- shadcn/ui

## Prerequisites
- Node.js 18+
- pnpm
- Supabase account

## Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd job_application_tracker

### 2. Install dependencies
npm install

### 3. Create a Supabase project
Create a Supabase project at https://app.supabase.com/projects/new.

### 4. Configure environment variables
Create a .env.local file in the root directory of the project and add the following variables:
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

### 5. Start the development server
npm run dev 

The application will be available at http://localhost:3000

## Usage
- Sign up or log in to your Supabase account to create a new user.
- Create a new job application by clicking the "Create Application" button.
- Update the status of an application by clicking the "Update Status" button.
- View your job applications by clicking the "View Applications" button.