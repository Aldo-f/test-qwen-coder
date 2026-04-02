# Tools Hub Frontend - README

## Overview

This is a modern React frontend application built with **Vite**, **Tailwind CSS**, and **GraphQL** (via Apollo Client) for connecting to a backend. The application follows best practices for frontend-backend communication as described in the referenced article.

## Technology Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Apollo Client** - GraphQL client for state management and API communication
- **GraphQL** - Query language for APIs

## Architecture

### Backend-Frontend Communication

The application uses **GraphQL** as the primary method for backend communication, which offers several advantages:

1. **Efficient Data Fetching**: Get exactly the data you need
2. **Strong Typing**: Better developer experience with schema
3. **Real-time Updates**: Support for subscriptions (future enhancement)
4. **Single Endpoint**: Simplified API management

### Alternative Options

While GraphQL is implemented, you can also use:

- **REST API**: Traditional REST endpoints (can be added alongside GraphQL)
- **tRPC**: Type-safe RPC for TypeScript projects
- **WebSockets**: For real-time features

## Project Structure

```
src/
├── api/
│   ├── apolloClient.js    # Apollo Client configuration
│   ├── queries.js         # GraphQL queries and mutations
│   └── mockApi.js         # Mock data for testing
├── components/
│   ├── CategoryFilter.jsx # Category filter component
│   ├── SearchBar.jsx      # Search input component
│   ├── ToolCard.jsx       # Individual tool card
│   └── ToolGrid.jsx       # Grid layout for tools
├── hooks/
│   └── useTools.js        # Custom hook for tools data
├── pages/                 # Page components (future)
├── App.jsx                # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your backend GraphQL endpoint:
   ```
   VITE_GRAPHQL_ENDPOINT=http://your-backend-url/graphql
   VITE_USE_MOCK_DATA=true  # Set to false when using real backend
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open browser to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Connecting to Your Backend

### GraphQL Schema Example

Your backend should support these queries:

```graphql
type Query {
  tools: [Tool!]!
  categories: [String!]!
  searchTools(query: String!): [Tool!]!
  toolsByCategory(category: String!): [Tool!]!
}

type Tool {
  id: ID!
  name: String!
  description: String!
  category: String!
  icon: String!
  url: String!
}
```

### Switching from Mock to Real Backend

1. Set `VITE_USE_MOCK_DATA=false` in `.env`
2. Update `VITE_GRAPHQL_ENDPOINT` to your backend URL
3. Ensure your backend supports the GraphQL queries in `src/api/queries.js`

## Testing

The application includes:

- **Mock Data Mode**: Test UI without backend
- **Loading States**: Skeleton loaders during data fetch
- **Error Handling**: Graceful error messages
- **Responsive Design**: Mobile-first approach

### Manual Testing Checklist

- [ ] Search functionality works
- [ ] Category filtering works
- [ ] Loading states display correctly
- [ ] Error states display correctly
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Refresh button updates data
- [ ] All tools are displayed correctly

## Features

- ✨ Modern gradient UI design
- 🔍 Real-time search functionality
- 🏷️ Category filtering
- 📱 Fully responsive design
- 🔄 Pull-to-refresh capability
- ⚡ Fast loading with skeleton screens
- 🎨 Beautiful animations and transitions
- 🔌 Ready for GraphQL backend integration

## Future Enhancements

- Add authentication
- Implement favorites/bookmarks
- Add tool usage analytics
- Dark mode support
- Progressive Web App (PWA)
- Unit and integration tests

## License

ISC
