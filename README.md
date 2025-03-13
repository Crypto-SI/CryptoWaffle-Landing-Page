# Crypto Waffle Website ✨

![Crypto Waffle Logo](./cwsite/public/images/crypto%20waffle%20logo.webp)

A modern, interactive website for the Crypto Waffle livestream show - where finance meets crypto! 🚀

## 📝 Project Overview

Crypto Waffle is a weekly Instagram live show that combines finance expertise with crypto technology insights. This website serves as the digital hub for the show, allowing visitors to:

- 🎬 Learn about the Crypto Waffle show and its hosts
- 🎥 Access past episodes and livestreams
- 💬 Connect with the community through Telegram groups
- 💰 Explore advertising opportunities
- 📧 Subscribe to updates and content

The site features an engaging, animated interface with a focus on user experience and brand identity!

## 🛠️ Tech Stack

The Crypto Waffle website is built with a modern tech stack:

- **Framework**: [Next.js](https://nextjs.org/) - React framework for server-rendered applications
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- **Language**: TypeScript - For type safety and improved developer experience
- **Deployment**: Vercel - Optimized for Next.js applications
- **Video Integration**: YouTube API for video content management
- **Responsive Design**: Mobile-first approach with breakpoints for all devices

## 🚀 Setup & Installation

### Prerequisites

- Node.js (v16+)
- npm or yarn
- A YouTube API key (for video integration)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Crypto-SI/CryptoWaffle-Landing-Page.git
   cd CryptoWaffle-Landing-Page
   ```

2. Navigate to the website directory:
   ```bash
   cd cwsite
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Create a `.env.local` file based on the provided `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` to add your own YouTube API key:
   ```
   NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key_here
   NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID=PLmFN-F-XHywZZLYh95RFY0utC2TeYRZMm
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

### ⚠️ Important Notes

- **Always run commands from the `cwsite` directory**, not from the parent `CWSite` directory
- The project uses Next.js with the App Router
- If you encounter port conflicts, specify a different port:
  ```bash
  npm run dev -- --port 3001
  # or
  npx --no-install next dev --port 3012
  ```

## 🚢 Deployment on Vercel

Vercel is the recommended platform for deploying your Crypto Waffle website, and it's super easy! 🎉

### 🔑 Prerequisites
- A GitHub account (to push your code)
- A Vercel account (free tier works great!)

### ⭐ Deployment Steps

1. **Push your code to GitHub**
   - Make sure all your changes are committed and pushed to your GitHub repository

2. **Set up the project on Vercel**
   - Log in to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - In the configuration screen, set the following:
     - **Framework Preset**: Next.js
     - **Root Directory**: `cwsite` (this is critical! 🚨)
     - **Build Command**: Keep default (`npm run build`)
     - **Output Directory**: Keep default (`out`)

3. **Set up Environment Variables (if needed)**
   - Add any environment variables from your `.env.local` file
   - Remember to add your YouTube API key:
     ```
     NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key_here
     NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID=PLmFN-F-XHywZZLYh95RFY0utC2TeYRZMm
     ```

4. **Deploy!**
   - Click "Deploy" and watch the magic happen! ✨
   - Vercel will build and deploy your site automatically

5. **Custom Domain (Optional)**
   - In your Vercel project settings, go to "Domains"
   - Add your custom domain and follow the verification steps

### 🛟 Troubleshooting Deployment

- **"No Next.js version detected" Error**: Make sure you've set the root directory to `cwsite` in your Vercel project settings
- **Build Failures**: Check your Vercel build logs for specific errors
- **API Issues**: Verify your environment variables are correctly set in Vercel

Remember that every push to your main branch will trigger a new deployment on Vercel - continuous deployment at its finest! 🚀

## 🔄 GitHub Workflow

If you're working on the repository, follow these best practices:

1. Create a feature branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test them locally

3. Before committing, check for any sensitive data:
   ```bash
   git diff --staged
   ```

4. Commit your changes with meaningful commit messages:
   ```bash
   git commit -m "Add feature: description of your changes"
   ```

5. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request on GitHub to merge your changes

## 🌟 Key Features

### Interactive UI Elements

- ✨ Letter-by-letter animations on section titles and navigation elements
- 🔄 Smooth scrolling and page transitions
- 📱 Responsive design for all device sizes

### Content Sections

- **Hero Section**: Introduction to Crypto Waffle with animated elements
- **About Section**: Information about the show, including schedule and benefits
- **Hosts Section**: Profiles of show hosts with social media links
- **YouTube Integration**: Embedded past episodes with a custom video player
- **Telegram Community**: Information about joining community groups
- **Advertising Opportunities**: Details for potential sponsors and advertisers

### Technical Features

- 🖥️ Server-side rendering for improved SEO
- 🖼️ Optimized image loading with Next.js Image component
- 🎬 Interactive animations using Framer Motion
- 🛡️ TypeScript for type safety
- 🧩 Component-based architecture for maintainability

## 🗺️ Future Roadmap

### Short-term Goals (1-3 months)

- [ ] Implement a blog/articles section for written content
- [ ] Add user authentication for premium content
- [ ] Create an event calendar for upcoming livestreams
- [ ] Enhance SEO optimization
- [ ] Add multi-language support
- [ ] **Instagram integration** with API for displaying recent posts and stories
- [ ] **Live Telegram group feed** to showcase community discussions

### Mid-term Goals (3-6 months)

- [ ] Develop a custom video player with enhanced features
- [ ] Implement a newsletter subscription service
- [ ] Create a membership portal for premium content
- [ ] Add interactive cryptocurrency price charts
- [ ] Implement a dark/light mode toggle
- [ ] Enhance Instagram integration with direct post embedding and interaction capabilities
- [ ] Expand Telegram integration with community metrics and trending topics

### Long-term Goals (6+ months)

- [ ] Build a community forum/discussion board
- [ ] Develop mobile applications for iOS and Android
- [ ] Create an API for third-party integrations
- [ ] Implement AI-powered content recommendations
- [ ] Add live chat functionality during streams
- [ ] Integrate cross-platform social media analytics dashboard
- [ ] Develop automated content scheduling across Instagram and Telegram channels

## 🤝 Contributing

We welcome contributions to improve the Crypto Waffle website. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Create a new Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For questions or inquiries about the website, please contact:
- Email: cryptosi@protonmail.com
- Instagram: [@cryptosi.eth](https://www.instagram.com/cryptosi.eth) 