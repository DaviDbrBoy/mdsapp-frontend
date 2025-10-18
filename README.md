# Mds App

## Description
MdsApp is a real-time Twitter-like web application built with Next.js, React, MongoDB, and Socket.IO. Users can log in, post tweets, reply to others, delete their own tweets, and see messages appear instantly. The app features infinite scrolling, smooth animations, and a loading splash screen.

## Features
- User login/logout
- Post new tweets
- Reply to other users' tweets
- Delete your own tweets
- Real-time updates with WebSockets (Socket.IO)
- Infinite scroll for loading tweets
- Splash screen on app load
- Smooth animations with Framer Motion
- Floating button to focus the tweet input

## Tech Stack
- **Frontend:** Next.js, React, TailwindCSS, Framer Motion
- **Backend:** Next.js API Routes, Socket.IO
- **Database:** MongoDB with Mongoose
- **Real-time:** WebSockets via Socket.IO

## Installation

1. Clone the repository:
\`\`\`bash
git clone <YOUR_REPO_URL>
cd mdsapp
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up your MongoDB connection in \`.env.local\`:
\`\`\`
MONGODB_URI=mongodb://localhost:27017/mdsapp
\`\`\`

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open your browser and go to [http://localhost:3000](http://localhost:3000)

## Folder Structure

\`\`\`
src/
├─ app/                 # Next.js pages and API routes
│  ├─ api/              # API endpoints (tweets, Socket.IO)
│  └─ page.js           # Main app page
├─ components/          # React components (Header, TweetFeed, TweetItem, etc.)
├─ hooks/               # Custom React hooks (e.g., useTweets)
├─ lib/                 # MongoDB connection and models
└─ styles/              # Tailwind or custom styles
\`\`\`

## Usage
- Log in with a username
- Post tweets and replies
- Scroll down to load more tweets automatically
- Enjoy real-time updates without refreshing

## Future Improvements
- PWA support for offline usage
- Mobile app version
- User authentication with accounts/passwords
- Like and retweet functionality

## License
This project is licensed under the MIT License.