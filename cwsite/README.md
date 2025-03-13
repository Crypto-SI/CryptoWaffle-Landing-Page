# Crypto Waffle Website ✨

This is the official website for the Crypto Waffle livestream - Where Finance Meets Crypto! 🚀

## 📝 Project Overview

Crypto Waffle is a weekly livestream focused on cryptocurrency and financial markets, broadcasting every Monday at 6 PM UK Time. Join us for insights, analysis, and engaging discussions! 💬

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

1. Navigate to the project directory:

```bash
cd /Users/cryptosi/Desktop/Vibe\ Coding/CWSite/cwsite
```

2. Install dependencies:

```bash
npm install
```

### Running the Development Server

You can run the development server using:

```bash
npm run dev
```

The site will be available at http://localhost:3000

If you encounter port conflicts (which happens!), try specifying a different port:

```bash
npm run dev -- --port 3001
# or
npx --no-install next dev --port 3012
```

### Building for Production

To build the project for production:

```bash
npm run build
```

Then to start the production server:

```bash
npm run start
```

## 🚢 Deployment on Vercel

Vercel is the perfect platform for deploying your Next.js application - it's fast, easy, and free for personal projects! 🎉

### Step 1: Push your code to GitHub

Make sure all your changes are committed and pushed to your GitHub repository.

### Step 2: Connect Vercel to your repository

1. Log in to [Vercel](https://vercel.com)
2. Click "New Project" 
3. Import your GitHub repository
4. Configure your project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `cwsite` (SUPER IMPORTANT! 🚨)
   - Keep other settings at their defaults

### Step 3: Configure Environment Variables

If your project uses environment variables (like API keys), add them in the Vercel interface.

### Step 4: Deploy!

Click "Deploy" and watch the magic happen! ✨

### Troubleshooting Deployment Issues

- **"No Next.js version detected" Error**: Double-check that you've set the root directory to `cwsite` in your Vercel project settings
- **Build Failures**: Review the Vercel build logs for specific errors
- **Environment Variables**: Make sure all required environment variables are set in the Vercel dashboard

## ⚠️ Important Notes

- Always run the commands from the `cwsite` directory, not from the parent `CWSite` directory
- The project uses Next.js 13.4.19 with the App Router
- Styling is done with Tailwind CSS
- TypeScript is used for type safety

## 🎨 Colors and Branding

- Dark Grey: `#4E555E`
- Mid Grey: `#80858B`
- Teal: `#43C4CC`
- Yellow: `#FFD878`
- Almost Black: `#2A2B2D`
- Light Grey: `#CDD6DF`
- Font: Fredoka (from Google Fonts) 

## 💬 Need Help?

If you have any questions or need assistance with the project, feel free to reach out to:
- Email: cryptosi@protonmail.com
- Instagram: [@cryptosi.eth](https://www.instagram.com/cryptosi.eth)

Happy coding! 🚀 