# Personal Portfolio Website

A modern, fully-featured personal portfolio website built with Next.js, featuring a dynamic admin panel for content management.

## 🚀 Features

- **Dynamic Content Management**: Edit all content through an intuitive admin panel
- **Real-time Updates**: Changes reflect immediately using Convex
- **Authentication**: Secure admin access with Clerk (role-based)
- **Markdown Support**: Rich text editing for all content sections
- **Image Upload**: Direct image uploads with Convex storage
- **Drag & Drop**: Reorder content items easily
- **Live Preview**: See changes in real-time while editing
- **Contact Form**: Email integration with Resend
- **Dark Mode**: Full dark/light theme support
- **Responsive**: Mobile-first design
- **CV Download**: Direct CV/Resume download

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Convex (Real-time, serverless)
- **Authentication**: Clerk
- **Styling**: Tailwind CSS + shadcn/ui
- **Email**: Resend
- **Deployment**: Vercel
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js 18+ and npm
- Convex account
- Clerk account
- Resend account (for contact form)
- Vercel account (for deployment)

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/hakanduranC/PersonalWebsite.git
cd PersonalWebsite
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/admin

# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Resend (for contact form)
RESEND_API_KEY=your_resend_api_key

# Admin emails (optional, if using email-based auth)
ADMIN_EMAILS=your-email@example.com
```

### 4. Set up Convex

1. Install Convex CLI:
```bash
npm install -g convex
```

2. Login to Convex:
```bash
npx convex login
```

3. Initialize Convex in your project:
```bash
npx convex init
```

4. Start Convex development server:
```bash
npx convex dev
```

### 5. Set up Clerk Authentication

1. Create a Clerk application at [clerk.com](https://clerk.com)
2. Copy your API keys to `.env.local`
3. Set up admin role in Clerk Dashboard:
   - Go to your user in Clerk Dashboard
   - Edit Public Metadata: `{"role": "admin"}`
   - Configure session token to include metadata

### 6. Seed initial data

Run the seed function in Convex Dashboard or through the CLI:
```bash
npx convex run seed:seedData
```

### 7. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 🔐 Admin Access

1. Navigate to `/admin`
2. Sign in with your Clerk account
3. Ensure your account has admin role in Clerk's public metadata

### Setting up Admin Role:

1. Go to Clerk Dashboard → Users
2. Find your user and click Edit
3. Add to Public Metadata:
```json
{
  "role": "admin"
}
```
4. Go to Sessions → Edit session token
5. Add:
```json
{
  "metadata": "{{user.public_metadata}}"
}
```

## 📁 Project Structure

```
├── app/
│   ├── admin/          # Admin panel pages
│   ├── api/            # API routes
│   └── page.tsx        # Homepage
├── components/         # React components
├── convex/            # Convex backend
│   ├── schema.ts      # Database schema
│   └── *.ts           # API functions
├── public/            # Static assets
└── types/             # TypeScript types
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Make sure to add all variables from `.env.local` to your Vercel project settings.

## 📧 Email Configuration

The site uses Cloudflare Email Routing for receiving emails and Resend for sending emails from the contact form.

1. Set up domain email routing in Cloudflare
2. Get Resend API key from [resend.com](https://resend.com)
3. Add API key to environment variables

## 🎨 Customization

- Edit content through the admin panel at `/admin`
- Modify components in `/components`
- Update styles in `tailwind.config.js`
- Change theme in `globals.css`

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email contact@hakanduran.me or open an issue on GitHub.

---

Built with ❤️ by Hakan Duran