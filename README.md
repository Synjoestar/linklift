# LinkLift

LinkLift is a web application built with Next.js that transforms mundane input text into hyper-professional, enthusiastic LinkedIn posts using the power of Google Gemini AI.

## Live Demo

The application is deployed on Vercel and can be accessed at: [https://linklift-ten.vercel.app](https://linklift-ten.vercel.app)

## Features

- AI-powered content generation using Google Gemini.
- Transforms any text into professional, engaging LinkedIn posts.
- Rate limiting implemented with Upstash Redis to prevent abuse.
- Built with Next.js App Router and React.

## Prerequisites

Before running the project locally, ensure you have the following environment variables configured:

- `GEMINI_API_KEY`: Your Google Gemini API key.
- `NEXT_PUBLIC_GEMINI_API_KEY`: Your Google Gemini API key (for frontend usage if applicable).
- `UPSTASH_REDIS_REST_URL`: (Optional) Your Upstash Redis REST URL for rate limiting.
- `UPSTASH_REDIS_REST_TOKEN`: (Optional) Your Upstash Redis REST Token for rate limiting.

Create a `.env.local` file in the root of your project and add the variables above.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- Framework: Next.js
- AI: Google Generative AI (Gemini)
- Rate Limiting: Upstash Redis

## License

This project is open source and available under the MIT License.
