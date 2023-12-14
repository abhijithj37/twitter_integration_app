# Twitter Integration Application

## Overview

The Twitter Integration Application allows users to post and delete tweets using React.js and Node.js. It integrates with the Twitter API v2 for user authentication and managing tweets.

## Features

- Tweet posting
- User authentication with Twitter OAuth
- Responsive design
- Tweet deletion
- MongoDB storage with Mongoose

## Tech Stack

- Frontend: React.js
- Backend: Node.js with Express.js
- Database: MongoDB with Mongoose
- Styling: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed (if applicable)
- Twitter Developer Account with API keys

### Installation

1. Clone the repository: `git clone [repository-url]`
2. Install dependencies: `cd [project-folder] && npm install`

## Configuration

1. Create a `.env` file in the project root.
2. Add your Twitter API keys:

```env
CONSUMER_KEY=your-Twitter-consumer-key
CONSUMER_SECRET=your-Twitter-consumer-secret
CALLBACK_URL=http://localhost:4000/auth/twitter/callback
CONN_STR=your mongodb_connection_url
SECRET=jwt_secret
APP_KEY=your-Twitter-consumer-key
APP_SECRET=your-Twitter-consumer-secret
ACCESS_TOKEN=twitter-access_token
ACCESS_SECRET=twitter-access-secret
BEARER_TOKEN=your_bearer-token(from the Twitter developer account)
TOKEN_EXPIRES=jwt_token_duration (eg. '1d')
